import {StoreActions} from "../actions/store.actions";
import {Quizletterm} from "../model/quizletTerm.model";

export const quizletterm = (state: Array<Quizletterm> = [], {type, payload}) => {
  switch(type){
    case StoreActions.ADD_QUIZLETTERM.toString():
      return [...state, payload];
    case StoreActions.UPDATE_QUIZLETTERM.toString():
        return state.map(term =>
        term.id === payload.id ? Object.assign({}, term, payload) : term);

    case StoreActions.DELETE_QUIZLETTERMS.toString():
      return [];
    default:
      return state;
  }
}
