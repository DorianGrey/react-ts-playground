import "./TodoList.scss";

import React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import find from "lodash-es/find";
import noop from "lodash-es/noop";

import FontIcon from "react-md/lib/FontIcons/FontIcon";

import { sendNotification } from "../notifications/NotificationProvider";
import { AppState } from "../state";
import { TodoModel } from "./todo.model";
import {
  AddTodo,
  DeleteTodo,
  TodoAddAction,
  TodoDeleteAction,
  UpdateTodo
} from "./todo.state";
import TodoEntry from "./TodoEntry";

// Todo list.
export interface TodoListProps {
  todos: TodoModel[];
  onTodoAdd: (headline: string, description: string, deadline: Date) => void;
  onTodoUpdate: (todo: TodoModel) => void;
  onTodoDelete: (id: number) => void;
}

const mapStateToProps = (state: AppState) => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<TodoAddAction> | Dispatch<TodoDeleteAction>
) => {
  return {
    onTodoAdd: (headline: string, description: string, deadline: Date) => {
      dispatch(AddTodo(headline, description, deadline));
    },
    onTodoUpdate: (updated: TodoModel) => {
      dispatch(UpdateTodo(updated));
    },
    onTodoDelete: (id: number) => {
      (dispatch as Dispatch<TodoDeleteAction>)(DeleteTodo(id));
    }
  };
};

class TodoList extends React.Component<
  TodoListProps & InjectedIntlProps,
  unknown
> {
  state = {
    showNewTodoBlock: false
  };

  constructor(props: TodoListProps & InjectedIntlProps, context: unknown) {
    super(props, context);

    this.createTodo = this.createTodo.bind(this);
    this.showNewTodoBlock = this.showNewTodoBlock.bind(this);
    this.hideNewTodoBlock = this.hideNewTodoBlock.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.createTodoEntry = this.createTodoEntry.bind(this);
  }

  createTodo(
    headline: string,
    description: string,
    deadline: Date,
    id?: number
  ) {
    this.setState({ showNewTodoBlock: false });

    if (id) {
      const oldTodo = find(this.props.todos, e => !!e && e.id === id);

      // Should neven happen, but just in case...
      if (!oldTodo) {
        return;
      }

      this.props.onTodoUpdate({
        ...oldTodo,
        id,
        headline,
        description,
        deadline
      });
    } else {
      this.props.onTodoAdd(headline, description, deadline);
    }

    sendNotification(
      this.props.intl.formatMessage({
        id: `todos.newTodo.${id ? "updated" : "added"}`
      }),
      {
        icon: "favicon.ico",
        body: headline
      },
      5000
    ).catch(error => {
      console.error("Could not send notification:", error);
    });
  }

  render() {
    const displayContent = this.state.showNewTodoBlock ? (
      <TodoEntry
        editable
        createOrUpdateTodo={this.createTodo}
        onCancel={this.hideNewTodoBlock}
        onDelete={noop}
      />
    ) : (
      <div className="new-todo" onClick={this.showNewTodoBlock}>
        <FontIcon>add_circle_outline</FontIcon>
      </div>
    );
    // Do this up-front to be able to use the forced cast easier.
    const todoList = this.props.todos.map(m =>
      this.createTodoEntry(m as TodoModel)
    );

    return (
      <div className="todo-list">
        <h2>
          <FormattedMessage id="todos.list" />
        </h2>
        {todoList}
        {displayContent}
      </div>
    );
  }

  private createTodoEntry(todo: TodoModel) {
    return (
      <TodoEntry
        key={todo.id}
        editable={false}
        onDelete={this.deleteTodo(todo.id)}
        createOrUpdateTodo={this.createTodo}
        onCancel={noop}
        {...todo}
      />
    );
  }

  private deleteTodo(id: number): () => void {
    return () => {
      this.props.onTodoDelete(id);
    };
  }

  private showNewTodoBlock() {
    this.setState({ showNewTodoBlock: true });
  }

  private hideNewTodoBlock() {
    this.setState({ showNewTodoBlock: false });
  }
}

// Split HOC generation to multiple values to attempt to work around a RHL issue
// regarding HOC unwrapping...
const withIntlInjected = injectIntl(TodoList);
const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(withIntlInjected);
export default connected;
