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
  on(retrieveOptionsAction, (state, { sectionId, groupId, questionId, option }) => {

    // clone state
    let newState = cloneDeep(state)

    // get section to update and clone
    let section = newState!.find(s => s.id == sectionId)
    let sectionIdx = newState!.findIndex(s => s.id == sectionId)
    let sectionClone = cloneDeep(section)

    // get question to update and clone
    let question = sectionClone!.questions.find(q => q.id == questionId)
    let questionIdx = sectionClone!.questions.findIndex(q => q.id == questionId)
    let questionClone = cloneDeep(question)

    // add new option to responses
    if (questionClone!.responses.find(r => r.id == groupId)) {
      let qIdx = questionClone!.responses.findIndex(r => r.id == groupId)
      questionClone!.responses.splice(qIdx, 1, {
        id: groupId,
        label: { LabelFr: option, LabelEn: option },
        responseKey: option,
        showOrder: groupId
      })
    }
    else questionClone!.responses.push({
      id: groupId,
      label: { LabelFr: option, LabelEn: option },
      responseKey: option,
      showOrder: groupId
    })

    sectionClone!.questions.splice(questionIdx!, 1, questionClone!)

    newState.splice(sectionIdx!, 1, sectionClone!)


    return newState

  })
)