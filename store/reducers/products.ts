import { ProductsData } from "../../data/dummy-data";
import { IProductsState, IDefaultAction } from "../../models/store";
import {
  DELETE_PRODUCT,
  ADD_NEW_PRODUCT,
  EDIT_PRODUCT,
  SET_PRODUCTS,
} from "../actions/types";
import Product from "../../models/product";

const initialState: IProductsState = {
  availableProducts: [],
  userProducts: [],
};

const ProductsReducer = (
  state = initialState,
  action: IDefaultAction<any>
): IProductsState => {
  switch (action.type) {
    case SET_PRODUCTS: 
      return {
        availableProducts: action.payload.products,
        userProducts: action.payload.userProducts
      };

    case DELETE_PRODUCT:
      const productToDelete = action.payload as Product;

      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (t) => t.id !== productToDelete.id
        ),
        userProducts: state.userProducts.filter(
          (t) => t.id !== productToDelete.id
        ),
      };

    case ADD_NEW_PRODUCT:
      const productToAdd = action.payload as Product;
      productToAdd.id = new Date().toString();
      productToAdd.ownerId = "u1";

      return {
        ...state,
        availableProducts: state.availableProducts.concat(productToAdd),
        userProducts: state.userProducts.concat(productToAdd),
      };

    case EDIT_PRODUCT:
      const editProductInfo = action.payload as Product;
      
      const availableProductsToModify = [...state.availableProducts];
      const userProductsToModify = [...state.userProducts];

      const productToEdit = availableProductsToModify.find(
        (t) => t.id === editProductInfo.id
      );
      const userProductToEdit = userProductsToModify.find(
        (t) => t.id === editProductInfo.id
      );

      if (!productToEdit || !userProductToEdit) return state;

      productToEdit.description = userProductToEdit.description = editProductInfo.description;
      productToEdit.title = userProductToEdit.title = editProductInfo.title;
      productToEdit.price = userProductToEdit.price = editProductInfo.price;
      productToEdit.image = userProductToEdit.image = editProductInfo.image;

      return {
        ...state,
        availableProducts: availableProductsToModify,
        userProducts: userProductsToModify,
      };

    default:
      return state;
  }
};

export default ProductsReducer;
