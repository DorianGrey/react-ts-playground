import "./TodoList.scss";

import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import FontIcon from "react-md/lib/FontIcons/FontIcon";

import find from "lodash-es/find";
import noop from "lodash-es/noop";

import { TodoModel } from "./todo.model";
import TodoEntry from "./TodoEntry";
import {
  sendNotification,
  requestNotificationPermission
} from "../util/notification";
import { useTodos } from "../provider/TodosProvider";

const TodoList: FC = () => {
  const [showNewTodoBlock, setShowNewTodoBlock] = useState(false);
  const { addTodo, updateTodo, deleteTodo, todos } = useTodos();
  const { formatMessage } = useIntl();

  // Ask for permission once up-front to simplify successive requests.
  useEffect(() => {
    requestNotificationPermission();
  }, []);

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

      updateTodo({
        ...oldTodo,
        id,
        headline,
        description,
        deadline
      });
    } else {
      addTodo(headline, description, deadline);
    }

    sendNotification(
      formatMessage({
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
      onDelete={() => deleteTodo(todo.id)}
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

export default TodoList;
