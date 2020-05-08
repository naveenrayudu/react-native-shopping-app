import React, { useCallback, useState, useEffect, useRef, useReducer } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform, SafeAreaView, NativeSyntheticEvent, TextInputFocusEventData, UIManager, findNodeHandle, TargetedEvent } from 'react-native'
import { IRouteProp, IStackNavigationProp } from '../../models/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, IDefaultAction } from '../../models/store';
import Product from '../../models/product';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/ui/CustomHeaderButton';
import { addNewProductAction, editProductAction } from '../../store/actions/products';
import InputControl from '../../components/common/InputControl';
import { IEditProductScreenState, initialFormState, IEditProductScreenInputValues } from '../../models/editProductScreen';



const createEmptyProduct = (): Product => {
    return new Product('', '', '', '', '', 0.00);
}

const INITIAL_STATE = 'INITIAL_STATE';
const UPDATE_FIELD_VALUE = 'UPDATE_FIELD_VALUE';
const FORM_SUBMITTED = 'FORM_SUBMITTED';

type Update_Payload = {
    inputName: string,
   value: string,
   isValid: boolean
}

type productInfoKeys = keyof IEditProductScreenInputValues

const reducer = (state: IEditProductScreenState, action: IDefaultAction<any>): IEditProductScreenState => {
    switch (action.type) {
        case UPDATE_FIELD_VALUE:
            const updatePayload =  action.payload as Update_Payload;
            const inputValues = {...state.inputValues};
            const inputValidities = {...state.inputValidities};
            const formValidities = {...state.formValidity};
            const inputName = updatePayload.inputName as productInfoKeys

            inputValues[inputName] = updatePayload.value;
            inputValidities[inputName] = updatePayload.isValid;

            formValidities.isDirty = true;
            formValidities.isTouched = true;
            formValidities.isValid = Object.keys(inputValidities).some((key)=> inputValidities[key as productInfoKeys])


            return {
                ...state,
                formValidity: formValidities,
                inputValidities: inputValidities,
                inputValues: inputValues
            }

        case INITIAL_STATE:
            return {
                ...state,
                ...action.payload
            }

        case FORM_SUBMITTED:
            return {...state, formValidity: {
                ...state.formValidity,
                isSubmitted: true
            }}

        default:
            return state;
    }
}

const EditProductsScreen: React.FC<{
    route: IRouteProp,
    navigation: IStackNavigationProp
}> = ({ route, navigation }) => {
    const productId = route.params?.productId;
    const productToEdit = useSelector((state: IRootState) => state.products.userProducts.find(t => t.id === productId));
    const [state, dispactReactAction] = useReducer(reducer, initialFormState)

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

    const dispatch = useDispatch();

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
            dispatch(addNewProductAction(productInfo));
        } else {
            dispatch(editProductAction(productInfo));
        }

        navigation.navigate('UserProducts');

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

    const updateFormInput = useCallback((value: string, inputName: string) => {
       dispactReactAction({
           type: UPDATE_FIELD_VALUE,
           payload: {
               inputName,
               value,
               isValid: !!inputName
           }
       })
    }, []);
 
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
                        onChangeText={(value) => updateFormInput(value, 'title')}
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
                        onChangeText={(value) => updateFormInput(value, 'price')}
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
                        onChangeText={(value) => updateFormInput(value, 'image')}
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
                        onChangeText={(value) => updateFormInput(value, 'description')} />

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
