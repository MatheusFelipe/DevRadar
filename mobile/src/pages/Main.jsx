import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import devsAPI from '../services/devsAPI';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  avatar: {
    borderColor: '#fff',
    borderRadius: 4,
    borderWidth: 4,
    height: 54,
    width: 54,
  },

  callout: {
    width: 260,
  },

  devName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  },

  searchForm: {
    flexDirection: 'row',
    left: 20,
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 5,
  },

  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 25,
    color: '#333',
    elevation: 2,
    flex: 1,
    fontSize: 16,
    height: 50,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
  },

  loadButton: {
    alignItems: 'center',
    backgroundColor: '#8e4dff',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    marginLeft: 15,
    width: 50,
  },

  disabledLoadButton: {
    opacity: 0.5,
  },
});

const Main = ({ navigation }) => {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState('');

  useEffect(() => {
    requestPermissionsAsync().then(({ granted }) => {
      if (granted)
        getCurrentPositionAsync({ enableHighAccuracy: true }).then(({ coords: { latitude, longitude } }) =>
          setCurrentRegion({ latitude, longitude, latitudeDelta: 0.04, longitudeDelta: 0.04 })
        );
    });
  }, []);

  if (!currentRegion) return null;

  const loadDevs = () => {
    const { latitude, longitude } = currentRegion;
    devsAPI.searchDevs({ latitude, longitude, techs: techs.split(',').map(el => el.trim()) }).then(resp => {
      setDevs(resp);
    });
  };

  return (
    <>
      <MapView initialRegion={currentRegion} onRegionChangeComplete={setCurrentRegion} style={styles.map}>
        {devs.map(dev => (
          <Marker key={dev.id} coordinate={{ ...dev.coordinates }}>
            <Image style={styles.avatar} source={{ uri: dev.avatarUrl }} />
            <Callout onPress={() => navigation.navigate('Profile', { githubUsername: dev.githubUsername })}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar devs por tecnologias"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity
          onPress={loadDevs}
          style={[styles.loadButton, !techs && styles.disabledLoadButton]}
          disabled={!techs}
        >
          <MaterialIcons name="my-location" style={{ opacity: !techs ? 0.5 : 1 }} size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Main;
