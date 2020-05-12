import { IFieldProps, IFormValidity, IValuesType, IValidityType } from "./form";

export interface IEditProductScreenState {
    inputValues: IEditProductScreenInputValues,
    inputValidities: IEditProductScreenInputValidities,
    formValidity: IFormValidity
}

export interface IEditProductScreenInputValues extends IValuesType {
    productId: string;
    ownerId: string;
    title: string;
    image: string; 
    description: string;
    price: string;
}


export interface IEditProductScreenInputValidities extends IValidityType {
    productId: boolean,
    ownerId: boolean;
    title: boolean;
    image: boolean; 
    description: boolean;
    price: boolean;
}

export const initialFormState: IEditProductScreenState = {
    inputValues: {
        title: '',
        description: '',
        price: '',
        productId: '',
        ownerId: '',
        image: ''
    },
    inputValidities: {
        title: false,
        description: false,
        price: false,
        productId: true,
        ownerId: true,
        image: false
    },
    formValidity: {
        isTouched: false,
        isDirty: false, 
        isValid: false,
        isSubmitted: false
    }
}