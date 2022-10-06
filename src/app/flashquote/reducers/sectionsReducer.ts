import { HttpResponseBase } from "@angular/common/http";
import { createReducer, on } from "@ngrx/store";
import { loadSectionsSuccess, retrieveOptionsAction } from "../actions/flashquote.actions";
import { Section } from "../models/Section";
import { cloneDeep } from 'lodash';

const initialState: Section[] = [];

export const sectionsReducer = createReducer(
  initialState,
  on(loadSectionsSuccess, (_, { flashquote: { sections } }) => {
    return sections;
  }),
  on(retrieveOptionsAction, (state, { sectionId, questionId, option }) => {

    // clone state
    let newState = cloneDeep(state)

    // get section to update and clone
    let section = newState.find(s => s.id == sectionId)
    let sectionIdx = newState.findIndex(s => s.id == sectionId)
    let sectionClone = cloneDeep(section)

    // get question to update and clone
    let question = sectionClone?.questions.find(q => q.id == questionId)
    let questionIdx = sectionClone?.questions.findIndex(q => q.id == questionId)
    let questionClone = cloneDeep(question)

    // update responses
    const options = option.split(',').slice(0, -1)

    if (questionClone) {
      questionClone.responses = options.map((opt, id) => ({
        id,
        label: { LabelFr: opt, LabelEn: opt },
        responseKey: opt,
        showOrder: id
      }))
    }

    sectionClone?.questions.splice(questionIdx!, 1, questionClone!)

    newState.splice(sectionIdx, 1, sectionClone!)

    return newState

  })
)