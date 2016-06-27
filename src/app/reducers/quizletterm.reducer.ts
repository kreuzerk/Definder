import {StoreActions} from "../actions/store.actions";
import {Quizletterm} from "../model/quizletTerm.model";

export const quizletterm = (state: Array<Quizletterm> = [], {type, payload}) => {
  switch(type){
    case StoreActions.ADD_QUIZLETTERM.toString():
      return [...state, payload];
    case StoreActions.UPDATE_QUIZLETTERM.toString():
      let newState = state.slice(0); //Copy the array - Imutable Proramming
      newState[payload.rowIndex] = payload.newQuizletterm;
      return newState;
    default:
      return state;
  }
}
