import React from 'react';
import { View, Text, Image, Button, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedbackProps, TouchableNativeFeedbackProps } from 'react-native';
import Product from '../../models/product';
import colors from '../../constants/colors';


const ProductItem: React.FC<{
    product: Product,
    onDetailsPress: (product: Product) => void
}> = ({ product, onDetailsPress, children }) => {

    let ComponentToUse: React.ComponentClass<TouchableWithoutFeedbackProps & Partial<TouchableNativeFeedbackProps>> = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version > 21) {
        ComponentToUse = TouchableNativeFeedback;
    }

    return (
        <ComponentToUse onPress={() => onDetailsPress(product)} useForeground >
            <View style={styles.productItem}>
                <Image source={{ uri: product.image }} style={styles.image} />

                <View style={styles.info}>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                </View>

                <View style={styles.buttonContainer}>
                   {children}
                </View>
            </View>
        </ComponentToUse>
    )
}

const styles = StyleSheet.create({
    productItem: {
        height: 270,
        flex: 1,
        backgroundColor: 'white',
        marginVertical: 15,
        borderRadius: 10,
        width: '94%',
        justifyContent: 'center',
        marginLeft: '2.5%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '65%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        paddingBottom: 2,
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: Platform.OS === 'android' ? 10 : 0,
        marginBottom: 10,
        height: '10%',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    }
})

export default ProductItem
