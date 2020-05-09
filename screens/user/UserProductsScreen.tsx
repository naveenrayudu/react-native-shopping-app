import React from 'react'
import { View, FlatList, Button, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from '../../models/store'
import ProductItem from '../../components/shop/ProductItem'
import colors from '../../constants/colors'
import Product from '../../models/product'
import {deleteProductAction} from '../../store/actions/products'
import { IStackNavigationProp } from '../../models/navigation'
import useThunkDispatch from '../../components/hooks/useThunkDispatch'

const UserProductsScreen: React.FC<{
    navigation: IStackNavigationProp
}> = ({navigation}) => {
    const userProducts = useSelector((state: IRootState) => state.products.userProducts);
    const dispatch = useThunkDispatch();

    const deleteProduct = (product: Product) => {
        Alert.alert('Are you sure?', 'Do you want to delete this product', 
        [
            {text: 'No', style:'default'},
            {text: 'Yes', style: 'destructive', onPress: () => {
                dispatch(deleteProductAction(product))
                .catch(() => Alert.alert("Error occured", "Error occured while deleting the product"))
            }}
        ]);
    }

    const editProduct = (productId: string) => {
        navigation.navigate("EditProducts", {
            productId: productId
        })
    }


    return (
        <FlatList
            data={userProducts}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => {
                return (
                <ProductItem product={item} onDetailsPress={() => editProduct(item.id)}>
                    <Button color={colors.primary} onPress={() => editProduct(item.id)} title='Edit Details' />
                    <Button color={colors.primary} onPress={() => deleteProduct(item)} title='Delete' />
                </ProductItem>
                )
            }}
        />
    )
}

export default UserProductsScreen
