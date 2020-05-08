import Product from '../../models/product';
import {IDefaultAction} from '../../models/store';
import {DELETE_PRODUCT, EDIT_PRODUCT, ADD_NEW_PRODUCT} from './types';

export const deleteProductAction = (product: Product): IDefaultAction<Product> => {
    return {
        type: DELETE_PRODUCT,
        payload: product
    }
}

export const editProductAction = (product: Product): IDefaultAction<Product> => {
    return {
        type: EDIT_PRODUCT,
        payload: product
    }
}

export const addNewProductAction = (product: Product): IDefaultAction<Product> => {
    return {
        type: ADD_NEW_PRODUCT,
        payload: product
    }
}
