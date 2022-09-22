import { FormGroupState } from 'ngrx-forms';

import { AppState as RootState } from '../../reducers/app.reducer';

export interface SectionControl {
  //[id: number]: any
}

export interface FormValue {
  // [id: string | number]: { [id: string | number]: any };
  [sectionId: number]: SectionControl[]
}


export interface State extends RootState {
  form: {
    formState: FormGroupState<FormValue>;
    submittedValue: FormValue | undefined;
    sections: any;
    broker: any;
    activeSection: { sectionId: number; isRepeat: boolean };
  };
}
