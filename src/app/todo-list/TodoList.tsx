import "./TodoList.scss";

import * as React from "react";
import {connect} from "react-redux";
import {List} from "immutable";

import {TodoModel} from "./todo.model";
import {AppState} from "../app.state";

// Simple Todo entry.
function Todo(todo: TodoModel) {
  return (
    <li className="todo-entry">
      <div className="row headline">
        <div className="h3">{todo.headline}</div>
        <div className="controls">
          <i className="fa fa-edit"></i>
          <i className="fa fa-close"></i>
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
}

const mapStateToProps = (state: AppState) => {
  return {
    todos: state.todos
  }
};

function TodoList({todos}: TodoListProps) {
  return (
    <div className="todo-list">
      <h2>TestRoute 2</h2>
      <ul>
        {todos.map((todo: TodoModel) => <Todo key={todo.id} {...todo} />)}
      </ul>
      <div className="new-todo">
        <i className="fa fa-plus-circle"></i>
      </div>
    </div>
  )
};

export default connect(mapStateToProps)(TodoList);