import React, { useState, useCallback } from 'react'
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native'
import { useSelector } from 'react-redux'
import { IRootState } from '../../models/store'
import colors from '../../constants/colors'
import CartItem from '../../components/shop/CartItem'
import { removeFromCartAction } from '../../store/actions/cart'
import { addCartToOrderAction } from '../../store/actions/order'
import useThunkDispatch from '../../components/hooks/useThunkDispatch'


const CartHeaderSection: React.FC<{
    totalAmount: number,
    isButtonDisabled: boolean,
    onOrderNowPress: () => void
}> = ({ totalAmount, onOrderNowPress, isButtonDisabled }) => {
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View style={styles.orderNowContainer}>
                <Text style={styles.priceContainer}>
                    Total: <Text style={styles.price}>${totalAmount.toFixed(2)}</Text>
                </Text>
                <Button disabled={ isButtonDisabled || totalAmount === 0} title="Order Now" onPress={onOrderNowPress} color={colors.accent} />
            </View>
        </View>

    )
}



const CartScreen = () => {
    const { cartItemsObj, totalAmount } = useSelector((state: IRootState) => ({
        cartItemsObj: state.cart.items,
        totalAmount: state.cart.totalPrice
    }))

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const dispatch = useThunkDispatch();

    const itemsArray = [];
    for (const key in cartItemsObj) {
        itemsArray.push(cartItemsObj[key])
    }

    const onOrderNowClick = useCallback(() => {
        setIsButtonDisabled(true);

        dispatch(addCartToOrderAction({
            items: cartItemsObj,
            totalPrice: totalAmount,
            date: new Date()
        }))
        .catch(() => Alert.alert('Error occured', 'Error occured while ordering items'))
        .finally(() => setIsButtonDisabled(false))

    }, [dispatch, setIsButtonDisabled])

    const onItemRemoveClick = useCallback((productId: string) => {
        dispatch(removeFromCartAction(productId));
    }, [dispatch]);


    return (
        <View style={{
            width: '94%',
            justifyContent: 'center',
            marginLeft: '3%'
        }}>
            <CartHeaderSection isButtonDisabled={isButtonDisabled} totalAmount={totalAmount} onOrderNowPress={onOrderNowClick} />
            <FlatList
                data={itemsArray}
                keyExtractor={(item, index) => item.productId}
                renderItem={({ item }) => <CartItem cart={item} onRemove={onItemRemoveClick} isDeletable={true} />}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    orderNowContainer: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.23,
        shadowRadius: 1.62,
        elevation: 4,
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 20,
        height: 50,
        width: '100%',
        backgroundColor: 'white'
    },
    priceContainer: {
        fontFamily: 'open-sans-bold'
    },
    price: {
        color: colors.primary
    }
})

export default CartScreen
