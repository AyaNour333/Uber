import { icons } from '@/constants'
import { router } from 'expo-router'
import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import Map from './Map'

export default function RideLayout({title,snapPoints,children}
    :{title:string,snapPoints?:string[],children:React.ReactNode}) {
    const bottomSheetRef = useRef<BottomSheet>(null)
    return (
        <GestureHandlerRootView>
            <View className='bg-white flex-1'>
                <View className='h-screen bg-blue-500'>
                    <View className='flex-row absolute z-10 top-16 items-center justify-start px-5'>
                        <TouchableOpacity onPress={()=>router.back()}
                            className="w-10 h-10 bg-white rounded-full items-center justify-center"
                        >
                            <Image source={icons.backArrow}
                            className='w-6 h-6'
                            resizeMode='contain'
                            />
                        </TouchableOpacity>
                        <Text className='text-xl font-JakartaSemiBold ml-5'>
                            {title||'Go Back'}
                        </Text>
                    </View>
                    <Map/>
                </View>
                <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints || ["40%", "85%"]}    //{snapPoints || ['40%','85%']} for iphone
                keyboardBehavior='extend'
                index={0}
                >
                    <BottomSheetView style={{
                        flex: 1,
                        padding: 20,
                    }}>
                        {children}
                    </BottomSheetView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    )
}