import "./TodoList.scss";

import React, { FunctionComponent, useState } from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import find from "lodash-es/find";
import noop from "lodash-es/noop";

import FontIcon from "react-md/lib/FontIcons/FontIcon";

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
import { useNotification } from "../hooks/useNotification";

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

const TodoList: FunctionComponent<TodoListProps & InjectedIntlProps> = ({
  todos,
  onTodoUpdate,
  onTodoAdd,
  onTodoDelete,
  intl
}) => {
  const [showNewTodoBlock, setShowNewTodoBlock] = useState(false);
  const [, sendNotification] = useNotification();
  const createTodo = (
    headline: string,
    description: string,
    deadline: Date,
    id?: number
  ) => {
    setShowNewTodoBlock(false);

    if (id) {
      const oldTodo = find(todos, e => !!e && e.id === id);

      // Should neven happen, but just in case...
      if (!oldTodo) {
        return;
      }

      onTodoUpdate({
        ...oldTodo,
        id,
        headline,
        description,
        deadline
      });
    } else {
      onTodoAdd(headline, description, deadline);
    }

    sendNotification(
      intl.formatMessage({
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
  };

  const createTodoEntry = (todo: TodoModel) => (
    <TodoEntry
      key={todo.id}
      editable={false}
      onDelete={() => onTodoDelete(todo.id)}
      createOrUpdateTodo={createTodo}
      onCancel={noop}
      {...todo}
    />
  );

  const displayContent = showNewTodoBlock ? (
    <TodoEntry
      editable
      createOrUpdateTodo={createTodo}
      onCancel={() => setShowNewTodoBlock(false)}
      onDelete={noop}
    />
  ) : (
    <div className="new-todo" onClick={() => setShowNewTodoBlock(true)}>
      <FontIcon>add_circle_outline</FontIcon>
    </div>
  );
  // Do this up-front to be able to use the forced cast easier.
  const todoList = todos.map(m => createTodoEntry(m as TodoModel));

  return (
    <div className="todo-list">
      <h2>
        <FormattedMessage id="todos.list" />
      </h2>
      {todoList}
      {displayContent}
    </div>
  );
};

// Split HOC generation to multiple values to attempt to work around a RHL issue
// regarding HOC unwrapping...
const withIntlInjected = injectIntl(TodoList);
const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(withIntlInjected);
export default connected;
