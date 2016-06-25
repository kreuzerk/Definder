import {Quizletterm} from "../model/quizletTerm.model";

export const quizletterm = (state: Array<Quizletterm> = [], {type, payload}) => {
  switch(type){
    case 'ADD_QUIZLETTERM':
      return [...state, payload];
    default:
      return state;
  }
}
