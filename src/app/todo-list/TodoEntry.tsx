import React, { FC, useState, useCallback } from "react";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import clsx from "clsx";
import produce from "immer";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import type { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputIcon from "@material-ui/icons/Input";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import type { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import type { TodoModel } from "./todo.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  })
);

export interface TodoEntryProps extends Partial<TodoModel> {
  editable: boolean;
  createOrUpdateTodo: (
    headline: string,
    description: string,
    deadline: Date,
    id?: number
  ) => void;
  onCancel: () => void;
  onDelete: () => void;
}

function ReadOnlyTodo(
  todo: Partial<TodoModel> & TodoEntryProps & { onEdit: () => void }
) {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader title={todo.headline} />
      <CardContent>
        <p>{todo.description}</p>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item>
              <FormattedMessage id="todos.entry.created" />
              &nbsp;
              <FormattedDate
                value={todo.created as Date}
                year="numeric"
                month="long"
                day="2-digit"
                hour="2-digit"
                minute="2-digit"
                second="2-digit"
              />
            </Grid>
            <Grid item>
              <FormattedMessage id="todos.entry.deadline" />
              &nbsp;
              <FormattedDate
                value={todo.deadline as Date}
                year="numeric"
                month="long"
                day="2-digit"
                hour="2-digit"
                minute="2-digit"
                second="2-digit"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      <CardActions>
        <Fab color="primary" onClick={todo.onEdit}>
          <InputIcon />
        </Fab>
        <Fab color="primary" onClick={todo.onDelete}>
          <DeleteIcon />
        </Fab>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

type EditableTodoProps = Partial<TodoModel> &
  TodoEntryProps & { onEditLeave: () => void };

const headlineProducer = produce(
  (draft: Partial<TodoModel>, newHeadline: string) => {
    draft.headline = newHeadline;
  }
);
const descriptionProducer = produce(
  (draft: Partial<TodoModel>, newDescription: string) => {
    draft.description = newDescription;
  }
);
const deadlineProducer = produce(
  (draft: Partial<TodoModel>, newDeadline: Date) => {
    draft.deadline = newDeadline;
  }
);

const EditableTodo: FC<EditableTodoProps> = ({
  id,
  headline,
  description,
  deadline,
  createOrUpdateTodo,
  onEditLeave,
  onCancel,
}) => {
  const [currentTodoData, setCurrentTodoData] = useState<Partial<TodoModel>>({
    id,
    headline: headline || "",
    description: description || "",
    deadline,
  });
  const { formatMessage } = useIntl();

  const submitButtonTranslationId = currentTodoData.id
    ? "todos.newTodo.update"
    : "todos.newTodo.create";

  const createTodo = () => {
    createOrUpdateTodo(
      currentTodoData.headline as string,
      currentTodoData.description as string,
      currentTodoData.deadline as Date,
      id
    );

    onEditLeave();
  };

  const updateHeadline = useCallback((newHeadline: string) => {
    setCurrentTodoData((current) => headlineProducer(current, newHeadline));
  }, []);

  const updateDescription = useCallback((newDescription: string) => {
    setCurrentTodoData((current) =>
      descriptionProducer(current, newDescription)
    );
  }, []);

  const updateDeadline = useCallback((newDeadline: Date) => {
    setCurrentTodoData((current) => deadlineProducer(current, newDeadline));
  }, []);

  const updateDate = useCallback(
    (newDate: MaterialUiPickersDate) => {
      const newValue = newDate;
      if (newValue) {
        if (currentTodoData.deadline) {
          newValue.setHours(
            currentTodoData.deadline.getHours(),
            currentTodoData.deadline.getMinutes()
          );
        }
        updateDeadline(newValue);
      }
    },
    [currentTodoData.deadline, updateDeadline]
  );

  const updateTime = useCallback(
    (newDate: MaterialUiPickersDate) => {
      const newValue = newDate;
      if (newValue) {
        if (currentTodoData.deadline) {
          newValue.setFullYear(
            currentTodoData.deadline.getFullYear(),
            currentTodoData.deadline.getMonth(),
            currentTodoData.deadline.getDate()
          );
        }
        updateDeadline(newValue);
      }
    },
    [currentTodoData.deadline, updateDeadline]
  );

  const titlePlaceHolder = formatMessage({
    id: "todos.entry.placeholder.tag",
  });
  const descriptionPlaceholder = formatMessage({
    id: "todos.entry.placeholder.description",
  });
  const datePlaceHolder = formatMessage({
    id: "todos.entry.placeholder.deadline.date",
  });
  const timePlaceholder = formatMessage({
    id: "todos.entry.placeholder.deadline.time",
  });

  const handleCancel = currentTodoData.id ? onEditLeave : onCancel;
  return (
    <form noValidate>
      <Card className="md-block-centered">
        <CardContent>
          <Grid
            container
            justify="space-around"
            alignItems="center"
            spacing={2}
          >
            {/* Texts */}
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="floating-center-title"
                label={titlePlaceHolder}
                placeholder={titlePlaceHolder}
                onChange={(evt) => updateHeadline(evt.target.value)}
                value={currentTodoData.headline}
                error={!currentTodoData.headline}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="autoresizing-2"
                label={descriptionPlaceholder}
                placeholder={descriptionPlaceholder}
                rows={2}
                value={currentTodoData.description}
                error={!currentTodoData.description}
                onChange={(evt) => updateDescription(evt.target.value)}
                required
              />
            </Grid>
            {/* Pickers */}
            <Grid item xs={12} sm={6}>
              <KeyboardDatePicker
                margin="dense"
                id="appointment-date-auto"
                label={datePlaceHolder}
                value={currentTodoData.deadline}
                onChange={updateDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                required
                minDate={new Date()}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <KeyboardTimePicker
                margin="dense"
                id="appointment-time-auto"
                label={timePlaceholder}
                value={currentTodoData.deadline}
                onChange={updateTime}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                required
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            onClick={createTodo}
            disabled={
              !currentTodoData.headline ||
              !currentTodoData.description ||
              !currentTodoData.deadline
            }
          >
            <FormattedMessage id={submitButtonTranslationId} />
          </Button>
          <Button color="secondary" onClick={handleCancel}>
            <FormattedMessage id="todos.newTodo.cancel" />
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

const TodoEntry: FC<Partial<TodoModel> & TodoEntryProps> = (props) => {
  const [isEditable, setIsEditable] = useState(props.editable);

  if (isEditable) {
    return <EditableTodo {...props} onEditLeave={() => setIsEditable(false)} />;
  } else {
    return <ReadOnlyTodo {...props} onEdit={() => setIsEditable(true)} />;
  }
};

export default TodoEntry;
