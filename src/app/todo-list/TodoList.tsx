import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import DateFnsUtils from "@date-io/date-fns";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";

import noop from "lodash-es/noop";

import type { TodoModel } from "./todo.model";
import TodoEntry from "./TodoEntry";
import {
  sendNotification,
  requestNotificationPermission,
} from "../util/notification";
import { useTodos } from "../provider/TodosProvider";
import { useIntlConfig } from "../provider/IntlConfigProvider";

const useStyles = makeStyles(() =>
  createStyles({
    newTodo: {
      cursor: "pointer",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    todoListItem: {
      display: "block",
      width: "50%",
      minWidth: "300px",
    },
  })
);

const TodoList: FC = () => {
  const [showNewTodoBlock, setShowNewTodoBlock] = useState(false);
  const { addTodo, updateTodo, deleteTodo, todos } = useTodos();
  const { formatMessage } = useIntl();
  const { dateLocale } = useIntlConfig();
  const classes = useStyles();

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
      const oldTodo = todos.find((e) => !!e && e.id === id);

      // Should neven happen, but just in case...
      if (!oldTodo) {
        return;
      }

      updateTodo({
        ...oldTodo,
        id,
        headline,
        description,
        deadline,
      });
    } else {
      addTodo(headline, description, deadline);
    }

    sendNotification(
      formatMessage({
        id: `todos.newTodo.${id ? "updated" : "added"}`,
      }),
      {
        icon: "favicon.ico",
        body: headline,
      },
      5000
    ).catch((error) => {
      console.error("Could not send notification:", error);
    });
  };

  const createTodoEntry = (todo: TodoModel) => (
    <ListItem className={classes.todoListItem} key={todo.id}>
      <TodoEntry
        editable={false}
        onDelete={() => deleteTodo(todo.id)}
        createOrUpdateTodo={createTodo}
        onCancel={noop}
        {...todo}
      />
    </ListItem>
  );

  const displayContent = showNewTodoBlock ? (
    <TodoEntry
      editable
      createOrUpdateTodo={createTodo}
      onCancel={() => setShowNewTodoBlock(false)}
      onDelete={noop}
    />
  ) : (
    <Fab className={classes.newTodo} onClick={() => setShowNewTodoBlock(true)}>
      <AddCircleOutlineIcon />
    </Fab>
  );
  // Do this up-front to be able to use the forced cast easier.
  const todoList = todos.map(createTodoEntry);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateLocale}>
      <Typography variant="h4">
        <FormattedMessage id="todos.list" />
      </Typography>
      <List>
        {todoList}
        <ListItem className={classes.todoListItem}>{displayContent}</ListItem>
      </List>
    </MuiPickersUtilsProvider>
  );
};

export default TodoList;
