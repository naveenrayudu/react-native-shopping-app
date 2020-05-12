import React, { useCallback, useReducer } from 'react';
import { IDefaultAction } from "../models/store";
import { NativeSyntheticEvent, TargetedEvent, findNodeHandle, UIManager } from 'react-native';
import { IFormValidity, IValuesType, IValidityType } from '../models/form';

export const INITIAL_STATE = 'INITIAL_STATE';
export const UPDATE_FIELD_VALUE = 'UPDATE_FIELD_VALUE';
export const FORM_SUBMITTED = 'FORM_SUBMITTED';

type Update_Payload = {
   inputName: string,
   value: string,
   isValid: boolean
}

export interface IForm {
    inputValues: IValuesType,
    inputValidities: IValidityType,
    formValidity: IFormValidity
}


export const reducer = <T extends IForm>(state: T, action: IDefaultAction<any>): T  => {
    switch (action.type) {
        case UPDATE_FIELD_VALUE:
            const updatePayload =  action.payload as Update_Payload;
            const inputValues = {...state.inputValues};
            const inputValidities = {...state.inputValidities};
            const formValidities = {...state.formValidity};
            const inputName = updatePayload.inputName as keyof IValuesType;

            inputValues[inputName] = updatePayload.value;
            inputValidities[inputName] = updatePayload.isValid;

            formValidities.isDirty = true;
            formValidities.isTouched = true;
            formValidities.isValid = Object.keys(inputValidities).every((key)=> inputValidities[key])


            return {
                ...state,
                formValidity: formValidities,
                inputValidities: inputValidities,
                inputValues: inputValues
            }

        case INITIAL_STATE:
            return {
                ...state,
                ...action.payload
            }

        case FORM_SUBMITTED:
            return {...state,
                        formValidity: {
                            ...state.formValidity,
                            isSubmitted: true
                        }
                    }

        default:
            return state;
    }
}




export const UseFormReducer = <T extends IForm>( initialFormState: T): {
    state: T, 
    dispactReactAction: React.Dispatch<IDefaultAction<any>>, 
    formInputChangeHandler: (value: string, inputName: string, customValidator?: (value: string) => boolean) => void
} => {
    const [reactState, dispactReactAction] = useReducer(reducer, initialFormState);
    const formInputChangeHandler = useCallback((value: string, inputName: string, customValidator?: (value: string) => boolean) => {
        dispactReactAction({
            type: UPDATE_FIELD_VALUE,
            payload: {
                inputName,
                value,
                isValid: value && value.trim().length > 0 && (!customValidator || customValidator(value))
            }
        })
     }, [dispactReactAction]);

     return {
         state: reactState as T, 
         dispactReactAction, 
         formInputChangeHandler
        }
}
