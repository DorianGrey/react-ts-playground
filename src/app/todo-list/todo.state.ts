import {List} from "immutable";
import {TodoModel} from "./todo.model";
import {Action} from "redux";

export type TodoState = List<TodoModel>;

const ACTION_TYPES = {
  ADD_TODO: "ADD_TODO"
};

Object.freeze(ACTION_TYPES);

export function AddTodo(payload: TodoModel) {
  return {
    type: ACTION_TYPES.ADD_TODO,
    payload
  };
}

const initialTodoList: TodoState = List.of<TodoModel>({
  id:          1,
  headline:    "Test todo",
  description: "A lot of stuff to be done!",
  deadline:    new Date()
});


export const todosReducer = (state: TodoState = initialTodoList, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TODO:
      // TODO: Need to figure out what to do here ?!
      return state.push(action.type);
    default:
      return state;
  }
};