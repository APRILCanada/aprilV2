import { FormGroupState } from 'ngrx-forms';
import { AppState as RootState } from '../../reducers/app.reducer';
import { ActiveSection } from '../models/ActiveSection';

export interface SectionControl {}

export interface FormValue {
  [sectionId: number]: SectionControl[]
}


export interface State extends RootState {
  form: {
    formState: FormGroupState<FormValue>;
    submittedValue: FormValue | undefined;
    sections: any;
    broker: any;
    ui: any;
    activeSection: ActiveSection;
    prime: any;
    exclusions: string[]
  };
}
