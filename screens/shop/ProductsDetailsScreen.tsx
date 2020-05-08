import React from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet } from 'react-native';
import { IStackProps } from '../../models/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../models/store';
import colors from '../../constants/colors';
import { addToCartAction } from '../../store/actions/cart';


const ProductsDetailsScreen: React.FC<IStackProps<"ProductDetails">> = ({ navigation, route }) => {
    const { productId } = route.params
    const product = useSelector((state: IRootState) => state.products.availableProducts.find(t => t.id === productId))
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(addToCartAction(product!))
    }

    if (!product)
        return null;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image style={styles.image} source={{ uri: product.image }} />
            <Button color={colors.primary} title='Add to Cart' onPress={addToCart} />
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    },
    image: {
        height: 250,
        width: '100%',
        marginBottom: 10
    },
    price: {
        color: '#888',
        marginVertical: 15,
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    },
    description: {
        paddingHorizontal: 20,
        marginVertical: 10,
        fontFamily: 'open-sans'
    }
})


export default ProductsDetailsScreen
