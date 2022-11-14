import { createReducer, on } from '@ngrx/store';
import { setActiveSection } from '../actions/flashquote.actions';
import { ActiveSection } from '../models/ActiveSection';

const initialState: ActiveSection = {
    id: 0, title: { LabelEn: '', LabelFr: '' }, isRepeat: false, index: 0, isFirst: true, isLast: false, isPrime: false, isExcluded: false, sectionsLength: 0, maxRepeat: 0
};

export const activeSectionReducer = createReducer(
    initialState,
    on(setActiveSection, (state, { activeSection }) => {
        return {
            ...activeSection
        }
    })
)