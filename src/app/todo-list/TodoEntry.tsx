// tslint:disable max-classes-per-file
import "./TodoEntry.scss";

import * as React from "react";
import {
  FormattedDate,
  FormattedMessage,
  InjectedIntlProps,
  injectIntl
} from "react-intl";

import linkstate from "linkstate";
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

function ReadOnlyTodo(todo: TodoEntryProps & { onEdit: () => void }) {
  return (
    <div className="todo-entry">
      <div className="row headline">
        <div className="h3">{todo.headline}</div>
        <div className="todo-controls">
          <i className="fa fa-edit" onClick={todo.onEdit} />
          <i className="fa fa-close" onClick={todo.onDelete} />
        </div>
      </div>
      <div className="row content">
        <div>{todo.description}</div>
        <div className="column">
          <div>
            <b>
              <FormattedMessage id="todos.entry.created" />
            </b>&nbsp;
            <FormattedDate
              value={todo.created as Date}
              year="numeric"
              month="long"
              day="2-digit"
              hour="2-digit"
              minute="2-digit"
              second="2-digit"
            />
          </div>
          <div>
            <b>
              <FormattedMessage id="todos.entry.deadline" />
            </b>&nbsp;
            <FormattedDate
              value={todo.deadline as Date}
              year="numeric"
              month="long"
              day="2-digit"
              hour="2-digit"
              minute="2-digit"
              second="2-digit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type EditableTodoProps = TodoEntryProps &
  InjectedIntlProps & { onEditLeave: () => void };

class EditableTodo extends React.Component<EditableTodoProps, any> {
  descriptionInput: HTMLTextAreaElement;
  headlineInput: HTMLInputElement;
  deadlineInput: HTMLInputElement;

  state = {
    currentTodoData: pick(this.props, [
      "headline",
      "description",
      "deadline"
    ]) as Partial<TodoModel>
  };

  submitButtonTranslationId = this.state.currentTodoData.headline
    ? "todos.newTodo.update"
    : "todos.newTodo.create";

  // private flatpickrOptions: Flatpickr.Options = {
  //   defaultDate: this.state.currentTodoData.deadline,
  //   enableTime: true,
  //   locale: this.props.intl.locale, // TODO: Need lang pack here.
  //   time_24hr: this.props.intl.locale !== "en",
  //   minDate: new Date(),
  //   onChange: this.setTodoDeadline.bind(this)
  // };

  constructor(props: EditableTodoProps, context: any) {
    super(props, context);

    this.createTodo = this.createTodo.bind(this);
    this.setHeadlineInput = this.setHeadlineInput.bind(this);
    this.setDescriptionInput = this.setDescriptionInput.bind(this);
    this.setDeadlineInput = this.setDeadlineInput.bind(this);
  }

  componentWillUnmount(): void {
    // this.flatpickr.destroy();
  }

  setHeadlineInput(input: HTMLInputElement) {
    this.headlineInput = input;
  }

  setDescriptionInput(input: HTMLTextAreaElement) {
    this.descriptionInput = input;
  }

  setDeadlineInput(input: HTMLInputElement) {
    this.deadlineInput = input;
    // this.flatpickr = new Flatpickr(this.deadlineInput, this.flatpickrOptions);
  }

  setTodoDeadline(selectedDates: Date[]) {
    this.setState({
      currentTodoData: {
        ...this.state.currentTodoData,
        deadline: selectedDates[0]
      }
    });
  }

  createTodo(event: React.FormEvent<never>) {
    event.preventDefault();
    this.props.createOrUpdateTodo(
      this.state.currentTodoData.headline as string,
      this.state.currentTodoData.description as string,
      this.state.currentTodoData.deadline as Date,
      this.props.id
    );

    this.props.onEditLeave();
  }

  render(): JSX.Element | any {
    return (
      <div className="new-todo-block column">
        <form onSubmit={this.createTodo}>
          <input
            placeholder={this.props.intl.formatMessage({
              id: "todos.entry.placeholder.tag"
            })}
            type="text"
            required
            defaultValue={this.state.currentTodoData.headline}
            ref={this.setHeadlineInput}
            onChange={linkstate(this, "currentTodoData.headline")}
          />
          <textarea
            placeholder={this.props.intl.formatMessage({
              id: "todos.entry.placeholder.description"
            })}
            required
            defaultValue={this.state.currentTodoData.description}
            ref={this.setDescriptionInput}
            onChange={linkstate(this, "currentTodoData.description")}
          />
          <input
            type="text"
            placeholder={this.props.intl.formatMessage({
              id: "todos.entry.placeholder.deadline"
            })}
            required
            ref={this.setDeadlineInput}
            className={
              this.state.currentTodoData.deadline ? "" : "is-invalid-form-field"
            }
          />
          <div className="row todo-creation-controls">
            <button
              type="submit"
              disabled={
                !this.state.currentTodoData.headline ||
                !this.state.currentTodoData.description ||
                !this.state.currentTodoData.deadline
              }
            >
              <FormattedMessage id={this.submitButtonTranslationId} />
            </button>
            <button type="button" onClick={this.props.onCancel}>
              <FormattedMessage id="todos.newTodo.cancel" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

class TodoEntry extends React.Component<
  TodoEntryProps & InjectedIntlProps,
  any
> {
  state = {
    editable: this.props.editable
  };

  constructor(props: TodoEntryProps & InjectedIntlProps, context: any) {
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
