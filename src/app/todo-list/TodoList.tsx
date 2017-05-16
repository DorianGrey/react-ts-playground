import "./TodoList.scss";

import * as React from "react";
import {connect} from "react-redux";
import {List} from "immutable";

import {TodoModel} from "./todo.model";
import {AppState} from "../state";
import {AddTodo, DeleteTodo, TodoAddAction, TodoDeleteAction} from "./todo.state";
import {Dispatch} from "redux";
import {FormEvent} from "react";
import {sendNotification} from "../notifications/NotificationProvider";

// Simple Todo entry.
function Todo(todo: TodoModel & { onDelete: () => void }) {
  return (
    <li className="todo-entry">
      <div className="row headline">
        <div className="h3">{todo.headline}</div>
        <div className="todo-controls">
          <i className="fa fa-edit"/>
          <i className="fa fa-close" onClick={ () => todo.onDelete() }/>
        </div>
      </div>
      <div className="row content">
        <div>{todo.description}</div>
        <div className="column">
          <div><b>Created:</b>&nbsp;{todo.created.toLocaleString()}</div>
          <div><b>Deadline:</b>&nbsp;{todo.deadline.toLocaleString()}</div>
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

class TodoList extends React.Component<TodoListProps, any> {
  state = {
    showNewTodoBlock: false
  };

  currentTodoData: Partial<TodoModel> = {};

  private descriptionInput: HTMLTextAreaElement;
  private headlineInput: HTMLInputElement;

  createTodo(event: FormEvent<never>) {
    event.preventDefault();
    this.setState({showNewTodoBlock: false});

    this.props.onTodoAdd(
      this.currentTodoData.headline as string,
      this.currentTodoData.description as string,
      new Date()
    );

    sendNotification("New todo added successfully!", {
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
          <form onSubmit={event => this.createTodo(event)}>
            <input placeholder="Tag..."
                   required
                   ref={input => this.headlineInput = input}
                   onChange={(event) => this.currentTodoData.headline = event.target.value}/>
            <textarea placeholder="Description..."
                      required
                      ref={input => this.descriptionInput = input}
                      onChange={(event) => this.currentTodoData.description = event.target.value}/>
            <div className="row todo-creation-controls">
              <button type="submit">Create</button>
              <button type="button" onClick={ () => this.setState({showNewTodoBlock: true}) }>Cancel</button>
            </div>
          </form>
        </div>
      )
      : (
        <div className="new-todo" onClick={ () => this.setState({showNewTodoBlock: true}) }>
          <i className="fa fa-plus-circle"/>
        </div>
      )
    ;
    return (
      <div className="todo-list">
        <h2>Todo list</h2>
        <ul>
          {this.props.todos.map((todo: TodoModel) => <Todo key={todo.id}
                                                           onDelete={() => this.props.onTodoDelete(todo.id)} {...todo}  />)}
        </ul>
        {displayContent}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);