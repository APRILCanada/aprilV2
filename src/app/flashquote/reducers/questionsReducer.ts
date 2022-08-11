import { createReducer, on } from "@ngrx/store";
import { loadQuestionsSuccess } from "../actions/flashquote.actions";
import { Question } from "../models/Question";

const initialState: Question[] = [];

export const questionsReducer = createReducer(
  initialState,
  on(loadQuestionsSuccess, (state, { flashquote: { questions } }) => [...state, ...questions]))