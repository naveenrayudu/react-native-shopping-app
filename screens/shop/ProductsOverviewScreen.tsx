import React, { useCallback, useState } from 'react';
import { FlatList, Button, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { IRootState } from '../../models/store';
import ProductItem from '../../components/shop/ProductItem';
import { IStackProps } from '../../models/navigation';
import Product from '../../models/product';
import { addToCartAction } from '../../store/actions/cart';
import colors from '../../constants/colors';
import useThunkDispatch from '../../components/hooks/useThunkDispatch';
import { fetchProductsAction } from '../../store/actions/products';
import { useFocusEffect } from '@react-navigation/native';

const ProductsOverviewScreen: React.FC<IStackProps<"Products">> = ({ navigation }) => {
    const availableProducts = useSelector((state: IRootState) => state.products.availableProducts)

    const dispatch = useThunkDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const loadProducts = useCallback(() => {
       return dispatch(fetchProductsAction())
                .catch(() => Alert.alert('Error while fetching', 'Error occured while fetching products'))
    }, [dispatch])

    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(true);
            
            loadProducts()
                .finally(() => setIsLoading(false));

        }, [loadProducts, setIsLoading])
    )

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        loadProducts()
                .finally(() => setRefreshing(false));
      }, [loadProducts, setRefreshing]);


    const onDetailsPress = (product: Product) => {
        navigation.navigate("ProductDetails", {
            productId: product.id,
            productTitle: product.title
        })
    }

    const addToCart = (product: Product) => {
        dispatch(addToCartAction(product))
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
            data={availableProducts} renderItem={({ item }) => (<ProductItem onDetailsPress={onDetailsPress} product={item}>
                <Button color={colors.primary} onPress={() => onDetailsPress(item)} title='View Details' />
                <Button color={colors.primary} onPress={() => addToCart(item)} title='To Cart' />
        </ProductItem>)} />
    )
}

export default ProductsOverviewScreen
