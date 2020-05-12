export interface IFieldProps {
    value: string,
    validation: {
        required: boolean,
        errorMessage: string,
        customValidator?: (value: string) => boolean,
        touched: boolean,
        isDirty: boolean
    }
}

export interface IValuesType {
    [key: string]: string
}

export interface IValidityType {
    [key: string]: boolean
}


export interface IFormValidity {
    isTouched: boolean,
    isDirty: boolean,
    isValid: boolean,
    isSubmitted: boolean
}