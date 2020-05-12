import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type IRootStackParamList = {
  Products: undefined;
  ProductDetails: { productId: string, productTitle: string },
  Cart: undefined,
  Orders: undefined,
  UserProducts: undefined,
  EditProducts: {
    productId?: string,
    onProductSave?: () => void
  },
  Auth: undefined
};


export type IStackNavigationProp = StackNavigationProp<IRootStackParamList>
export type IRouteProp =  RouteProp<IRootStackParamList, keyof IRootStackParamList>


export interface IStackProps<T extends keyof IRootStackParamList>
{
  navigation: StackNavigationProp<IRootStackParamList, T>,
  route: RouteProp<IRootStackParamList, T>
}