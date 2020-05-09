import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, FlatList, Platform, UIManager, LayoutAnimation, Alert, ActivityIndicator, RefreshControl } from 'react-native'
import { useSelector } from 'react-redux'
import { IRootState } from '../../models/store'
import OrderItem from '../../components/shop/OrderItem'
import useThunkDispatch from '../../components/hooks/useThunkDispatch'
import { getOrdersAction } from '../../store/actions/order'
import { useFocusEffect } from '@react-navigation/native'
import colors from '../../constants/colors'

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  
const OrdersScreen = () => {
    const [orderIdToShow, setOrderIdToShow] = useState<string>('');
    const dispatch = useThunkDispatch();
    const orders = useSelector((state: IRootState) => state.orders.orders);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const loadOrders = useCallback(() => {
       return dispatch(getOrdersAction())
                .catch(() => Alert.alert('Error while fetching', 'Error occured while fetching orders'))
    }, [dispatch])

    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(true);
            
            loadOrders()
                .finally(() => setIsLoading(false));

        }, [loadOrders, setIsLoading])
    )

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        loadOrders()
                .finally(() => setRefreshing(false));
      }, [loadOrders, setRefreshing]);


    const onToogleDetailsClick = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if(orderIdToShow === id)
            setOrderIdToShow('');
        else
            setOrderIdToShow(id);
    }

    if(isLoading)
        return <ActivityIndicator style={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }} size='large' color={colors.primary} />

    return (
     <FlatList
        refreshControl={
            <RefreshControl colors={[colors.primary]} tintColor={colors.primary} refreshing={refreshing} onRefresh={onRefresh} />
        }
         data={orders} 
         keyExtractor={(item, index) => item.orderId} renderItem={({item}) => {
         return (
            <View style={{
                justifyContent: 'center'
            }}>
                <OrderItem order={item} toggleShow={onToogleDetailsClick} showDetails={orderIdToShow === item.orderId}/>
            </View>
         )
     }} />
    )
}

export default OrdersScreen
