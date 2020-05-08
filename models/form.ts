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
