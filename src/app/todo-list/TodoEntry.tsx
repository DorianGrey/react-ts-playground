import React, { FC, useState } from "react";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";

import Button from "react-md/lib/Buttons/Button";
import Card from "react-md/lib/Cards/Card";
import CardActions from "react-md/lib/Cards/CardActions";
import CardText from "react-md/lib/Cards/CardText";
import CardTitle from "react-md/lib/Cards/CardTitle";
import TextField from "react-md/lib/TextFields/TextField";

import DatePicker from "react-md/lib/Pickers/DatePickerContainer";
import TimePicker from "react-md/lib/Pickers/TimePickerContainer";

import { TodoModel } from "./todo.model";

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
  return (
    <Card className="md-block-centered" defaultExpanded>
      <CardTitle title={todo.headline} expander />
      <CardText expandable>
        <p>{todo.description}</p>
        <p>
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
        </p>
        <p>
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
        </p>
      </CardText>
      <CardActions>
        <Button floating primary mini onClick={todo.onEdit}>
          input
        </Button>
        <Button floating primary mini onClick={todo.onDelete}>
          delete
        </Button>
      </CardActions>
    </Card>
  );
}

type EditableTodoProps = Partial<TodoModel> &
  TodoEntryProps & { onEditLeave: () => void };

const EditableTodo: FC<EditableTodoProps> = ({
  id,
  headline,
  description,
  deadline,
  createOrUpdateTodo,
  onEditLeave,
  onCancel
}) => {
  const [currentTodoData, setCurrentTodoData] = useState<Partial<TodoModel>>({
    id,
    headline: headline || "",
    description: description || "",
    deadline
  });
  const { formatMessage, locale } = useIntl();

  const submitButtonTranslationId = currentTodoData.headline
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

  const updateHeadline = (newHeadline: number | string) => {
    setCurrentTodoData({
      ...currentTodoData,
      headline: newHeadline as string
    });
  };

  const updateDescription = (newDescription: number | string) => {
    setCurrentTodoData({
      ...currentTodoData,
      description: newDescription as string
    });
  };

  const updateDate = (_formatted: string, newDate: Date) => {
    const newValue = newDate;
    if (currentTodoData.deadline) {
      newDate.setHours(
        currentTodoData.deadline.getHours(),
        currentTodoData.deadline.getMinutes()
      );
    }

    setCurrentTodoData({
      ...currentTodoData,
      deadline: newValue
    });
  };

  const updateTime = (_formatted: string, newDate: Date) => {
    const newValue = newDate;
    if (currentTodoData.deadline) {
      newDate.setFullYear(
        currentTodoData.deadline.getFullYear(),
        currentTodoData.deadline.getMonth(),
        currentTodoData.deadline.getDay()
      );
    }

    setCurrentTodoData({
      ...currentTodoData,
      deadline: newValue
    });
  };

  const titlePlaceHolder = formatMessage({
    id: "todos.entry.placeholder.tag"
  });
  const descriptionPlaceholder = formatMessage({
    id: "todos.entry.placeholder.description"
  });
  const datePlaceHolder = formatMessage({
    id: "todos.entry.placeholder.deadline.date"
  });
  const timePlaceholder = formatMessage({
    id: "todos.entry.placeholder.deadline.time"
  });

  const handleCancel = currentTodoData.id ? onEditLeave : onCancel;
  return (
    <Card className="md-block-centered">
      <CardText>
        <TextField
          id="floating-center-title"
          label={titlePlaceHolder}
          lineDirection="center"
          placeholder={titlePlaceHolder}
          className="md-cell md-cell--bottom"
          onChange={updateHeadline}
          value={currentTodoData.headline}
          error={!currentTodoData.headline}
          required
        />
        <TextField
          id="autoresizing-2"
          className="md-cell md-cell--bottom"
          label={descriptionPlaceholder}
          placeholder={descriptionPlaceholder}
          resize={{ min: 200, max: 250 }}
          rows={2}
          value={currentTodoData.description}
          error={!currentTodoData.description}
          onChange={updateDescription}
          required
        />
        <DatePicker
          id="appointment-date-auto"
          locales={locale}
          label={datePlaceHolder}
          className="md-cell"
          minDate={new Date()}
          value={currentTodoData.deadline}
          error={!currentTodoData.deadline}
          onChange={updateDate}
          required
        />
        <TimePicker
          id="appointment-time-auto"
          locales={locale}
          label={timePlaceholder}
          className="md-cell"
          value={currentTodoData.deadline}
          error={!currentTodoData.deadline}
          onChange={updateTime}
          required
        />
      </CardText>
      <CardActions>
        <Button
          primary
          raised
          onClick={createTodo}
          disabled={
            !currentTodoData.headline ||
            !currentTodoData.description ||
            !currentTodoData.deadline
          }
        >
          <FormattedMessage id={submitButtonTranslationId} />
        </Button>
        <Button secondary raised onClick={handleCancel}>
          <FormattedMessage id="todos.newTodo.cancel" />
        </Button>
      </CardActions>
    </Card>
  );
};

const TodoEntry: FC<Partial<TodoModel> & TodoEntryProps> = props => {
  const [isEditable, setIsEditable] = useState(props.editable);

  if (isEditable) {
    return <EditableTodo {...props} onEditLeave={() => setIsEditable(false)} />;
  } else {
    return <ReadOnlyTodo {...props} onEdit={() => setIsEditable(true)} />;
  }
};

export default TodoEntry;
