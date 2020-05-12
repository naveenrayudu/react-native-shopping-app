import React, { useReducer, useRef, useCallback, useState } from 'react'
import { View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Button, Platform, Alert, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import InputControl from '../../components/common/InputControl'
import colors from '../../constants/colors'
import useThunkDispatch from '../../components/hooks/useThunkDispatch'
import { UseFormReducer, FORM_SUBMITTED } from '../../helpers/useFormHandler'
import { initialState, IAuthScreenState } from '../../models/authScreenModel'
import { emailValidator } from '../../helpers/validators'
import { signUpAction, signInAction } from '../../store/actions/auth'
import { useFocusEffect } from '@react-navigation/native'

const AuthScreen = () => {
    const dispatch = useThunkDispatch();
    const passwordRef = useRef<TextInput>(null);
    const [isSignIn, setAuthType] = useState(true);
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const {state, dispactReactAction, formInputChangeHandler}  = UseFormReducer<IAuthScreenState>(initialState);

    useFocusEffect(
        React.useCallback(() => {
            setIsAuthLoading(false);
        }, [setIsAuthLoading])
    )

    const authHandler = useCallback(() => {
        if(!state.formValidity.isSubmitted) {
            dispactReactAction({type: FORM_SUBMITTED, payload: null});
        }
        
        if(!state.formValidity.isValid) {
            return Alert.alert(`Invalid ${isSignIn ? 'Sign-In' : 'Sign-Up'}`, 'Please fill all the required fields with valid values')
        }

        const action = isSignIn ? signInAction: signUpAction; 
        setIsAuthLoading(true);

        dispatch(action(state.inputValues.email, state.inputValues.password))
            .then(() => {
                
            })
            .catch((err) => {
                setIsAuthLoading(false);
                Alert.alert(`Invalid ${isSignIn ? 'Sign-In' : 'Sign-Up'}`, err)
            })
            .finally(() => {
               
            })
    }, [dispatch, dispactReactAction, state])

    return (
        <LinearGradient style={{
            flex: 1
        }} colors={['#ffedff', '#ffe3ff']}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={100} style={styles.screen}>

                <View style={styles.container}>
                    <ScrollView contentContainerStyle={{
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <InputControl
                            label='Email'
                            value={state.inputValues.email}
                            onChangeText={(value) => formInputChangeHandler(value, 'email', emailValidator)}
                            returnKeyType='next'
                            errorMessage={!state.inputValidities.email  ? 'Valid Email is required' : ''}
                            returnKeyLabel='next'
                            forceShow={state.formValidity.isSubmitted}
                            onSubmitEditing={() => {passwordRef.current && passwordRef.current.focus()}}
                        />
                        <InputControl
                            label='Password'
                            ref={passwordRef}
                            value={state.inputValues.password}
                            onChangeText={(value) => formInputChangeHandler(value, 'password')}
                            returnKeyType='done'
                            returnKeyLabel='done'
                            secureTextEntry
                            forceShow={state.formValidity.isSubmitted}
                            errorMessage={!state.inputValidities.password ? 'Password is required' : ''}
                        />

                        <View>
                            <View style={styles.buttonContainer}>
                                {
                                    isAuthLoading ? <ActivityIndicator  size='small' color={colors.primary} /> :
                                    <Button color={colors.primary} onPress={authHandler} title={`${isSignIn ? 'Sign In' : 'Sign Up'}`} />
                                }
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button color={colors.accent} onPress={() => setAuthType(prevState => !prevState)} title={`Switch to ${isSignIn ? 'Sign Up' : 'Sign In'}`} />
                            </View>

                        </View>
                    </ScrollView>
                </View>

            </KeyboardAvoidingView>
        </LinearGradient>

    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    container: {
        flex: 1,
        width: '80%',
        maxWidth: 400,
        maxHeight: 350,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 20,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.23,
        shadowRadius: 1.62,
        elevation: 4,
        borderRadius: 10
    },
    buttonContainer: {
        marginTop: 10
    }
})


export default AuthScreen
