import { Boxed, unbox } from "ngrx-forms";
import { ValidationErrors } from "ngrx-forms/public_api";
import { pattern } from "ngrx-forms/validation";

/* *** *** ***  *** *** ***  *** *** ***  *** *** *** */
// export function validateRepartition(values: any): ValidationErrors {
//     let total = 0;
//     let unfilledValues = false

//     for (let k in values) {
//         if (values[k] === 0 || values[k] === null) unfilledValues = true
//         total += values[k]
//     }

//     return total === 100 && unfilledValues ? {
//         unfilledRepartition: {
//             actual: ""
//         }
//     } : (total === 100 && !unfilledValues) || Object.entries(values).length === 0 ? {} : {
//         valRep: {
//             actual: total
//         }
//     }
// }

export function exclusion<T>(mustBe: string, comparand: T, errorMessagePopup: string, errorMessage?: string) {
    return <TV extends T | Boxed<T> = T>(value: TV): ValidationErrors => {
        //value = unbox(value) as T as TV;
        value = unbox(value) as any

        if (mustBe === 'equal') {
            if (value === comparand || (value as any) === '') {
                return {};
            }
        }

        if (mustBe === 'dateBefore') {
            const inputDate = new Date((value as any)).getTime()
            if (inputDate && inputDate < (comparand as any) || (value as any) === '') {
                return {}
            }
        }

        if (mustBe === 'businessUseLesserThanOrEqual') {
            if ((value as any)['BusinessUse'] === '' || (value as any)['BusinessUse'] <= (comparand as any)) {
                return {}
            }
        }

        if (mustBe === 'lesserThanOrEqual') {
            if (value <= (comparand as any) || (value as any) === '') {
                return {}
            }
        }

        if (mustBe === 'lesserThan') {
            if (value < (comparand as any) || (value as any) === '') {
                return {}
            }
        }

        if (mustBe === 'greaterThan') {
            if (value > (comparand as any) || (value as any) === '') {
                return {}
            }
        }

        if (mustBe === 'greaterThanOrEqual') {
            if (value >= (comparand as any) || (value as any) === '') {
                return {}
            }
        }

        return {
            'exclusion': {
                comparand,
                actual: value,
                errorMessagePopup,
                errorMessage
            },
        };
    };
}

export function contractorExclusion<T>(isSpecializedContractor: boolean) {
    return <TV extends T | Boxed<T> = T>(value: TV): ValidationErrors => {
        value = unbox(value) as any

        const exclusions = [922, 95, 106, 91, 98, 113, 104, 105, 61, 100, 923, 921, 920, 919, 102, 48, 50, 51, 56, 63, 72, 80, 83, 84, 96, 109, 118, 119, 120, 121, 126, 47, 927]
        const errors = []

        for (let k in value) {
            if ([47, 48, 50, 51, 56, 80, 83, 84, 119, 120, 121, 126, 608].includes(parseInt(k))) {
                errors.push(k)
            }

            if (isSpecializedContractor) {
                if (exclusions.includes(parseInt(k)) && value[k] < 80) {
                    errors.push(k)
                }
            } else {
                if (exclusions.includes(parseInt(k)) && value[k] < 80 && Object.keys(value).length < 4) {
                    errors.push(k)
                }
            }
        }

        return errors.length ? {
            'contractorExclusion': {
                actual: [...errors],
                errorMessagePopup: 'CONTRACTOR_EXCLUSION_POPUP',
                errorMessage: "CONTRACTOR_EXCLUSION"
            },
        } : {}
    };
}


export function validateRepartition(values: any): ValidationErrors {
    let total = 0;
    //let unfilledValues = false

    for (let k in values) {
        total += values[k]
    }

    return (total === 100) || Object.entries(values).length === 0 ? {} : {
        valRep: {
            actual: total
        }
    }
}


export function patterns(patternParams: RegExp[]) {
    const patternValidators = patternParams.map(pattern);

    return <T extends string | Boxed<string> | null | undefined>(value: T): ValidationErrors => {
        const results = patternValidators.map(v => v(value).pattern).filter(r => !!r)
        return results.length === 0 ? {} : { patterns: results }
    };
}

