import {combineReducers, Reducer, CombinedState, createStore, compose, applyMiddleware} from 'redux';
import ProductsReducer from './products';
import {  IDefaultAction, IRootState } from '../../models/store';
import cartReducer from './cart';
import orderReducer from './orders';
import thunk from 'redux-thunk';
import authReducer from './auth';


type rootReducerType =  Reducer<CombinedState<IRootState>, IDefaultAction<any>>

const rootReducer: rootReducerType = combineReducers({
    products: ProductsReducer,
    cart: cartReducer,
    orders: orderReducer,
    auth: authReducer
})

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const composeEnhancers = compose;
const middleware = composeEnhancers(applyMiddleware(thunk))

const store = createStore(rootReducer, middleware);

export default store;
