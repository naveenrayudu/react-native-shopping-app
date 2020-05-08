import {combineReducers, Reducer, CombinedState, createStore} from 'redux';
import ProductsReducer from './products';
import {  IDefaultAction, IRootState } from '../../models/store';
import cartReducer from './cart';
import orderReducer from './orders';

type rootReducerType =  Reducer<CombinedState<IRootState>, IDefaultAction<any>>

const rootReducer: rootReducerType = combineReducers({
    products: ProductsReducer,
    cart: cartReducer,
    orders: orderReducer
})

const store = createStore(rootReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

export default store;
