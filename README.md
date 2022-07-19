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
      reducers: {
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

## Nav Options

- ```bash
  yarn add react-native-elements
  yarn add react-native-vector-icons
  yarn add react-native-safe-area-context
  ```

- Create `/components/NavOptions.js`

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

## Implement React Native Navigation

- ```bash
  yarn add @react-navigation/native
  expo install react-native-screens react-native-safe-area-context
  yarn add @react-navigation/native-stack
  ```

- On `App.js`

  - ```js
    import { NavigationContainer } from '@react-navigation/native';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    ...
        <Provider store={store}>
          <NavigationContainer>
            <SafeAreaProvider>
              <Stack.Navigator>
                <Stack.Screen
                  name='HomeScreen'
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='MapScreen'
                  component={MapScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </SafeAreaProvider>
          </NavigationContainer>
        </Provider>
      ...
    ```

- On `/components/NavOptions.js`

  - ```js
    import { useNavigation } from '@react-navigation/native';
    ...
    const NavOptions = () => {
      const navigation = useNavigation();
      ...
            <TouchableOpacity
              ...
              onPress={() => navigation.navigate(item.screen)}
            >
              ...
    ```

- Create `/screens/MapScreen.js`

  - ```js
    import { Text, SafeAreaView } from 'react-native';
    import React from 'react';

    const MapScreen = () => {
      return (
        <SafeAreaView>
          <Text>MapScreen</Text>
        </SafeAreaView>
      );
    };

    export default MapScreen;
    ```

## Implement Google Places Autocomplete

- ```bash
  yarn add react-native-google-places-autocomplete
  yarn add react-native-dotenv
  ```

- On `babel.config.js`, add below code to `return`

  - ```js
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
    ```

- On `.gitignore`, add `.env`

- On Google Cloud

  1. Create new project
  2. Go to APIs & Services
  3. Click Enable APIs and Services

  - Select Places API - Enable
  - Select Directions API - Enable
  - Select Distance Matrix API - Enable

  4. Go to Credentials

  - Click Create Credentials
  - Choose API key
  - Copy the key
  - Edit API key
    - Check Restrict key
    - Select Directions API, Distance Matrix API and Places API

- Create `.env` and write `GOOGLE_API_KEY = "paste the API key here"`

- On `screens/HomeScreen.js`

  - ```js
    ...
    import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
    import { GOOGLE_API_KEY } from '@env';
    import { useDispatch } from 'react-redux';
    import { setDestination, setOrigin } from '../slices/navSlice';

    const HomeScreen = () => {
      const dispatch = useDispatch();
      ...
            <GooglePlacesAutocomplete
              placeholder='Where from?'
              styles={{
                container: {
                  flex: 0,
                },
                textInput: {
                  fontSize: 18,
                },
              }}
              fetchDetails={true}
              onPress={(data, details = null) => {
                dispatch(
                  setOrigin({
                    location: details.geometry.location,
                    description: data.description,
                  })
                );
                dispatch(setDestination(null));
              }}
              returnKeyType={'search'}
              enablePoweredByContainer={false}
              minLength={2}
              query={{ key: GOOGLE_API_KEY, language: 'en' }}
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={400}
            />
            <NavOptions />
          ...
    ```

# Tips

- Shortcut `rnfes`: reactNativeFunctionalExportComponentWithStyle

- import app component

  - Ctrl + space bar at the end of app component
