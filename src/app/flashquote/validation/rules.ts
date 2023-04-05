import {
  FormControlState,
  updateArray,
  updateGroup,
  validate,
} from 'ngrx-forms';
import { email, pattern, required } from 'ngrx-forms/validation';
import { SectionControl } from '../store';
import {
  validateRepartition,
  exclusion,
  contractorExclusion,
  propertyProvinceExclusion,
  propertyValueExclusion,
  contentValueExclusion,
} from './functions';

export const validation: any = {
  // auto perso
  28: {
    34: updateArray(
      updateGroup<SectionControl>({
        223: validate(required),
        3551: validate<any>(required, email),
        3552: validate<any>(required),
        227: updateGroup<any>({
          'MailingAddress-Street': validate(required),
          'MailingAddress-PostalCode': validate(
            required,
            pattern(
              /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
            )
          ),
          'MailingAddress-City': validate(required),
          'MailingAddress-StreetNumber': validate(required),
          'MailingAddress-Province': validate(
            required,
            exclusion(
              'notEqual',
              'QC',
              'PROVINCE_EXCLUSION_POPUP',
              'PROVINCE_EXCLUSION'
            )
          ),
        }),
        246: validate(required),
        248: validate(required),
        249: validate(required),
        250: validate(required),
        308: validate(required),
        251: validate(required),
        254: validate(required),
      })
    ),
    35: updateArray(
      updateGroup<SectionControl>({
        289: updateGroup<any>({
          'Driver-FirstName': validate(required),
          'Driver-LastName': validate(required),
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
        270: validate<any>(
          required,
          pattern(/^[0-9]+[0-9]*$/),
          exclusion(
            'lesserThanOrEqual',
            0,
            'MAJOR_INFRACTION_EXCLUSION_POPUP',
            'MAJOR_INFRACTION_EXCLUSION'
          )
        ),
        372: validate(required),
        344: validate(required),
        240: validate(required),
        242: validate<any>(required),
        243: validate<any>(
          required,
          exclusion(
            'dateBefore',
            Date.now(),
            'BANKRUPCY_EXCLUSION_POPUP',
            'BANKRUPCY_EXCLUSION'
          )
        ),
        //347: OPTIONNEL
      })
    ),
    36: updateArray(
      updateGroup<SectionControl>({
        301: updateGroup<any>({
          'Vehicle-Year': validate(required),
          'Vehicle-Make': validate(required),
          'Vehicle-Model': validate(required),
        }),
        //309: OPTIONNEL
        257: validate<any>(
          validateRepartition,
          exclusion(
            'businessUseLesserThanOrEqual',
            50,
            'REPARTITION_EXCLUSION_POPUP',
            'REPARTITION_EXCLUSION'
          )
        ),
        275: validate(required),
        340: validate<any>(
          required,
          exclusion(
            'lesserThanOrEqual',
            75000,
            'AUTO_VALUE_EXCLUSION_POPUP',
            'AUTO_VALUE_EXCLUSION'
          )
        ),
        318: (control: FormControlState<any>, formState: any) => {
          return formState.value[340] > 25000
            ? validate<any>(
                formState.controls[318],
                exclusion(
                  'notEqual',
                  'true',
                  'AUTO_VALUE_AGE_EXCLUSION_POPUP',
                  'AUTO_VALUE_AGE_EXCLUSION'
                )
              )
            : control;
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
      })
    ),
  },
  // contracteur
  76: {
    164: updateArray(
      updateGroup<SectionControl>({
        2879: validate(required),
        2880: validate(required),
        2881: validate<any>(
          required,
          exclusion(
            'greaterThanOrEqual',
            30000,
            'ANNUAL_REVENUE_GREATER_EXCLUSION_POPUP',
            'ANNUAL_REVENUE_GREATER_EXCLUSION'
          ),
          exclusion(
            'lesserThanOrEqual',
            1000000,
            'ANNUAL_REVENUE_LESSER_EXCLUSION_POPUP',
            'ANNUAL_REVENUE_LESSER_EXCLUSION'
          )
        ),
        2882: validate<any>(
          required,
          exclusion(
            'greaterThanOrEqual',
            3,
            'YEARS_EXPERIENCE_EXCLUSION_POPUP',
            'YEARS_EXPERIENCE_EXCLUSION'
          )
        ),
        2883: validate(required),
        2885: (control: FormControlState<any>, formState: any) => {
          let isSpecializedContractor =
            !!formState.value[3054]?.SpecializedContractor;
          return validate(
            control,
            validateRepartition,
            contractorExclusion(isSpecializedContractor)
          );
        },
        3054: (control: FormControlState<any>, formState: any) => {
          return control;
        },
      })
    ),
    167: updateArray(
      updateGroup<SectionControl>({
        2891: validate(required),
        3505: validate(required),
        3506: validate(required),
      })
    ),
  },
  // Cyber
  50: {
    62: updateArray(
      updateGroup<SectionControl>({
        851: validate(required),
        3519: validate(required),
        3520: validate(required),
        897: validate(required),
        859: validate(required),
      })
    ),
    63: updateArray(
      updateGroup<SectionControl>({
        // 862: validate(required),
        // 884: validate(required),
        // 863: validate(required),
        // 865: validate(required),
        // 868: validate(required),
        // 870: validate(required),
        // 871: validate(required),
        // 872: validate(required),
        // 873: validate(required),
        // 875: validate(required),
        // 876: validate(required),
      })
    ),
  },
  80: {
    163: updateArray(
      updateGroup<SectionControl>({
        3325: validate(required),
        3330: validate(required),
        3331: validate(required),
        3426: validate(required),
        3326: validate(required),
        3327: validate(required),
        3328: validate(required),
        3329: validate(required),
        3469: validate(required),
        3333: validate(required),
        3324: validate<any>(
          required,
          exclusion(
            'equal',
            'MobileHome',
            'MOBILE_HOME_EXCLUSION_POPUP',
            'MOBILE_HOME_EXCLUSION'
          ),
        ),
        // 2718: validate(required),
        2718: (control: FormControlState<any>, formState: any) => {
          let isVacant = formState.value[3325] === "Vacant";
          let isShortTermRental = formState.value[3331] == "false";
          return validate(
            control,
            required,
            propertyProvinceExclusion(isVacant, isShortTermRental)
          );
        },
        2719: validate(required),
        2723: (control: FormControlState<any>, formState: any) => {
          let protection = formState.value[2719];
          return validate(
            control,
            required,
            propertyValueExclusion(protection)
          );
        },
        2724: (control: FormControlState<any>, formState: any) => {
          let property = formState.value[3324];
          let occupancy = formState.value[3325]
          return validate(
            control,
            required,
            contentValueExclusion(property, occupancy)
          );
        },
        2725: validate(required),
        2691: validate(required),
        2692: validate(required),
        2963: validate(required),
      })
    ),
    169: updateArray(
      updateGroup<SectionControl>({
        2964: validate(required),
        3717: validate(required),
        3718: validate(required),
      })
    ),
  },
};
