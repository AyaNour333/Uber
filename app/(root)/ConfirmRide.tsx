import { View, FlatList } from 'react-native'
import React from 'react'
import RideLayout from '@/components/RideLayout'
import DriverCard from '@/components/DriverCard'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { useDriverStore } from '@/store'

export default function ConfirmRide() {
    const {drivers,selectedDriver,setSelectedDriver} = useDriverStore()
    return (
        <RideLayout title='Choose a Rider' snapPoints={['65%','85%']}>
            <FlatList 
            data={drivers} 
            renderItem={({item})=><DriverCard selected={selectedDriver!} item={item} 
            setSelected={()=>setSelectedDriver(+item.id)}/>}
            ListFooterComponent={()=>(
                <View className='mt-10 mx-5'>
                    <CustomButton 
                    title='Select Ride'
                    onPress={()=>router.push('/(root)/BookRide')}
                    />
                </View>
            )}
            />
        </RideLayout>
    )
}