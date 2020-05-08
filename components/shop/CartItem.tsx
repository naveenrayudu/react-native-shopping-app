import React from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import {default as CartModel} from '../../models/cartItem'
import {Ionicons} from '@expo/vector-icons'

const CartItem: React.FC<{
    cart: CartModel,
    onRemove: (productId: string) => void,
    isDeletable: boolean
}> = ({cart, onRemove, isDeletable}) => {
    return (
        <View style={styles.cartContainer}>
            <Text numberOfLines={1} style={styles.itemDescription}>
                <Text style={styles.quantity}>{cart.quantity}     </Text>
                <Text style={styles.title}>{cart.productTitle}</Text>
            </Text>

            <Text style={styles.price}>${cart.totalAmount.toFixed(2)}</Text>

            {
                isDeletable && 
                <TouchableOpacity>
                    <Ionicons 
                        name={Platform.OS === 'android' ? 'md-trash': 'ios-trash'}
                        onPress={() => onRemove(cart.productId)}
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginVertical: 5,
        paddingVertical: 7,
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    itemDescription: {
        width: '60%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    quantity: {
        color: '#888',
        fontFamily: 'open-sans-bold',
        opacity: 0.8,
        width: '80%'
    },
    title: {
        fontFamily: 'open-sans-bold',
        opacity: 0.8,
        width: '20%'
    },
    price: {
        fontFamily: 'open-sans-bold',
        opacity: 0.8
    }
})

export default CartItem
