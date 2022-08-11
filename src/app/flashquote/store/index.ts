import { FormGroupState } from 'ngrx-forms';

import { AppState as RootState } from '../../reducers/app.reducer';

export interface FormValue {
  [id: string]: string | { [id: string]: string };
}

export interface State extends RootState {
  form: {
    formState: FormGroupState<FormValue>;
    submittedValue: FormValue | undefined;
    questions: any;
    broker: any;
  };
}
