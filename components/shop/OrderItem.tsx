import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Order from '../../models/order'
import CartItem from './CartItem'


const OrderItem: React.FC<{
    order: Order,
    toggleShow: (id: string) => void,
    showDetails: boolean
}> = ({ order, toggleShow, showDetails }) => {
    return (
        <TouchableOpacity onPress={() => toggleShow(order.orderId)}>
            <View style={styles.orderItemContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.price}>${order.totalPrice.toFixed(2)}</Text>
                    <Text style={styles.date}>{order.readableDate()}</Text>
                </View>
                {
                    showDetails && (
                    <View style={styles.orderDetails}>
                        {
                            order.cart.map((cart) => {
                                return <CartItem key={cart.productId} isDeletable={false} onRemove={() => {}} cart={cart} />
                            })
                        }
                    </View>
                    )
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    orderItemContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '94%',
        marginLeft: '3%',
        marginVertical: 10
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    price: {
        fontFamily: 'open-sans-bold'
    },
    date: {
        fontFamily: 'open-sans',
        color: '#888'
    },
    orderDetails: {
        borderTopColor: '#888',
        borderTopWidth: 1,
        marginTop: 10
    }
})

export default OrderItem
