import React from 'react';
import { IStackNavigationProp, IRootStackParamList } from "../models/navigation";
import { StackNavigationOptions, createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductsDetailsScreen from "../screens/shop/ProductsDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import { defaultScreenOptions, menuScreenOptions } from "./DefaultOptions";
import CustomShoppingCartHeaderButton from '../components/ui/CustomerShoppingCartHeaderButton';

const Stack = createStackNavigator<IRootStackParamList>();

const productScreenDefaultOptions = (navigation: IStackNavigationProp): StackNavigationOptions => {
    return {
        title: 'All Products',
        headerRight: (props) => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomShoppingCartHeaderButton}>
                    <Item title="search" iconName="ios-cart" onPress={() => {
                        navigation.navigate("Cart")
                    }} />
                </HeaderButtons>
            )
        }
    }
}


const ProductsScreenNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Products" screenOptions={({navigation }) => {
            return {...defaultScreenOptions, ...productScreenDefaultOptions(navigation)}
        }}>
            <Stack.Screen name="Products" component={ProductsOverviewScreen} options={({ route, navigation }) => menuScreenOptions(navigation)} />
            <Stack.Screen name="ProductDetails" component={ProductsDetailsScreen} options={({ route }) => ({
                title: route.params.productTitle
            })} />
            <Stack.Screen name="Cart" component={CartScreen} options={{
                title: 'Your Cart'
            }} />
        </Stack.Navigator>
    );
}


export default ProductsScreenNavigation;