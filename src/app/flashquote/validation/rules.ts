import { ValidationErrors } from "@angular/forms";
import { time } from "console";
import { Boxed, FormControlState, unbox, updateArray, updateGroup, validate } from "ngrx-forms";
import { number, pattern, required } from "ngrx-forms/validation";
import { SectionControl } from "../store";
import { validateRepartition } from "./functions";


export function exclusion<T>(rule: string, comparand: T, errorMessagePopup: string, errorMessageInput?: string) {
    return <TV extends T | Boxed<T> = T>(value: TV): ValidationErrors => {
        //value = unbox(value) as T as TV;
        value = unbox(value) as any

        if (rule === 'equal') {
            if (value === comparand) {
                return {};
            }
        }

        if (rule === 'dateBefore') {
            const inputDate = new Date((value as any)).getTime()
            if (inputDate && inputDate < (comparand as any)) {
                return {}
            }
        }

        if (rule === 'lesserThanOrEqual') {
            if (value <= (comparand as any)) {
                return {}
            }
        }

        return {
            'exclusion': {
                comparand,
                actual: value,
                errorMessagePopup,
                errorMessageInput
            },
        };
    };
}

export const validation: any = {
    // auto perso
    28: {
        34: updateArray(updateGroup<SectionControl>({
            223: validate(required),
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
            // 268: validate<any>(required, pattern(/^[0-9]+[0-9]*$/)),
            // 270: validate<any>(required, pattern(/^[0-9]+[0-9]*$/)),
            372: validate(required),
            344: validate(required),
            240: validate(required),
            242: validate<any>(required),
            243: validate<any>(required, exclusion('dateBefore', Date.now(), 'BANKRUPCY_EXCLUSION_POPUP')),
            //347: OPTIONNEL
        })),
        36: updateArray(updateGroup<SectionControl>({
            301: updateGroup<any>({
                "Vehicle-Year": validate(required),
                "Vehicle-Make": validate(required),
                "Vehicle-Model": validate(required)
            }),
            //309: OPTIONNEL
            257: validate(validateRepartition),
            275: validate(required),
            340: validate<any>(required, exclusion('lesserThanOrEqual', 75000, 'AUTO_VALUE_EXCLUSION_POPUP', 'AUTO_VALUE_EXCLUSION')),
            318: (control: FormControlState<any>, formState: any) => {
                return (formState.value[340] > 25000) ?
                    validate<any>(formState.controls[318], exclusion('equal', 'true', 'AUTO_VALUE_AGE_EXCLUSION_POPUP')) :
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
    76: {}
}