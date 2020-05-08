import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TextInputProps, TextStyle, StyleProp } from 'react-native'


interface IProps extends TextInputProps {
    style?: TextStyle,
    label: string,
    ref?: any,
    isValid?: boolean,
    forceShow?: boolean
    errorMessage?: string
} 


const InputControl: React.FC<IProps> = React.forwardRef((props, ref: any) => {
    const {label, style={}, forceShow = false, isValid = true, errorMessage = '', onBlur, ...rest} = props;
    const [isTouched, setIsTouched] = useState(false);

    const onBlurHandler = (e: any) => {
        setIsTouched(true);
        if(onBlur) {
            onBlur(e)
        }
    }
    
    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                ref = {ref}
                style={{ ...styles.input, ...style }}
                onBlur={onBlurHandler}
                {...rest}
            />
            {(isTouched || forceShow) && !!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
    )
})


const styles = StyleSheet.create({
    label: {
        fontFamily: 'open-sans-bold',
        color: '#888'
    },
    formControl: {
        marginVertical: 10
    },
    input: {
        borderBottomColor: '#888',
        borderBottomWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    error: {
        color: 'red'
    }
})


export default InputControl
