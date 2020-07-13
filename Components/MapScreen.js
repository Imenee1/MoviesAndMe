import React from 'react';
import getDirections from 'react-native-google-maps-directions'
import MapView,{Marker,Polyline} from'react-native-maps';
import { StyleSheet,TouchableOpacity,Image, View ,ActivityIndicator,Dimensions, Text } from 'react-native';
import * as Location from 'expo-location'
import dataCinema from './CinemasData';
export default class Map_Direction extends React.Component {
 
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
        Alert.alert("Erreur"," L'emplacement n'est pas accordé")
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
    handleGetDirections = (latitude,longitude) => {
        const data = {
           source: {
            latitude:  this.state.region.latitude,
            longitude: this.state.region.longitude
          },
          destination: {
            latitude: latitude,
            longitude: longitude
          },
          params: [
            {
              key: "travelmode",
              value: "driving"        // may be "walking", "bicycling" or "transit" as well
            },
            {
              key: "dir_action",
              value: "navigate"       // this instantly initializes navigation using the given travel mode
            }
          ],
         
        }
     
        getDirections(data)
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
              title="Votre emplacement"
            >
               
            </Marker>
          
            {dataCinema.map(cinema =>(
                 <Marker
                 coordinate={{
                  latitude: cinema.conrdinate.latitude,
                  longitude: cinema.conrdinate.longitude
                }}
                title={cinema.title}
                onCalloutPress={() => this.handleGetDirections(cinema.conrdinate.latitude,cinema.conrdinate.longitude)}
               >
                    <MapView.Callout>
                       <Text>
                           {cinema.title}
                       </Text>
                       <Text>
                           Obtenir la direction
                       </Text>
                    </MapView.Callout>
               </Marker>
            
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
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
     justifyContent: 'center',
    paddingVertical: 16,
      
        top: '50%', //for center align
        alignSelf: 'flex-end'
       
      },
      share_image: {
        width: 30,
        height: 30
      }
  });