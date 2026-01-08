import { icons } from '@/constants';
import { useFetch } from '@/lib/fetch';
import { calculateDriverTimes, calculateRegion, generateMarkersFromData } from '@/lib/map';
import { useDriverStore, useLocationStore } from '@/store';
import { Driver, MarkerData } from '@/types/type';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';


export default function Map() {
    const {data:drivers,loading,error} = useFetch<Driver[]>('/(api)/driver')
    const {
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude} = useLocationStore()
        const {selectedDriver, setDrivers} = useDriverStore()
        const [markers , setMarkers] = useState<MarkerData[]>([])
        const region = calculateRegion({
            userLatitude,
            userLongitude,
            destinationLatitude,
            destinationLongitude
        })
        console.log("userLatitude",userLatitude);
        useEffect(()=>{         // setting car location
            if(Array.isArray(drivers)){
                if(!userLatitude || !userLongitude) return
                const newMarkers = generateMarkersFromData({
                    data: drivers,
                    userLatitude,
                    userLongitude
                })
                setMarkers(newMarkers)
            }
        },[drivers,userLatitude,userLongitude])
        useEffect(()=>{
            if(markers.length>0 && destinationLatitude && destinationLongitude){
                calculateDriverTimes({
                    markers,
                    userLatitude,
                    userLongitude,
                    destinationLatitude,
                    destinationLongitude,
                }).then((drivers)=>setDrivers(drivers as MarkerData[]))
            }
        },[markers,destinationLatitude,destinationLongitude])
        if (loading || (!userLatitude && !userLongitude)){
            return (
            <View className="flex justify-between items-center w-full">
                <ActivityIndicator size="small" color="#000" />
            </View>
            )
        }
        if (error){
            return (
            <View className="flex justify-between items-center w-full">
                <Text>Error: {error}</Text>
            </View>
            )
        }
    return (
        <MapView
            provider={PROVIDER_DEFAULT}
            style={styles.map}
            tintColor='black'
            showsPointsOfInterest= {false}
            showsUserLocation= {true}
            userInterfaceStyle= 'light'
            region={region}
        >
            {markers.map(marker=>(
                <Marker
                key={marker.id}
                coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
            }}
                title={marker.title}
                image={
                    selectedDriver === +marker.id ?icons.selectedMarker : icons.marker
                }
                />
            ))}
            {
            destinationLatitude&&destinationLongitude&&
            <>
                <Marker
                key='destination'
                coordinate={{
                    latitude: destinationLatitude,
                    longitude: destinationLongitude
                }}
                title='Destination'
                image={icons.pin}
                />
                <MapViewDirections
                origin={{
                    latitude: userLatitude,
                    longitude:userLongitude
                }}
                destination={{
                    latitude:destinationLatitude,
                    longitude:destinationLongitude
                }}
                strokeColor='#0286ff'
                strokeWidth={3}
                apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
                />
            </>
            }
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 16, 
    },
});