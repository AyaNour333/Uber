import GoogleTextInput from '@/components/GoogleTextInput'
import Map from '@/components/Map'
import RideCard from '@/components/RideCard'
import * as Location from 'expo-location'
import { icons, images } from '@/constants'
import { useLocationStore } from '@/store'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useFetch } from '@/lib/fetch'
import { Ride } from '@/types/type'

export default function Home() {
    const { user } = useUser()
    const { signOut } = useAuth()
    const {setUserLocation , setDestinationLocation} = useLocationStore()
    const {data:recentRides , loading } = useFetch(`/(api)/ride/${user?.id}`)
    const [hasPermission , setHasPermission] = useState<boolean>()
    const handleSignOut = ()=>{
        signOut()
        router.replace('/(auth)/sign-in')
    }
    const handleDestinationPress = (location: {
        latitude: number;
        longitude: number;
        address: string;
    })=>{
        setDestinationLocation(location)
        router.push('/(root)/FindRide')
    }
    useEffect(()=>{
        const requestLocation = async()=>{
            const {status} = await Location.requestForegroundPermissionsAsync()
            if(status !== "granted"){
                setHasPermission(false)
                return
            }
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest, 
            })
            const address = await Location.reverseGeocodeAsync({
                latitude: location.coords?.latitude,
                longitude: location.coords?.longitude
            })
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                address: `${address[0].name || ''} ${address[0].region || ''}`
            });
        }
        requestLocation()
    },[])
    return (
        <SafeAreaView className='bg-general-500'>
        <FlatList data={recentRides as Ride[]} 
        renderItem={({item})=><RideCard key={item.driver_id} {...item}/>}
        className='px-5'
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{
            paddingBottom: 100
        }}
        ListEmptyComponent={()=>(
            <View className='flex-row items-center justify-center'>
                {!loading ? 
                <View>
                    <Image 
                    source={images.noResult} 
                    className='w-40 h-40' 
                    alt='no recent rides found'
                    resizeMode='contain'
                    />
                    <Text>No recent rides found</Text>
                </View>
                :<ActivityIndicator size='small' color='#000' className='mt-5'/>
                }
            </View>
        )}
        ListHeaderComponent={()=>(
            <>
            <View className='mt-5 flex-row items-center justify-between'>
                <Text className='font-JakartaBold text-2xl capitalize'>
                    Welcome {user?.firstName || user?.emailAddresses[0].emailAddress.split('@')[0]}👋
                </Text>
                <TouchableOpacity onPress={handleSignOut} 
                className='bg-white justify-center items-center w-10 h-10 rounded-full'>
                    <Image source={icons.out} className='w-4 h-4'/>
                </TouchableOpacity>
            </View>
            <GoogleTextInput 
            icon={icons.search}
            handlePress={handleDestinationPress}
            containerStyle='bg-white shadow-md shadow-neutral-300 my-5'
            />
            <Text className='mb-5 mt-3 font-JakartaBold text-2xl'>Your current location</Text>
            <View className='h-[300px] bg-transparent'>
                <Map/>
            </View>
            <Text className='mb-5 mt-3 font-JakartaBold text-2xl'>Recent Rides</Text>
            </>
        )}
        />
        </SafeAreaView>
    )
}