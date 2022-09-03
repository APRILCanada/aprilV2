import { createReducer, on } from "@ngrx/store";
import { loadSectionsSuccess } from "../actions/flashquote.actions";
import { Section } from "../models/Section";

const initialState: Section[] = [];

export const sectionsReducer = createReducer(
  initialState,
  on(loadSectionsSuccess, (_, { flashquote: { sections }}) => {
    return sections;
  }))