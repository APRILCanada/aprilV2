import { createReducer, on } from '@ngrx/store';
import { setActiveSection } from '../actions/flashquote.actions';

const initialState = {
    sectionId: 0,
    isRepeat: false
};

export const activeSectionReducer = createReducer(
    initialState,
    on(setActiveSection, (_, { sectionId, isRepeat }) => ({
        sectionId,
        isRepeat
    }))
)