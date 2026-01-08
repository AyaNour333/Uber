import { View, Text, Image } from 'react-native'
import React from 'react'
import { Ride } from '@/types/type'
import { icons } from '@/constants'
import { formatDate, formatTime } from '@/lib/utils'

export default function RideCard(
    {driver:{first_name,last_name,car_seats},
    destination_address,
    created_at,
    ride_time,
    payment_status,
    user_email,
    fare_price,
    origin_address,
    origin_latitude,
    origin_longitude,
    destination_latitude,
    destination_longitude,
    driver_id,
}:Ride) {
    return (
        <View className='p-3 shadow-sm shadow-neutral-300 mb-3 bg-white'>
            <View className='flex-row items-center justify-between'>
                <Image source={{
                    uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`
                }} className='w-[80px] h-[90px] rounded-lg'/>
                <View className='flex-1 mx-4 gap-y-5'>
                    <View className='mx-5 flex-row items-center'>
                        <Image source={icons.to} className='w-5 h-5 mr-3'/>
                        <Text className='font-JakartaMedium text-md' numberOfLines={1}>{origin_address}</Text>
                    </View>
                    <View className='mx-5 flex-row items-center'>
                        <Image source={icons.point} className='w-5 h-5 mr-3'/>
                        <Text className='font-JakartaMedium text-md'>{destination_address}</Text>
                    </View>
                </View>
            </View>
            <View className='bg-general-500 p-3 rounded-lg mt-5'>
                <View className='flex-row items-center justify-between mb-5 border-b-2 border-b-white pb-3'>
                    <Text className='text-gray-500 font-JakartaMedium'>Date & Time</Text>
                    <Text className='font-JakartaMedium'>{formatDate(created_at)} , {formatTime(ride_time)}</Text>
                </View>
                <View className='flex-row items-center justify-between mb-5 border-b-2 border-b-white pb-3'>
                    <Text className='text-gray-500 font-JakartaMedium'>Driver</Text>
                    <Text className='font-JakartaMedium'>{first_name} {last_name}</Text>
                </View>
                <View className='flex-row items-center justify-between mb-5 border-b-2 border-b-white pb-3'>
                    <Text className='text-gray-500 font-JakartaMedium'>Car seats</Text>
                    <Text className='font-JakartaMedium'>{car_seats}</Text>
                </View>
                <View className='flex-row items-center justify-between mb-5'>
                    <Text className='text-gray-500 font-JakartaMedium'>Payment Status</Text>
                    <Text className={`font-JakartaMedium capitalize ${
                        payment_status === 'paid'? "text-green-500" : "text-red-500"
                    }`}>{payment_status}</Text>
                </View>
            </View>
        </View>
    )
}