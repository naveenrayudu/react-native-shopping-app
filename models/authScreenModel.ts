import { IFormValidity, IValuesType, IValidityType } from "./form";

export interface IAuthScreenState {
    inputValues: authInputs,
    inputValidities: authValidity,
    formValidity: IFormValidity
}

export interface authInputs extends IValuesType {
    email: string,
    password: string
}

export interface authValidity extends IValidityType {
    email: boolean,
    password: boolean
}

export const initialState: IAuthScreenState = {
    inputValues: {
        email: '',
        password: ''
    },
    inputValidities: {
        email: false,
        password: false
    },
    formValidity: {
        isValid: false,
        isDirty: false,
        isSubmitted: false,
        isTouched: false
    }
}