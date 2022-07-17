# Uber Clone

- React Native, Redux, TailwindCSS, Google API

## Initialize

- ```bash
  expo init rn-uber-clone
  > blank
  cd rn-uber-clone
  yarn add @reduxjs/toolkit
  yarn add react-redux
  ```

## Set up and implement Redux

- Create `/slices/navSlice.js`

  - ```js
    import { createSlice } from '@reduxjs/toolkit';

    const initialState = {
      origin: null,
      destination: null,
      travelTimeInformation: null,
    };

    export const navSlice = createSlice({
      name: 'nav',
      initialState,
      reducer: {
        setOrigin: (state, action) => {
          state.origin = action.payload;
        },
        setDestination: (state, action) => {
          state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
          state.travelTimeInformation = action.payload;
        },
      },
    });

    export const { setOrigin, setDestination, setTravelTimeInformation } =
      navSlice.actions;

    // Selector
    export const selectOrigin = (state) => state.nav.origin;
    export const selectDestination = (state) => state.nav.destination;
    export const selectTravelTimeInformation = (state) =>
      state.nav.travelTimeInformation;

    export default navSlice.reducer;
    ```

- Create `store.js`

  - ```js
    import { configureStore } from '@reduxjs/toolkit';
    import navReducer from './slices/navSlice';

    export const store = configureStore({
      reducer: {
        nav: navReducer,
      },
    });
    ```

- On `App.js`

  - ```js
    import React from 'react';
    import { StyleSheet, Text, View } from 'react-native';
    import { Provider } from 'react-redux';
    import { store } from './store';

    export default function App() {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            <Text>Uber App</Text>
          </View>
        </Provider>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    ```

## Home Screen

- Install TailwindCSS

  - `yarn add tailwind-react-native-classnames`

  - ```js
    <Text style={[tw`text-red-500 p-10`, { color: 'purple' }]}>Example</Text>
    // color: red-500
    // padding: 10
    // color: purple // override the red-500
    ```

- Create `/screens/HomeScreen.js`

  - ```js
    import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
    import React from 'react';
    import tw from 'tailwind-react-native-classnames';

    const HomeScreen = () => {
      return (
        <SafeAreaView style={tw`bg-white h-full`}>
          <View style={tw`p-5`}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={{
                uri: 'https://links.papareact.com/gzs',
              }}
            />
          </View>
        </SafeAreaView>
      );
    };

    export default HomeScreen;

    const styles = StyleSheet.create({
      text: {
        color: 'blue',
      },
    });
    ```

- Add `HomeScreen` on `App.js`

## Nav Option

- ```bash
  yarn add react-native-elements
  yarn add react-native-vector-icons
  yarn add react-native-safe-area-context
  ```

- Create `/components/NavOption.js`

  - ```js
    import {
      View,
      Text,
      FlatList,
      TouchableOpacity,
      Image,
    } from 'react-native';
    import React from 'react';
    import tw from 'tailwind-react-native-classnames';
    import { Icon } from 'react-native-elements';

    const data = [
      {
        id: '123',
        title: 'Get a ride',
        image: 'https://links.papareact.com/3pn',
        screen: 'MapScreen',
      },
      {
        id: '456',
        title: 'Order food',
        image: 'https://links.papareact.com/28w',
        screen: 'EatsScreen',
      },
    ];
    const NavOptions = () => {
      return (
        <FlatList
          data={data}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
            >
              <View>
                <Image
                  style={{ width: 120, height: 120, resizeMode: 'contain' }}
                  source={{ uri: item.image }}
                />
              </View>
              <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
              <Icon
                type='antdesign'
                name='arrowright'
                color='white'
                style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              />
            </TouchableOpacity>
          )}
        />
      );
    };

    export default NavOptions;
    ```

- On `/screens/HomeScreen.js`

  - ```js
    import NavOptions from '../components/NavOptions';
    ...
            <NavOptions />
          </View>
        </SafeAreaView>
        ...
    ```

- On `App.js`

  - ```js
    import { SafeAreaProvider } from 'react-native-safe-area-context';
    ...
        <Provider store={store}>
          <SafeAreaProvider>
            <HomeScreen />
          </SafeAreaProvider>
        ...
    ```

---

# Tips

- Shortcut `rnfes`: reactNativeFunctionalExportComponentWithStyle

- import app component

  - Ctrl + space bar at the end of app component
