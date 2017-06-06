import {List} from "immutable";
import {Action} from "redux";

import {TodoModel} from "./todo.model";

export type TodoAddAction = Action & { payload: TodoModel };
export type TodoUpdateAction = Action & { payload: TodoModel };
export type TodoDeleteAction = Action & { payload: { id: number } };
export type TodoState = List<TodoModel>;

const ACTION_TYPES = {
  ADD_TODO:    "ADD_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  DELETE_TODO: "DELETE_TODO"
};

Object.freeze(ACTION_TYPES);

export function AddTodo(headline: string,
                        description: string,
                        deadline: Date) {
  return {
    type:    ACTION_TYPES.ADD_TODO,
    payload: {
      id:      Math.random() * 1000,
      created: new Date(),
      headline,
      description,
      deadline
    }
  };
}

export function UpdateTodo(todo: TodoModel) {
  return {
    type:    ACTION_TYPES.UPDATE_TODO,
    payload: todo
  };
}

export function DeleteTodo(id: number) {
  return {
    type:    ACTION_TYPES.DELETE_TODO,
    payload: {
      id
    }
  };
}

export const initialTodoList: TodoState = List.of<TodoModel>({
  id:          1,
  headline:    "Test todo",
  description: "A lot of stuff to be done!",
  deadline:    new Date(),
  created:     new Date()
});


export const todosReducer = (state: TodoState = initialTodoList, action: TodoAddAction | TodoUpdateAction | TodoDeleteAction) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TODO:
      return state.push((action as TodoAddAction).payload);
    case ACTION_TYPES.UPDATE_TODO:
      const act      = action as TodoUpdateAction;
      const oldIndex = state.findIndex(e => !!e && e.id === act.payload.id);
      if (oldIndex >= 0) {
        return state.set(oldIndex, act.payload);
      } else {
        return state;
      }
    case ACTION_TYPES.DELETE_TODO:
      return state.filter((e: TodoModel) => e.id !== (action as TodoDeleteAction).payload.id);
    default:
      return state;
  }
};
