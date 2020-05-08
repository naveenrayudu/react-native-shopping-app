import { IFieldProps } from "./form";

export interface IEditProductScreenState {
    inputValues: IEditProductScreenInputValues,
    inputValidities: IEditProductScreenInputValidities,
    formValidity: {
        isTouched: boolean,
        isDirty: boolean,
        isValid: boolean,
        isSubmitted: boolean
    }
}

export interface IEditProductScreenInputValues {
    productId: string,
    ownerId: string;
    title: string;
    image: string; 
    description: string;
    price: string;
}


export interface IEditProductScreenInputValidities {
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