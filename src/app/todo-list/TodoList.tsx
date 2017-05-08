import * as React from "react";
import {connect} from "react-redux";
import {List} from "immutable";

import {TodoModel} from "./todo.model";
import Todo from "./Todo";
import {AppState} from "../app.state";

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
    <div>
      <h2>TestRoute 2</h2>
      <ul>
        {todos.map((todo: TodoModel) => <Todo key={todo.id} {...todo} />)}
      </ul>
    </div>
  )
};

export default connect(mapStateToProps)(TodoList);