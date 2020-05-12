import React from 'react'
import { defaultScreenOptions } from './DefaultOptions'
import { createStackNavigator } from '@react-navigation/stack';
import { IRootStackParamList } from '../models/navigation';
import AuthScreen from '../screens/user/AuthScreen';

const Stack = createStackNavigator<IRootStackParamList>();
const AuthScreenNavigation = () => (
    <Stack.Navigator initialRouteName="Auth" screenOptions={defaultScreenOptions}>
        <Stack.Screen name="Auth" component={AuthScreen} options={({ route, navigation }) => {
            return {
                title: 'Authentication'
            }
        }}  />
    </Stack.Navigator>
)

export default AuthScreenNavigation
