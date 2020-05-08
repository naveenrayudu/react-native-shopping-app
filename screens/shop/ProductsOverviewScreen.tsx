import React from 'react';
import { FlatList, View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../models/store';
import ProductItem from '../../components/shop/ProductItem';
import { IStackProps } from '../../models/navigation';
import Product from '../../models/product';
import { addToCartAction } from '../../store/actions/cart';
import colors from '../../constants/colors';

const ProductsOverviewScreen: React.FC<IStackProps<"Products">> = ({ navigation }) => {
    const availableProducts = useSelector((state: IRootState) => state.products.availableProducts)

    const dispatch = useDispatch();

    const onDetailsPress = (product: Product) => {
        navigation.navigate("ProductDetails", {
            productId: product.id,
            productTitle: product.title
        })
    }

    const addToCart = (product: Product) => {
        dispatch(addToCartAction(product))
    }

    return (
        <FlatList data={availableProducts} renderItem={({ item }) => (<ProductItem onDetailsPress={onDetailsPress} product={item}>
            <Button color={colors.primary} onPress={() => onDetailsPress(item)} title='View Details' />
            <Button color={colors.primary} onPress={() => addToCart(item)} title='To Cart' />
        </ProductItem>)} />
    )
}

export default ProductsOverviewScreen
