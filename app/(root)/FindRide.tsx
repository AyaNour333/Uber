import CustomButton from '@/components/CustomButton'
import GoogleTextInput from '@/components/GoogleTextInput'
import RideLayout from '@/components/RideLayout'
import { icons } from '@/constants'
import { useLocationStore } from '@/store'
import { router } from 'expo-router'
import { View, Text } from 'react-native'

export default function FindRide() {
    const {
        destinationAddress,
        userAddress,
        setDestinationLocation,
        setUserLocation
    } = useLocationStore()
    return (
        <RideLayout title='Ride'>
            <View className="my-3">
                <Text className='text-2xl'>From</Text>
                <GoogleTextInput
                icon={icons.target}
                initialLocation={userAddress as string}
                containerStyle='bg-neutral-100'
                textInputBackgroundColor='#f5f5f5'
                handlePress={(location)=>setUserLocation(location)}
                />
            </View>
            <View className="my-3">
                <Text className='text-2xl'>To</Text>
                <GoogleTextInput
                icon={icons.map}
                initialLocation={destinationAddress as string}
                containerStyle='bg-neutral-100'
                textInputBackgroundColor='transparent'
                handlePress={(location)=>setDestinationLocation(location)}
                />
            </View>
            <CustomButton title='Find Now' className='mt-5'
            onPress={()=>router.push('/(root)/ConfirmRide')}
            />
        </RideLayout>
    )
}