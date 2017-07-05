import "./TodoEntry.scss";

import * as React from "react";
import { ChangeEvent, FormEvent } from "react";
import {
  FormattedDate,
  FormattedMessage,
  InjectedIntlProps,
  injectIntl
} from "react-intl";

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
        <div className="h3">
          {todo.headline}
        </div>
        <div className="todo-controls">
          <i className="fa fa-edit" onClick={todo.onEdit} />
          <i className="fa fa-close" onClick={todo.onDelete} />
        </div>
      </div>
      <div className="row content">
        <div>
          {todo.description}
        </div>
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

function EditableTodo(
  props: TodoEntryProps & InjectedIntlProps & { onEditLeave: () => void }
) {
  let descriptionInput: HTMLTextAreaElement;
  let headlineInput: HTMLInputElement;
  const currentTodoData: Partial<TodoModel> = pick(props, [
    "headline",
    "description"
  ]);

  function setHeadlineInput(input: HTMLInputElement) {
    headlineInput = input;
  }

  function setDescriptionInput(input: HTMLTextAreaElement) {
    descriptionInput = input;
  }

  function setTodoHeadline(event: ChangeEvent<HTMLInputElement>) {
    currentTodoData.headline = event.target.value;
  }

  function setTodoDescription(event: ChangeEvent<HTMLTextAreaElement>) {
    currentTodoData.description = event.target.value;
  }

  function createTodo(event: FormEvent<never>) {
    event.preventDefault();
    props.createOrUpdateTodo(
      currentTodoData.headline as string,
      currentTodoData.description as string,
      new Date(),
      props.id
    );
    props.onEditLeave();
  }

  return (
    <div className="new-todo-block column">
      <form onSubmit={createTodo}>
        <input
          placeholder={props.intl.formatMessage({
            id: "todos.entry.placeholder.tag"
          })}
          required
          defaultValue={currentTodoData.headline}
          ref={setHeadlineInput}
          onChange={setTodoHeadline}
        />
        <textarea
          placeholder={props.intl.formatMessage({
            id: "todos.entry.placeholder.description"
          })}
          required
          defaultValue={currentTodoData.description}
          ref={setDescriptionInput}
          onChange={setTodoDescription}
        />
        <div className="row todo-creation-controls">
          <button type="submit">
            <FormattedMessage
              id={
                currentTodoData.headline
                  ? "todos.newTodo.update"
                  : "todos.newTodo.create"
              }
            />
          </button>
          <button type="button" onClick={props.onCancel}>
            <FormattedMessage id="todos.newTodo.cancel" />
          </button>
        </div>
      </form>
    </div>
  );
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
