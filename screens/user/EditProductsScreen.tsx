import React, { useCallback,  useEffect, useRef, useReducer } from 'react'
import { View, ScrollView, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform, SafeAreaView, NativeSyntheticEvent, TextInputFocusEventData, UIManager, findNodeHandle, TargetedEvent } from 'react-native'
import { IRouteProp, IStackNavigationProp } from '../../models/navigation'
import {  useSelector } from 'react-redux';
import { IRootState } from '../../models/store';
import Product from '../../models/product';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/ui/CustomHeaderButton';
import { addNewProductAction, editProductAction } from '../../store/actions/products';
import InputControl from '../../components/common/InputControl';
import { initialFormState, IEditProductScreenState } from '../../models/editProductScreen';
import useThunkDispatch from '../../components/hooks/useThunkDispatch';
import { UseFormReducer, INITIAL_STATE, FORM_SUBMITTED } from '../../helpers/useFormHandler';



const EditProductsScreen: React.FC<{
    route: IRouteProp,
    navigation: IStackNavigationProp
}> = ({ route, navigation }) => {
    const productId = route.params?.productId;
    const productToEdit = useSelector((state: IRootState) => state.products.userProducts.find(t => t.id === productId));
    const {state, formInputChangeHandler, dispactReactAction} = UseFormReducer<IEditProductScreenState>(initialFormState);

    useEffect(() => {
        const formValidity = {...initialFormState.formValidity};
        const inputValidities = {...initialFormState.inputValidities};
        const inputValues = {...initialFormState.inputValues};
       
        if(productToEdit) {
            inputValues.description = productToEdit.description;
            inputValues.title = productToEdit.title;
            inputValues.image = productToEdit.image;
            inputValues.ownerId = productToEdit.ownerId;
            inputValues.productId = productToEdit.id;
            inputValues.price = productToEdit.price.toString();

            inputValidities.description = true;
            inputValidities.title = true;
            inputValidities.image = true;
            inputValidities.price = true;

            formValidity.isValid = true;
        }
        inputValidities.ownerId = true;
        inputValidities.productId = true;

        formValidity.isDirty = false;
        formValidity.isTouched = false;

        dispactReactAction({
            type: INITIAL_STATE,
            payload: {
                ...state,
                formValidity,
                inputValidities,
                inputValues
            }
        })

    }, [productToEdit])

    const scrollViewRef = useRef<ScrollView>(null);
    const imageRef = useRef<TextInput>(null);
    const priceRef = useRef<TextInput>(null);
    const descriptionRef = useRef<TextInput>(null);

    const dispatch = useThunkDispatch();

    const saveProduct = useCallback(() => {
        if(!state.formValidity.isSubmitted) {
            dispactReactAction({type: FORM_SUBMITTED, payload: null});
        }

        if (!state.inputValues.description
            || !state.inputValues.image
            || !state.inputValues.price
            || !state.inputValues.title) {
            Alert.alert('Please fill all the fields');
            return;
        }

        if (isNaN(parseInt(state.inputValues.price.toString(), 10))) {
            Alert.alert('Price should be a valid number');
            return;
        }
        const productInfo = new Product(state.inputValues.productId, 
                                        state.inputValues.ownerId,
                                        state.inputValues.title,
                                        state.inputValues.image,
                                        state.inputValues.description,
                                        parseFloat(state.inputValues.price)
                                        )

        
        if (!productInfo.id) {
            dispatch(addNewProductAction(productInfo))
            .then(() => {
                navigation.navigate('UserProducts');
            }).catch(() => {
                Alert.alert('Error Occured', 'Error occured while adding the product')
            })
        } else {
            dispatch(editProductAction(productInfo))
            .then(() => {
                navigation.navigate('UserProducts');
            }).catch(() => {
                Alert.alert('Error Occured', 'Error occured while saving the product')
            })
        }

       
    }, [state]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: (props) => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title="search" iconName="ios-save" onPress={() => {
                            saveProduct()
                        }} />
                    </HeaderButtons>
                )
            }
        })
    }, [navigation, saveProduct])
 
    const onFocusHandler = useCallback((e: NativeSyntheticEvent<TargetedEvent>) => {
       const handle = findNodeHandle(e.currentTarget);
        if (handle && scrollViewRef.current) {
            UIManager.measure(handle, (x, y) => {
             scrollViewRef.current && scrollViewRef.current.scrollTo({
                animated: true,
                y: y
              })
            })
          }
    },[scrollViewRef])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
                flex: 1
            }}
            keyboardVerticalOffset={Platform.select({ios: 64, android: 100})}
        >
            <ScrollView ref={scrollViewRef}>
                <View style={styles.form}>
                    <InputControl
                        label='Title'
                        value={state.inputValues.title}
                        onChangeText={(value) => formInputChangeHandler(value, 'title')}
                        autoCapitalize='sentences'
                        autoCorrect
                        autoFocus
                        returnKeyType='next'
                        forceShow={state.formValidity.isSubmitted}
                        errorMessage= {!state.inputValidities.title ? 'Title is required': ''}
                        onSubmitEditing={() => priceRef.current && priceRef.current.focus()}
                    />

                    <InputControl
                        label='Price'
                        keyboardType='decimal-pad'
                        value={state.inputValues.price}
                        onChangeText={(value) => formInputChangeHandler(value, 'price')}
                        ref={priceRef}
                        returnKeyType='done'
                        returnKeyLabel='next'
                        onFocus={onFocusHandler}
                        forceShow={state.formValidity.isSubmitted}
                        errorMessage= {!state.inputValidities.price ? 'Price is required': ''}
                        onSubmitEditing={() => imageRef.current && imageRef.current.focus()}
                    />

                    <InputControl
                        label='Image URL'
                        ref={imageRef}
                        value={state.inputValues.image}
                        onChangeText={(value) => formInputChangeHandler(value, 'image')}
                        returnKeyType="next"
                        onFocus={onFocusHandler}
                        forceShow={state.formValidity.isSubmitted}
                        errorMessage= {!state.inputValidities.image ? 'Image is required': ''}
                        onSubmitEditing={() => descriptionRef.current && descriptionRef.current.focus()}
                    />

                    <InputControl
                        label='Description'
                        numberOfLines={3}
                        ref={descriptionRef}
                        multiline={true}
                        style={styles.multiLineInput}
                        value={state.inputValues.description}
                        onFocus={onFocusHandler}
                        forceShow={state.formValidity.isSubmitted}
                        errorMessage= {!state.inputValidities.description ? 'Description is required': ''}
                        onChangeText={(value) => formInputChangeHandler(value, 'description')} />

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    form: {
        margin: 20,
        marginTop: 0,
        flex: 1,
        paddingBottom: 30
    },
    multiLineInput: {
        // textAlignVertical: 'top'
    }
})

export default EditProductsScreen
