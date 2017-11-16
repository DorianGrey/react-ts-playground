// tslint:disable max-classes-per-file
import * as React from "react";
import {
  FormattedDate,
  FormattedMessage,
  InjectedIntlProps,
  injectIntl
} from "react-intl";

import Button from "react-md/lib/Buttons/Button";
import Card from "react-md/lib/Cards/Card";
import CardActions from "react-md/lib/Cards/CardActions";
import CardText from "react-md/lib/Cards/CardText";
import CardTitle from "react-md/lib/Cards/CardTitle";
import TextField from "react-md/lib/TextFields/TextField";

import DatePicker from "react-md/lib/Pickers/DatePickerContainer";
import TimePicker from "react-md/lib/Pickers/TimePickerContainer";

import pick from "lodash-es/pick";

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
          <FormattedMessage id="todos.entry.created" />&nbsp;
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
          <FormattedMessage id="todos.entry.deadline" />&nbsp;
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
  TodoEntryProps &
  InjectedIntlProps & { onEditLeave: () => void };

class EditableTodo extends React.Component<EditableTodoProps, any> {
  state = {
    currentTodoData: pick(this.props, [
      "id",
      "headline",
      "description",
      "deadline"
    ]) as Partial<TodoModel>
  };

  submitButtonTranslationId = this.state.currentTodoData.headline
    ? "todos.newTodo.update"
    : "todos.newTodo.create";

  constructor(props: EditableTodoProps, context: any) {
    super(props, context);

    // Set these values to an empty string by default to properly work around a switch between
    // controlled and not-controlled components. See:
    // https://reactjs.org/docs/forms.html#controlled-components
    this.state.currentTodoData.headline =
      this.state.currentTodoData.headline || "";
    this.state.currentTodoData.description =
      this.state.currentTodoData.description || "";

    this.createTodo = this.createTodo.bind(this);
    this.updateHeadline = this.updateHeadline.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  createTodo() {
    this.props.createOrUpdateTodo(
      this.state.currentTodoData.headline as string,
      this.state.currentTodoData.description as string,
      this.state.currentTodoData.deadline as Date,
      this.props.id
    );

    this.props.onEditLeave();
  }

  updateHeadline(newHeadline: number | string) {
    this.setState({
      currentTodoData: {
        ...this.state.currentTodoData,
        headline: newHeadline as string
      }
    });
  }

  updateDescription(newDescription: number | string) {
    this.setState({
      currentTodoData: {
        ...this.state.currentTodoData,
        description: newDescription as string
      }
    });
  }

  updateDate(_formatted: string, newDate: Date) {
    const newValue = newDate;
    if (this.state.currentTodoData.deadline) {
      newDate.setHours(
        this.state.currentTodoData.deadline.getHours(),
        this.state.currentTodoData.deadline.getMinutes()
      );
    }

    this.setState({
      currentTodoData: {
        ...this.state.currentTodoData,
        deadline: newValue
      }
    });
  }

  updateTime(_formatted: string, newDate: Date) {
    const newValue = newDate;
    if (this.state.currentTodoData.deadline) {
      newDate.setFullYear(
        this.state.currentTodoData.deadline.getFullYear(),
        this.state.currentTodoData.deadline.getMonth(),
        this.state.currentTodoData.deadline.getDay()
      );
    }

    this.setState({
      currentTodoData: {
        ...this.state.currentTodoData,
        deadline: newValue
      }
    });
  }

  render(): JSX.Element | any {
    const titlePlaceHolder = this.props.intl.formatMessage({
      id: "todos.entry.placeholder.tag"
    });
    const descriptionPlaceholder = this.props.intl.formatMessage({
      id: "todos.entry.placeholder.description"
    });
    const datePlaceHolder = this.props.intl.formatMessage({
      id: "todos.entry.placeholder.deadline.date"
    });
    const timePlaceholder = this.props.intl.formatMessage({
      id: "todos.entry.placeholder.deadline.time"
    });

    const onCancel = this.state.currentTodoData.id
      ? this.props.onEditLeave
      : this.props.onCancel;

    return (
      <Card className="md-block-centered">
        <CardText>
          <TextField
            id="floating-center-title"
            label={titlePlaceHolder}
            lineDirection="center"
            placeholder={titlePlaceHolder}
            className="md-cell md-cell--bottom"
            onChange={this.updateHeadline}
            value={this.state.currentTodoData.headline}
            error={!this.state.currentTodoData.headline}
            required
          />
          <TextField
            id="autoresizing-2"
            className="md-cell md-cell--bottom"
            label={descriptionPlaceholder}
            placeholder={descriptionPlaceholder}
            resize={{ min: 200, max: 250 }}
            rows={2}
            value={this.state.currentTodoData.description}
            error={!this.state.currentTodoData.description}
            onChange={this.updateDescription}
            required
          />
          <DatePicker
            id="appointment-date-auto"
            locales={this.props.intl.locale}
            label={datePlaceHolder}
            className="md-cell"
            minDate={new Date()}
            value={this.state.currentTodoData.deadline}
            error={!this.state.currentTodoData.deadline}
            onChange={this.updateDate}
            required
          />
          <TimePicker
            id="appointment-time-auto"
            locales={this.props.intl.locale}
            label={timePlaceholder}
            className="md-cell"
            value={this.state.currentTodoData.deadline}
            error={!this.state.currentTodoData.deadline}
            onChange={this.updateTime}
            required
          />
        </CardText>
        <CardActions>
          <Button
            primary
            raised
            onClick={this.createTodo}
            disabled={
              !this.state.currentTodoData.headline ||
              !this.state.currentTodoData.description ||
              !this.state.currentTodoData.deadline
            }
          >
            <FormattedMessage id={this.submitButtonTranslationId} />
          </Button>
          <Button secondary raised onClick={onCancel}>
            <FormattedMessage id="todos.newTodo.cancel" />
          </Button>
        </CardActions>
      </Card>
    );
  }
}

class TodoEntry extends React.Component<
  Partial<TodoModel> & TodoEntryProps & InjectedIntlProps,
  any
> {
  state = {
    editable: this.props.editable
  };

  constructor(
    props: Partial<TodoModel> & TodoEntryProps & InjectedIntlProps,
    context: any
  ) {
    super(props, context);

    this.setEditable = this.setEditable.bind(this);
    this.setReadable = this.setReadable.bind(this);
  }

  render(): JSX.Element | any {
    if (this.state.editable) {
      return <EditableTodo {...this.props} onEditLeave={this.setReadable} />;
    } else {
      return <ReadOnlyTodo {...this.props} onEdit={this.setEditable} />;
    }
  }

  private setEditable(): void {
    this.setState({ editable: true });
  }

  private setReadable(): void {
    this.setState({ editable: false });
  }
}

export default injectIntl(TodoEntry);
// tslint:enable max-class-per-file
