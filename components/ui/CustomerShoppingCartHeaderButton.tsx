import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors';
import { Platform, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { IRootState } from '../../models/store';

const CustomShoppingCartHeaderButton = (props: any) => {
    const items = useSelector((state: IRootState) => state.cart.items)
    let itemCount  = 0;
    for (const item in items) {
        itemCount+= items[item].quantity;
    }


    return (
        <View style={{
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {itemCount !== 0 && <Text style={{
                fontSize: 12,
                textAlign: 'center',
                bottom: '-15%',
                color: Platform.OS === 'android' ? 'white' : colors.primary
            }}>{itemCount}</Text> }
            <HeaderButton {...props} IconComponent={Ionicons} iconSize={itemCount !== 0 ? 18: 23} color={Platform.OS === 'android' ? 'white' : colors.primary} />
        </View>)

}

export default CustomShoppingCartHeaderButton;