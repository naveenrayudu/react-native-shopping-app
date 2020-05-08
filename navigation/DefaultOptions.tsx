import React from 'react';
import { Platform } from "react-native";
import { StackNavigationOptions } from "@react-navigation/stack";
import colors from "../constants/colors";
import { IStackNavigationProp } from "../models/navigation";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import { DrawerActions } from "@react-navigation/native";

const isAndroid = Platform.OS === 'android';


export const defaultScreenOptions : StackNavigationOptions = {
    headerStyle: {
        backgroundColor: isAndroid ? colors.primary : ''
    },
    headerTintColor: isAndroid ? 'white' : colors.primary,
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
        fontSize: 12
    }
}


export const menuScreenOptions = (navigation: IStackNavigationProp): StackNavigationOptions => {
    return {
        headerLeft: (props) => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                        navigation.dispatch(DrawerActions.toggleDrawer())
                    }} />
                </HeaderButtons>
            )
        }
    }
}
