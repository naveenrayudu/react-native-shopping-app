import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { IRootStackParamList, IStackNavigationProp } from '../models/navigation';
import { defaultScreenOptions, menuScreenOptions } from './DefaultOptions';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductsScreen from '../screens/user/EditProductsScreen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/ui/CustomHeaderButton';
import { RouteProp } from '@react-navigation/native';

const Stack = createStackNavigator<IRootStackParamList>();

const userScreenDefaultOptions = (navigation: IStackNavigationProp): StackNavigationOptions => {
    return {
        title: 'Your Products',
        headerRight: (props) => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="search" iconName="ios-add-circle-outline" onPress={() => {
                        navigation.navigate("EditProducts", {
                            productId: undefined
                        })
                    }} />
                </HeaderButtons>
            )
        }
    }
}

const userScreenSaveOptions = (route: RouteProp<IRootStackParamList, 'EditProducts'>, navigation: IStackNavigationProp): StackNavigationOptions => {
    return {
        title: route.params?.productId ? 'Edit Product' : 'Add Product'
    }
}

const UserScreenNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="UserProducts" screenOptions={({navigation }) => {
            return {...defaultScreenOptions}
        }}>
            <Stack.Screen name="UserProducts" component={UserProductsScreen} options={({ route, navigation }) => {
                return {...menuScreenOptions(navigation), ...userScreenDefaultOptions(navigation)}
            }} />
            <Stack.Screen name="EditProducts" component={EditProductsScreen} options={({ route, navigation}) => {
                return {...userScreenSaveOptions(route, navigation)}
            }} />
           
        </Stack.Navigator>
    );
}


export default UserScreenNavigation
