import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store/reducers';
import Navigation from './navigation/Navigation';
import { enableScreens } from 'react-native-screens';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

const useFonts = (fontMap: {
  [key: string]: string
}) => {
  let [fontsLoaded, setFontsLoaded] = useState(false);
  (async () => {
    await Font.loadAsync(fontMap);
    setFontsLoaded(true);
  })();
  return [fontsLoaded];
}

enableScreens();

export default function App() {
  let [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
