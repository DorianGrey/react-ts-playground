import * as React from "react";

import {TodoModel} from "./todo.model";

export default (todo: TodoModel) => {
  return (
    <li>
      <h3>{todo.headline}</h3>
      <div>{todo.description}</div>
      <div>{todo.deadline.toLocaleString()}</div>
    </li>
  );
}