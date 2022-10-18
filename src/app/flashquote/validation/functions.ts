import { Boxed, ValidationErrors } from "ngrx-forms/public_api";
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
