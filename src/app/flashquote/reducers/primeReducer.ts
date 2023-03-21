import { createReducer, on } from '@ngrx/store';
import { setPrime } from '../actions/flashquote.actions';


const initialState = {
    applicantName: '',
    prime: 0,
    data: []
};

export const primeReducer = createReducer(
    initialState,
    on(setPrime, (state, { marketId, formValue, prime }) => {
        // CONTRACTOR (MARKET ID = 76)
        if (marketId == '76') {
            return {
                ...state,
                prime,
                applicantName: formValue.value[167][0][2891],
            }
        }

        // AUTO PERSO (MARKET ID = 28)
        if (marketId == '28') {
            const data = formValue.value[36].reduce((acc: any, curr: any) => {
                let currentVehicle = curr[301]['Vehicle-Year'] + ' ' + curr[301]['Vehicle-Model']
                let protections = {
                    'LIABILITY': curr[284],
                    'B2': curr[294],
                    'B3': curr[295],
                    'FAQ34': curr[297],
                    'FAQ20': curr[298],
                    'FAQ27': curr[299]
                }

                acc.push({
                    vehicle: currentVehicle,
                    ...protections
                })
                return acc
            }, [])

            return {
                ...state,
                prime,
                data,     
                applicantName: formValue.value[34][0][223],
            }
        }
        if (marketId == '50') {
            return {
                ...state,
                prime,
                applicantName: formValue.value[62][0][849],
            }
        }
        if (marketId == '80') {
            return {
                ...state,
                prime,
                applicantName: 'TODO',
            }
        }

        return { ...state }
    })
);