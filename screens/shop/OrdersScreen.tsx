import React, { useState } from 'react'
import { View, Text, FlatList, Platform, UIManager, LayoutAnimation } from 'react-native'
import { useSelector } from 'react-redux'
import { IRootState } from '../../models/store'
import OrderItem from '../../components/shop/OrderItem'

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  
const OrdersScreen = () => {
    const [orderIdToShow, setOrderIdToShow] = useState<string>('')
    const orders = useSelector((state: IRootState) => state.orders.orders);

    const onToogleDetailsClick = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if(orderIdToShow === id)
            setOrderIdToShow('');
        else
            setOrderIdToShow(id);
    }

    return (
     <FlatList data={orders} keyExtractor={(item, index) => item.orderId} renderItem={({item}) => {
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
