import Product from '../../models/product';
import {IDefaultAction, IRootState} from '../../models/store';
import {DELETE_PRODUCT, EDIT_PRODUCT, ADD_NEW_PRODUCT, SET_PRODUCTS} from './types';
import { Dispatch } from 'redux';
import { AppThunk } from '../../models/firestore';
import API from '../api/apiAgent';

export const deleteProductAction = (product: Product): AppThunk => async (dispatch: Dispatch<IDefaultAction<Product>>): Promise<any> => {
    return API.delete(`products/${product.id}.json`)
                .then((res) => {
                    dispatch({
                        type: DELETE_PRODUCT,
                        payload: product
                    })
                }).catch((error) => {
                    throw new Error(error);
                })
}

export const editProductAction =  (product: Product): AppThunk => async (dispatch: Dispatch<IDefaultAction<Product>>): Promise<any> => {
    return API.patch(`products/${product.id}.json`, {
                                                        title: product.title,
                                                        price: product.price,
                                                        image: product.image,
                                                        description: product.description
                                                    } as Partial<Product>
                )
                .then((response) => {
                    return dispatch({
                        type: EDIT_PRODUCT,
                        payload: { ...product }
                    });
                })
                .catch((error) => {
                    throw new Error(error);
                })
}

export const addNewProductAction = (product: Product): AppThunk => async (dispatch: Dispatch<IDefaultAction<Product>>, getState: () => IRootState): Promise<any> => {
    product.ownerId = getState().auth.idToken;
    if(!product.ownerId) 
        throw new Error('Please sign-in to add products');
    
    return API.post('products.json', product)
                .then((response) => {
                    return dispatch({
                        type: ADD_NEW_PRODUCT,
                        payload: { ...product, id: response.name }
                    });
                })
                .catch((error) => {
                    throw new Error(error);
                })
}


export const fetchProductsAction = (): AppThunk => async (dispatch: Dispatch<IDefaultAction<{
    products: Product[],
    userProducts: Product[]
}>>, getState: () => IRootState): Promise<any> => {
    return API.get<Product>('products.json')
                .then((response) => {

                    const products = Object.keys(response || {}).map(key => {
                        response[key].id = key;
                        return response[key];
                    })

                    return dispatch({
                        type: SET_PRODUCTS,
                        payload: {
                            products: products,
                            userProducts: products.filter(t => t.ownerId === getState().auth.idToken)
                        }
                    });

                }).catch((error) => {
                    throw new Error(error);
                })
}