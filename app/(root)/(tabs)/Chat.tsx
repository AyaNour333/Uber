import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '@/constants'
import { router } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function Chat() {
    const { signOut } = useAuth()
    const handleSignOut = ()=>{
        signOut()
        router.replace('/(auth)/sign-in')
    }
    return (
        <SafeAreaView className='px-5 flex-1'>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className='mt-5 flex-row items-center justify-between'>
                    <Text className='font-JakartaBold text-2xl capitalize'>
                        Chat List
                    </Text>
                    <TouchableOpacity onPress={handleSignOut} 
                    className='bg-white justify-center items-center w-10 h-10 rounded-full'>
                        <Image source={icons.out} className='w-4 h-4'/>
                    </TouchableOpacity>
                </View>
                <View className='justify-center items-center flex-1 h-full'>
                    <Image 
                    source={images.message} 
                    className='w-full h-40'
                    resizeMode='contain'
                    />
                    <Text className="text-3xl font-JakartaBold mt-3">
                        No Messages Yet
                    </Text>
                    <Text className="text-base mt-2 text-center px-7">
                        Start a conversation with your friends and family
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}