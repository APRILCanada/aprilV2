import { FlashquoteLoadedAction } from "../actions/flashquote.actions";

export function questionsReducer(s: [], a: FlashquoteLoadedAction) {
  switch (a.type) {
    case FlashquoteLoadedAction.TYPE:
      return [...a.flashquote.questions]

    default:
      return s
  }
}