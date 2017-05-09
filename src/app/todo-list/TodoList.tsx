import "./TodoList.scss";

import * as React from "react";
import {connect} from "react-redux";
import {List} from "immutable";

import {TodoModel} from "./todo.model";
import {AppState} from "../app.state";
import {AddTodo, DeleteTodo, TodoAddAction} from "./todo.state";
import {Dispatch} from "redux";

// Simple Todo entry.
function Todo(todo: TodoModel & { onDelete: () => void }) {
  return (
    <li className="todo-entry">
      <div className="row headline">
        <div className="h3">{todo.headline}</div>
        <div className="controls">
          <i className="fa fa-edit"></i>
          <i className="fa fa-close" onClick={ () => todo.onDelete() }></i>
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
  }
};

const mapDispatchToProps = (dispatch: Dispatch<TodoAddAction>) => {
  return {
    onTodoAdd:    (headline: string,
                   description: string,
                   deadline: Date) => {
      dispatch(AddTodo(headline, description, deadline))
    },
    onTodoDelete: (id: number) => {
      dispatch(DeleteTodo(id));
    }
  }
};

class TodoList extends React.Component<TodoListProps, any> {
  state = {
    showNewTodoBlock: false
  };

  currentTodoData: Partial<TodoModel> = {};

  private descriptionInput: HTMLTextAreaElement;
  private headlineInput: HTMLInputElement;

  createTodo() {
    this.setState({showNewTodoBlock: false});

    this.props.onTodoAdd(
      this.currentTodoData.headline as string,
      this.currentTodoData.description as string,
      new Date()
    );

    this.currentTodoData        = {};
    this.headlineInput.value    = "";
    this.descriptionInput.value = "";
  }

  render() {
    return (
      <div className="todo-list">
        <h2>TestRoute 2</h2>
        <ul>
          {this.props.todos.map((todo: TodoModel) => <Todo key={todo.id}
                                                           onDelete={() => this.props.onTodoDelete(todo.id)} {...todo}  />)}
        </ul>
        <div className="new-todo-block column" hidden={!this.state.showNewTodoBlock}>
          <div>
            <label htmlFor="new-todo-headline">Name:</label>
            <input id="new-todo-headline"
                   ref={input => this.headlineInput = input}
                   onChange={(event) => this.currentTodoData.headline = event.target.value}/>
          </div>
          <div>
            <label htmlFor="new-todo-description">Description:</label>
            <textarea id="new-todo-description"
                      ref={input => this.descriptionInput = input}
                      onChange={(event) => this.currentTodoData.description = event.target.value}/>
          </div>
          <button type="button" onClick={() => this.createTodo()}>Create</button>
        </div>
        <div className="new-todo" onClick={ () => this.setState({showNewTodoBlock: true}) }
             hidden={this.state.showNewTodoBlock}>
          <i className="fa fa-plus-circle"></i>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);