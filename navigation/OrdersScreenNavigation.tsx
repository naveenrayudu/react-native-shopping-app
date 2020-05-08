import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IRootStackParamList } from '../models/navigation';
import OrdersScreen from '../screens/shop/OrdersScreen';
import { menuScreenOptions, defaultScreenOptions } from './DefaultOptions';



const Stack = createStackNavigator<IRootStackParamList>();

const OrdersScreenNavigation = () => (
    <Stack.Navigator initialRouteName="Orders" screenOptions={defaultScreenOptions}>
        <Stack.Screen name="Orders" component={OrdersScreen} options={({ route, navigation }) => {
            return {
                title: 'Your Orders',
                ...menuScreenOptions(navigation)
            }
        }}  />
    </Stack.Navigator>
)

export default OrdersScreenNavigation;