import * as React from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Ionicons} from '@expo/vector-icons';

import colors from '../constants/colors';
import ProductsScreenNavigation from './ProductScreenNavigation';
import OrdersScreenNavigation from './OrdersScreenNavigation';
import { View, Text, Platform} from 'react-native';
import UserScreenNavigation from './UserScreenNavigation';


const Drawer = createDrawerNavigator();

const drawerImages = (icon: string, color: string) => {
    return (
        <View>
            <Ionicons name={icon} color={color} size={23} />
        </View>
    )
}

const getNavigationLabelStyle = (color: string) => {
    return {
            left: -22, 
            width: 250, 
            fontSize: 18, 
            paddingBottom: Platform.OS === 'android' ? 0 : 3, 
            color: color 
        }
}


const Navigation = () => (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="ProductsScreen" drawerContentOptions={styles.drawerContentOptions} drawerStyle={styles.drawerStyle}>
            <Drawer.Screen name="ProductsScreen" component={ProductsScreenNavigation} options={{
                drawerIcon: (props) => drawerImages('ios-cart', props.color),
                drawerLabel: (props) => <Text style={getNavigationLabelStyle(props.color)}>Products</Text>
            }} />
            <Drawer.Screen  name="OrdersScreen" component={OrdersScreenNavigation} options={{
                drawerIcon: (props) => drawerImages('ios-list', props.color),
                drawerLabel: (props) => <Text style={getNavigationLabelStyle(props.color)}>Orders</Text>
            }}  />
            <Drawer.Screen name="UsersScreen" component={UserScreenNavigation} options={{
                drawerIcon: (props) => drawerImages('ios-create', props.color),
                drawerLabel: (props) => <Text style={getNavigationLabelStyle(props.color)}>Admin</Text>
            }} />
        </Drawer.Navigator>
    </NavigationContainer>
)

const styles = {
    drawerContentOptions: {
        activeTintColor: colors.primary
    },
    drawerStyle: {
        paddingTop: 30,
        width: 250
    }
}

export default Navigation;