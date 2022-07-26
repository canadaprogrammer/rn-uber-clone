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

    export default function App() {
      const Stack = createNativeStackNavigator();
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

## Map Screen

- `yarn add react-native-maps`

- On `/screens/MapScreen.js`

  - ```js
    import { Text, View } from 'react-native';
    import React from 'react';
    import tw from 'tailwind-react-native-classnames';
    import Map from '../components/Map';

    const MapScreen = () => {
      return (
        <View>
          <Text>MapScreen</Text>
          <View style={tw`h-1/2`}>
            <Map />
          </View>
          <View style={tw`h-1/2`}></View>
        </View>
      );
    };

    export default MapScreen;
    ```

- Create `/components/Map.js`

  - ```js
    import React from 'react';
    import MapView from 'react-native-maps';
    import tw from 'tailwind-react-native-classnames';

    const Map = () => {
      return (
        <MapView
          style={tw`flex-1`}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    };

    export default Map;
    ```

## Map Component

- On `/components/Map.js`

  - ```js
    ...
    import { useSelector } from 'react-redux';
    import { selectOrigin } from '../slices/navSlice';

    const Map = () => {
      const origin = useSelector(selectOrigin);
      console.log(origin);
      return (
        <MapView
          style={tw`flex-1`}
          initialRegion={{
            latitude: origin?.location?.lat,
            longitude: origin?.location?.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          ...
    ```

## Add Pin to Map

- On `/components/Map.js`

  - ```js
    import MapView, { Marker } from 'react-native-maps';
    ...
        >
          {origin?.location && (
            <Marker
              coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
              }}
              title='Origin'
              description={origin.description}
              identifier='origin'
            />
          )}
        </MapView>
      ...
    ```

## Modify Nav Options for being disabled

- On `/components/NavOptions.js`

  - ```js
    import { useSelector } from 'react-redux';
    import { selectOrigin } from '../slices/navSlice';
    ...
    const NavOptions = () => {
      const origin = useSelector(selectOrigin);
      ...
            <TouchableOpacity
              ...
              disabled={!origin}
            >
              <View style={tw`${!origin && 'opacity-20'}`}>
                ...
    ```

## Add ToGo Section to Map Screen

- Create `/components/NavigateCard.js`

  - ```js
    import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
    import React from 'react';
    import tw from 'tailwind-react-native-classnames';
    import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
    import { GOOGLE_API_KEY } from '@env';
    import { useDispatch } from 'react-redux';
    import { setDestination } from '../slices/navSlice';
    import { useNavigation } from '@react-navigation/native';

    const NavigateCard = () => {
      const dispatch = useDispatch();
      const navigation = useNavigation();
      return (
        <SafeAreaView style={tw`bg-white flex-1`}>
          <Text style={tw`text-center py-5 text-xl`}>Good Morning!!</Text>
          <View style={tw`border-t border-gray-200 flex-shrink`}>
            <View>
              <GooglePlacesAutocomplete
                styles={toInputBoxStyles}
                placeholder='Where to?'
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
                fetchDetails={true}
                enablePoweredByContainer={false}
                query={{
                  key: GOOGLE_API_KEY,
                  language: 'en',
                }}
                returnKeyType={'search'}
                minLength={2}
                onPress={(data, details = null) => {
                  dispatch(
                    setDestination({
                      location: details.geometry.location,
                      description: data.description,
                    })
                  );
                  navigation.navigate('RideOptionsCard');
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      );
    };

    export default NavigateCard;

    const toInputBoxStyles = StyleSheet.create({
      container: {
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0,
      },
      textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 18,
      },
      textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
      },
    });
    ```

- Create `/components/RideOptionsCard.js`

  - ```js
    import { SafeAreaView, Text } from 'react-native';
    import React from 'react';

    const RideOptionsCard = () => {
      return (
        <SafeAreaView>
          <Text>RideOptionsCard</Text>
        </SafeAreaView>
      );
    };

    export default RideOptionsCard;
    ```

- On `/screens/MapScreen.js`

  - ```js
    ...
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import NavigateCard from '../components/NavigateCard';
    import RideOptionsCard from '../components/RideOptionsCard';

    const MapScreen = () => {
      const Stack = createNativeStackNavigator();
      return (
        <View>
          <View style={tw`h-1/3`}>
            <Map />
          </View>
          <View style={tw`h-2/3`}>
            <Stack.Navigator>
              <Stack.Screen
                name='NavigateCard'
                component={NavigateCard}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='RideOptionsCard'
                component={RideOptionsCard}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </View>
        </View>
      ...
    ```

## Implement Directions Map

- `yarn add react-native-maps-directions`

- On `/components/Map.js`

  - ```js
    ...
    import React, { useEffect, useRef } from 'react';
    import { selectDestination, selectOrigin } from '../slices/navSlice';
    import MapViewDirections from 'react-native-maps-directions';
    import { GOOGLE_API_KEY } from '@env';

    const Map = () => {
      ...
      const destination = useSelector(selectDestination);
      const mapRef = useRef(null);

      useEffect(() => {
        if (!origin || !destination) return;

        // Zoom & Fit to Markers
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
      }, [origin, destination]);
      return (
        <MapView
          ...
        >
          {origin && destination && (
            <MapViewDirections
              origin={origin.description}
              destination={destination.description}
              apikey={GOOGLE_API_KEY}
            ></MapViewDirections>
          )}
          {origin?.location && (
            ...
          )}
          {destination?.location && (
            <Marker
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              title='Destination'
              description={destination.description}
              identifier='destination'
            />
          )}
        </MapView>
        ...
    ```

## NavFavorites Component

- Create `/components/NavFavorites.js`

  - ```js
    import {
      FlatList,
      Text,
      TouchableOpacity,
      View,
    } from 'react-native';
    import React from 'react';
    import { Icon } from 'react-native-elements';
    import tw from 'tailwind-react-native-classnames';

    const data = [
      {
        id: '123',
        icon: 'home',
        location: 'Home',
        destination: 'Code Street, London, UK',
      },
      {
        id: '456',
        icon: 'briefcase',
        location: 'Work',
        destination: 'London Eye, London, UK',
      },
    ];
    const NavFavorites = () => {
      return (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={[tw`bg-gray-200 `, { height: 0.5 }]}></View>
          )}
          renderItem={({ item: { location, destination, icon } }) => (
            <TouchableOpacity style={tw`flex-row items-center p-5`}>
              <Icon
                name={icon}
                style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                type='ionicon'
                color='white'
                size={18}
              />
              <View>
                <Text style={tw`font-semibold text-lg`}>{location}</Text>
                <Text style={tw`text-gray-500`}>{destination}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      );
    };

    export default NavFavorites;
    ```

- On `/screens/HomeScreen.js` and `/components/NavigationCard.js`, add `NavFavorites`

## Keyboard Avoiding View

- Turn on toggle software keyboard: `cmd + K` on the iOS simulator

  - Find an issue hiding contents by keyboard

- On `App.js`

  - ```js
    import { KeyboardAvoidingView, Platform } from 'react-native';
    ...
            <SafeAreaProvider>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
              >
                <Stack.Navigator>
                  ...
    ```

## Add Buttons on Navigate Card

- On `/components/NavigateCard.js`

  - ```js
    import { TouchableOpacity } from 'react-native';
    import { Icon } from 'react-native-elements';
    ...
          <View
            style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('RideOptionsCard')}
              style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
            >
              <Icon name='car' type='font-awesome' color='white' size={16} />
              <Text style={tw`text-white text-center`}>Rides</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
            >
              <Icon
                name='fast-food-outline'
                type='ionicon'
                color='black'
                size={16}
              />
              <Text style={tw`text-center`}>Eats</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        ...
    ```

## Ride Options Card

- On `/components/RideOptionsCard.js`

  - ```js
    import {
      FlatList,
      SafeAreaView,
      Text,
      TouchableOpacity,
      View,
    } from 'react-native';
    import React, { useState } from 'react';
    import tw from 'tailwind-react-native-classnames';
    import { Icon, Image } from 'react-native-elements';
    import { useNavigation } from '@react-navigation/native';

    const data = [
      {
        id: 'Uber-X-123',
        title: 'UberX',
        multiplier: 1,
        image: 'https://links.papareact.com/3pn',
      },
      {
        id: 'Uber-XL-123',
        title: 'UberXL',
        multiplier: 1.7,
        image: 'https://links.papareact.com/5w8',
      },
      {
        id: 'Uber-LUX-123',
        title: 'UberLUX',
        multiplier: 1.25,
        image: 'https://links.papareact.com/7pf',
      },
    ];
    const RideOptionsCard = () => {
      const navigation = useNavigation();
      const [selected, setSelected] = useState(null);
      return (
        <SafeAreaView style={tw`bg-white`}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('NavigateCard')}
              style={tw`absolute top-3 left-5 p-3 rounded-full bg-gray-100 z-10`}
            >
              <Icon name='chevron-left' type='fontawesome' />
            </TouchableOpacity>
            <Text style={tw`text-center py-5 text-xl`}>Select a Ride</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            style={tw`mb-28`}
            renderItem={({ item: { id, title, multiplier, image }, item }) => (
              <TouchableOpacity
                onPress={() => setSelected(item)}
                style={tw`flex-row justify-between items-center px-10 ${
                  id === selected?.id && 'bg-gray-200'
                }`}
              >
                <Image
                  style={{ width: 100, height: 100, resizeMode: 'contain' }}
                  source={{ uri: image }}
                />
                <View style={tw`-ml-6`}>
                  <Text style={tw`text-xl font-semibold`}>{title}</Text>
                  <Text>Travel time...</Text>
                </View>
                <Text style={tw`text-xl`}>$22</Text>
              </TouchableOpacity>
            )}
          />
          <View style={tw`z-50 absolute top-96 left-0 right-0`}>
            <TouchableOpacity
              disabled={!selected}
              style={tw`bg-black py-2 m-3 ${!selected && 'bg-gray-300'}`}
            >
              <Text style={tw`text-center text-white text-xl`}>
                Choose {selected?.title}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    };

    export default RideOptionsCard;
    ```

---

## Tips

- Shortcut `rnfes`: reactNativeFunctionalExportComponentWithStyle

- import app component

  - Ctrl + space bar at the end of app component
