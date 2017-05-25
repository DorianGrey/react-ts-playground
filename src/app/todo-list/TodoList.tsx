import "./TodoList.scss";

import * as React from "react";
import {ChangeEvent, FormEvent} from "react";
import {
  FormattedDate,
  FormattedMessage,
  InjectedIntlProps,
  injectIntl
} from "react-intl";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import {List} from "immutable";

import {sendNotification} from "../notifications/NotificationProvider";
import {AppState} from "../state";
import {TodoModel} from "./todo.model";
import {AddTodo, DeleteTodo, TodoAddAction, TodoDeleteAction} from "./todo.state";

// Simple Todo entry.
function Todo(todo: TodoModel & { onDelete: () => void }) {
  return (
    <li className="todo-entry">
      <div className="row headline">
        <div className="h3">{todo.headline}</div>
        <div className="todo-controls">
          <i className="fa fa-edit"/>
          <i className="fa fa-close" onClick={todo.onDelete}/>
        </div>
      </div>
      <div className="row content">
        <div>{todo.description}</div>
        <div className="column">
          <div>
            <b><FormattedMessage id="todos.entry.created"/></b>&nbsp;
            <FormattedDate
              value={todo.created}
              year="numeric"
              month="long"
              day="2-digit"
              hour="2-digit"
              minute="2-digit"
              second="2-digit"
            />
          </div>
          <div>
            <b><FormattedMessage id="todos.entry.deadline"/></b>&nbsp;
            <FormattedDate
              value={todo.deadline}
              year="numeric"
              month="long"
              day="2-digit"
              hour="2-digit"
              minute="2-digit"
              second="2-digit"
            />
          </div>
        </div>
      </div>
    </li>
  );
}

// Todo list.

export interface TodoListProps {
  todos: List<TodoModel>;
  onTodoAdd: (headline: string,
              description: string,
              deadline: Date) => void;
  onTodoDelete: (id: number) => void;
}

const mapStateToProps = (state: AppState) => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = (dispatch: Dispatch<TodoAddAction> | Dispatch<TodoDeleteAction>) => {
  return {
    onTodoAdd:    (headline: string,
                   description: string,
                   deadline: Date) => {
      dispatch(AddTodo(headline, description, deadline));
    },
    onTodoDelete: (id: number) => {
      dispatch(DeleteTodo(id));
    }
  };
};

class TodoList extends React.Component<TodoListProps & InjectedIntlProps, any> {
  state = {
    showNewTodoBlock: false
  };

  currentTodoData: Partial<TodoModel> = {};

  private descriptionInput: HTMLTextAreaElement;
  private headlineInput: HTMLInputElement;

  constructor(props: TodoListProps & InjectedIntlProps, context: any) {
    super(props, context);

    this.createTodo          = this.createTodo.bind(this);
    this.setHeadlineInput    = this.setHeadlineInput.bind(this);
    this.setDescriptionInput = this.setDescriptionInput.bind(this);
    this.setTodoHeadline     = this.setTodoHeadline.bind(this);
    this.setTodoDescription  = this.setTodoDescription.bind(this);
    this.showNewTodoBlock    = this.showNewTodoBlock.bind(this);
    this.deleteTodo          = this.deleteTodo.bind(this);
    this.createTodoEntry     = this.createTodoEntry.bind(this);
  }

  createTodo(event: FormEvent<never>) {
    event.preventDefault();
    this.setState({showNewTodoBlock: false});

    this.props.onTodoAdd(
      this.currentTodoData.headline as string,
      this.currentTodoData.description as string,
      new Date()
    );

    // TODO: We need to translate this one manually1
    sendNotification(this.props.intl.formatMessage({id: "todos.newTodo.added"}), {
      icon: "assets/images/favicon.ico",
      body: this.currentTodoData.headline
    }, 5000);

    this.currentTodoData        = {};
    this.headlineInput.value    = "";
    this.descriptionInput.value = "";
  }

  render() {
    const displayContent = this.state.showNewTodoBlock ?
      (
        <div className="new-todo-block column">
          <form onSubmit={this.createTodo}>
            <input
              placeholder={this.props.intl.formatMessage({id: "todos.entry.placeholder.tag"})}
              required
              ref={this.setHeadlineInput}
              onChange={this.setTodoHeadline}
            />
            <textarea
              placeholder={this.props.intl.formatMessage({id: "todos.entry.placeholder.description"})}
              required
              ref={this.setDescriptionInput}
              onChange={this.setTodoDescription}
            />
            <div className="row todo-creation-controls">
              <button type="submit">
                <FormattedMessage id="todos.newTodo.create"/>
              </button>
              <button type="button" onClick={this.showNewTodoBlock}>
                <FormattedMessage id="todos.newTodo.cancel"/>
              </button>
            </div>
          </form>
        </div>
      )
      : (
        <div className="new-todo" onClick={this.showNewTodoBlock}>
          <i className="fa fa-plus-circle"/>
        </div>
      )
    ;
    return (
      <div className="todo-list">
        <h2><FormattedMessage id="todos.list"/></h2>
        <ul>
          {this.props.todos.map(this.createTodoEntry)}
        </ul>
        {displayContent}
      </div>
    );
  }

  private createTodoEntry(todo: TodoModel) {
    return (
      <Todo
        key={todo.id}
        onDelete={this.deleteTodo(todo.id)}
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
    this.setState({showNewTodoBlock: true});
  }

  private setHeadlineInput(input: HTMLInputElement) {
    this.headlineInput = input;
  }

  private setDescriptionInput(input: HTMLTextAreaElement) {
    this.descriptionInput = input;
  }

  private setTodoHeadline(event: ChangeEvent<HTMLInputElement>) {
    this.currentTodoData.headline = event.target.value;
  }

  private setTodoDescription(event: ChangeEvent<HTMLTextAreaElement>) {
    this.currentTodoData.description = event.target.value;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TodoList));
