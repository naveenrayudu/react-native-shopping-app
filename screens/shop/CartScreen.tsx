import React from 'react'
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from '../../models/store'
import colors from '../../constants/colors'
import CartItem from '../../components/shop/CartItem'
import { removeFromCartAction } from '../../store/actions/cart'
import { addCartToOrderAction } from '../../store/actions/order'


const CartHeaderSection: React.FC<{
    totalAmount: number,
    onOrderNowPress: () => void
}> = ({ totalAmount, onOrderNowPress }) => {
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View style={styles.orderNowContainer}>
                <Text style={styles.priceContainer}>
                    Total: <Text style={styles.price}>${totalAmount.toFixed(2)}</Text>
                </Text>
                <Button disabled={totalAmount === 0} title="Order Now" onPress={onOrderNowPress} color={colors.accent} />
            </View>
        </View>

    )
}



const CartScreen = () => {
    const { cartItemsObj, totalAmount } = useSelector((state: IRootState) => ({
        cartItemsObj: state.cart.items,
        totalAmount: state.cart.totalPrice
    }))

    const dispatch = useDispatch();

    const itemsArray = [];
    for (const key in cartItemsObj) {
        itemsArray.push(cartItemsObj[key])
    }

    const onOrderNowClick = () => {
        dispatch(addCartToOrderAction({
            items: cartItemsObj,
            totalPrice: totalAmount
        }))
    }

    const onItemRemoveClick = (productId: string) => {
        dispatch(removeFromCartAction(productId));
    }


    return (
        <View style={{
            width: '94%',
            justifyContent: 'center',
            marginLeft: '3%'
        }}>
            <CartHeaderSection totalAmount={totalAmount} onOrderNowPress={onOrderNowClick} />
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
