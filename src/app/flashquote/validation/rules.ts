import { ValidationErrors } from "@angular/forms";
import { Boxed, FormControlState, unbox, updateArray, updateGroup, validate } from "ngrx-forms";
import { email, pattern, required } from "ngrx-forms/validation";
import { SectionControl } from "../store";
import { validateRepartition } from "./functions";


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


export const validation: any = {
    // auto perso
    28: {
        34: updateArray(updateGroup<SectionControl>({
            223: validate(required),
            3551: validate<any>(required, email),
            3552: validate<any>(required),
            227: updateGroup<any>({
                'MailingAddress-Street': validate(required),
                'MailingAddress-PostalCode': validate(required, pattern(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i)),
                'MailingAddress-City': validate(required),
                'MailingAddress-StreetNumber': validate(required),
                'MailingAddress-Province': validate(required, exclusion('equal', 'QC', 'PROVINCE_EXCLUSION_POPUP', 'PROVINCE_EXCLUSION'))
            }),
            246: validate(required),
            248: validate(required),
            249: validate(required),
            250: validate(required),
            308: validate(required),
            251: validate(required),
            254: validate(required)
        })),
        35: updateArray(updateGroup<SectionControl>({
            289: updateGroup<any>({
                'Driver-FirstName': validate(required),
                'Driver-LastName': validate(required)
            }),
            325: validate(required),
            //226: OPTIONNEL,
            320: validate(required),
            321: validate(required),
            264: validate(required),
            238: validate(required),
            239: validate(required),
            265: validate(required),
            268: validate<any>(required, pattern(/^[0-9]+[0-9]*$/)),
            270: validate<any>(required, pattern(/^[0-9]+[0-9]*$/), exclusion('lesserThanOrEqual', 0, 'MAJOR_INFRACTION_EXCLUSION_POPUP', 'MAJOR_INFRACTION_EXCLUSION')),
            372: validate(required),
            344: validate(required),
            240: validate(required),
            242: validate<any>(required),
            243: validate<any>(required, exclusion('dateBefore', Date.now(), 'BANKRUPCY_EXCLUSION_POPUP', 'BANKRUPCY_EXCLUSION')),
            //347: OPTIONNEL
        })),
        36: updateArray(updateGroup<SectionControl>({
            301: updateGroup<any>({
                "Vehicle-Year": validate(required),
                "Vehicle-Make": validate(required),
                "Vehicle-Model": validate(required)
            }),
            //309: OPTIONNEL
            257: validate<any>(validateRepartition, exclusion('businessUseLesserThanOrEqual', 50, 'REPARTITION_EXCLUSION_POPUP', 'REPARTITION_EXCLUSION')),
            275: validate(required),
            340: validate<any>(required, exclusion('lesserThanOrEqual', 75000, 'AUTO_VALUE_EXCLUSION_POPUP', 'AUTO_VALUE_EXCLUSION')),
            318: (control: FormControlState<any>, formState: any) => {
                return (formState.value[340] > 25000) ?
                    validate<any>(formState.controls[318], exclusion('equal', 'true', 'AUTO_VALUE_AGE_EXCLUSION_POPUP', 'AUTO_VALUE_AGE_EXCLUSION')) :
                    control
            },
            259: validate(required),
            262: validate(required),
            232: validate(required),
            277: validate(required),
            281: validate(required),
            282: validate(required),
            2339: validate(required),
            228: validate(required),
            284: validate(required),
            294: validate(required),
            295: validate(required),
            297: validate(required),
            298: validate(required),
            299: validate(required),
            305: validate(required),
            //306: OPTIONNEL
        }))
    },
    // contracteur
    76: {
        164: updateArray(updateGroup<SectionControl>({
            2879: validate(required),
            2880: validate(required),
            2881: validate<any>(required, exclusion('greaterThanOrEqual', 30000, 'ANNUAL_REVENUE_GREATER_EXCLUSION_POPUP', 'ANNUAL_REVENUE_GREATER_EXCLUSION'),
                exclusion('lesserThanOrEqual', 1000000, 'ANNUAL_REVENUE_LESSER_EXCLUSION_POPUP', 'ANNUAL_REVENUE_LESSER_EXCLUSION')),
            2882: validate<any>(required, exclusion('greaterThanOrEqual', 3, 'YEARS_EXPERIENCE_EXCLUSION_POPUP', 'YEARS_EXPERIENCE_EXCLUSION')),
            2883: validate(required),
            2885: (control: FormControlState<any>, formState: any) => {
                let isSpecializedContractor = !!formState.value[3054]?.SpecializedContractor
                return validate(control, validateRepartition, contractorExclusion(isSpecializedContractor))
            },
            3054: (control: FormControlState<any>, formState: any) => {
                return control
            }
        })),
        167: updateArray(updateGroup<SectionControl>({
            2891: validate(required),
            3505: validate(required),
            3506: validate(required),
        }))
    }
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