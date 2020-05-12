import * as React from 'react';
import { StyleSheet, ActivityIndicator, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import colors from '../constants/colors';
import ProductsScreenNavigation from './ProductScreenNavigation';
import OrdersScreenNavigation from './OrdersScreenNavigation';
import { View, Text, Platform } from 'react-native';
import UserScreenNavigation from './UserScreenNavigation';
import AuthScreenNavigation from './AuthScreenNavigation';
import { useSelector } from 'react-redux';
import { IRootState } from '../models/store';
import useThunkDispatch from '../components/hooks/useThunkDispatch';
import { REFRESH_USER_TOKEN } from '../store/actions/types';
import { refreshUserTokenAction, signOutAction } from '../store/actions/auth';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';


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
        fontSize: 16,
        paddingBottom: Platform.OS === 'android' ? 0 : 3,
        color: color
    }
}

const CustomNavigator = (props: DrawerContentComponentProps<DrawerContentOptions>) => {
    const dispatch = useThunkDispatch();
    return (
    <DrawerContentScrollView {...props} style={{flex: 1}}>
        <DrawerItemList {...props} />
        <DrawerItem
            style={{
                backgroundColor: colors.primary,
                alignItems: 'center',
                marginTop: 30
            }}
            label={(props) => (
                <View style={{
                    borderRadius: 5,
                    width: 230,
                    paddingLeft: 20,
                    height: 12
                }}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <Text style={{color: 'white', textAlign: 'center', top: -4}}>Sign Out</Text>
                    </TouchableWithoutFeedback>
                </View>
            )}
            onPress={() => dispatch(signOutAction())}
        />
       
    </DrawerContentScrollView>)
}


const Navigation = () => {
    const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);
    const [isAuthenicating, setIsAuthenicating] = React.useState(true);

    const dispatch = useThunkDispatch();

    // Handling user login.
    React.useEffect(() => {
        dispatch(refreshUserTokenAction())
            .catch(() => { })
            .finally(() => {
                setIsAuthenicating(false)
            });
    }, [])


    if (isAuthenicating)
        return <ActivityIndicator style={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}
            size='large'
            color={colors.primary} />

    return (
        <NavigationContainer>
            {
                isLoggedIn ?
                    (
                        <>
                            <Drawer.Navigator initialRouteName="ProductsScreen" drawerContent={(props) => <CustomNavigator {...props} />} drawerContentOptions={styles.drawerContentOptions} drawerStyle={styles.drawerStyle}>

                                <Drawer.Screen name="ProductsScreen" component={ProductsScreenNavigation} options={{
                                    drawerIcon: (props) => drawerImages('ios-cart', props.color),
                                    drawerLabel: (props) => <Text style={getNavigationLabelStyle(props.color)}>Products</Text>
                                }} />
                                <Drawer.Screen name="OrdersScreen" component={OrdersScreenNavigation} options={{
                                    drawerIcon: (props) => drawerImages('ios-list', props.color),
                                    drawerLabel: (props) => <Text style={getNavigationLabelStyle(props.color)}>Orders</Text>
                                }} />
                                <Drawer.Screen name="UsersScreen" component={UserScreenNavigation} options={{
                                    drawerIcon: (props) => drawerImages('ios-create', props.color),
                                    drawerLabel: (props) => <Text style={getNavigationLabelStyle(props.color)}>Admin</Text>
                                }} />
                            </Drawer.Navigator>
                           
                        </>
                    ) :
                    (
                        <AuthScreenNavigation />
                    )

            }
        </NavigationContainer>
    )
}

const styles = {
    drawerContentOptions: {
        activeTintColor: colors.primary,
        padding: 5
    },
    drawerStyle: {
        paddingTop: 30,
        width: 250
    }
}

export default Navigation;