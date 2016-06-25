import {StoreActions} from "../actions/store.actions";
import {Quizletterm} from "../model/quizletTerm.model";

export const quizletterm = (state: Array<Quizletterm> = [], {type, payload}) => {
  switch(type){
    case StoreActions.ADD_QUIZLETTERM.toString():
      return [...state, payload];
    default:
      return state;
  }
}
