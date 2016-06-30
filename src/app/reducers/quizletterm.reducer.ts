import {StoreActions} from "../actions/store.actions";
import {Quizletterm} from "../model/quizletTerm.model";

export const quizletterm = (state: Array<Quizletterm> = [], {type, payload}) => {
  switch(type){
    case StoreActions.ADD_QUIZLETTERM.toString():
      return [...state, payload];
    case StoreActions.UPDATE_QUIZLETTERM.toString():
    /*
      let newState = state.slice(0); //Copy the array - Imutable Proramming
      newState[payload.id] = payload.newQuizletterm;
      return newState;
       */

       console.log('Payload id', payload.id);

      return state.map(term =>
        term.id === payload.id ? Object.assign({}, term, payload.newQuizletterm) : term);

/*
      return state.
        map(quizlettermObject => quizlettermObject
          .filter(term => term.id === payload.id)
          .map(term.definitions => Object.assign({} ? payload.newQuizletterm: term));
          */

    case StoreActions.DELETE_QUIZLETTERMS.toString():
      return [];
    default:
      return state;
  }
}
