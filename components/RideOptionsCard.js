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
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

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

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NavigateCard')}
          style={tw`absolute top-3 left-5 p-3 rounded-full bg-gray-100 z-10`}
        >
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride -{' '}
          {travelTimeInformation?.distance?.text ?? 'No Results'}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        style={tw`mb-28`}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            disabled={!travelTimeInformation?.duration?.text}
            style={tw`flex-row justify-between items-center px-3 ${
              id === selected?.id && 'bg-gray-200'
            }`}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel time</Text>
            </View>
            <Text style={tw`text-lg`}>
              {travelTimeInformation?.duration?.value
                ? new Intl.NumberFormat('en-CA', {
                    style: 'currency',
                    currency: 'CAD',
                  }).format(
                    (travelTimeInformation?.duration?.value *
                      SURGE_CHARGE_RATE *
                      multiplier) /
                      100
                  )
                : '-'}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View
        style={tw`z-50 absolute top-96 left-0 right-0 mt-auto border-t border-gray-200`}
      >
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
