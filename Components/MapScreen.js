import React from 'react';
import MapView,{Marker} from'react-native-maps';
import { StyleSheet, Text, View ,ActivityIndicator,Dimensions } from 'react-native';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';
import dataCinema from './CinemasData';
export default class MapScreen extends React.Component {
 
    constructor(props){
      super(props)
    }
    state = {
      region:{},
      mapIsReady:false
    }
   
    _getLocation = async () => {
      const {status} = await Location.requestPermissionsAsync();
      if(status !== 'granted'){
        Alert.alert("Error","Location is not granted")
        return
      }
      const userLocation = await Location.getCurrentPositionAsync({});
      this.setState({
        region:{
          latitude:userLocation.coords.latitude,
          longitude:userLocation.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.03,
        },
        mapIsReady: true
      })
   
      console.log(this.state.region)
   
    }
   
    UNSAFE_componentWillMount(){
      this._getLocation()
    }
   
    setUserLocation(coordinate){
      this.setState({
        region: {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.03
        }
      })
    }
   
    _showMap = () => {
      if(this.state.mapIsReady){
        return(
          <MapView style={styles.mapStyle} 
            initialRegion={this.state.region}
            showsUserLocation={true}
            onUserLocationChange={locationChangedResult => this.setUserLocation(locationChangedResult.nativeEvent.coordinate)}
          >
            <Marker
              coordinate={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude
              }}
              title="Your Location"
            />
            {dataCinema.map(cinema =>(
                 <Marker
                 coordinate={{
                  latitude: cinema.conrdinate.latitude,
                  longitude: cinema.conrdinate.longitude
                }}
                title={cinema.title}
               />
            
              ))}
          </MapView>
        )
      }
      else{
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
    }
   
    render() {
      return (
        <View style={styles.container}>
          {this._showMap()}
        </View>
      );
    }
  }
   
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 100,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });