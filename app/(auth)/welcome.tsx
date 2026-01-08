import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Swiper from 'react-native-swiper'
import { onboarding } from '../../constants'
import CustomButton from '@/components/CustomButton'

export default function Welcome() {
    const swiperRef = useRef<Swiper>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const isLastSlide = activeIndex === onboarding.length-1 ? true:false
    return (
        <SafeAreaView className='flex h-full items-center justify-between'>
            <TouchableOpacity onPress={()=>{
                router.replace('/(auth)/sign-up')
            }} className='w-full items-end justify-end p-5'>
                <Text className='text-md font-JakartaBold'>Skip</Text>
            </TouchableOpacity>
            <Swiper 
            ref={swiperRef}
            loop={false} 
            dot={<View className='w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full'/>}
            activeDot={<View className='w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full'/>}
            onIndexChanged={(index)=>setActiveIndex(index)}
            >
                {onboarding.map(item=>(
                    <View key={item.id} className='flex justify-center items-center p-5'>
                        <Image 
                        source={item.image} resizeMode='contain'
                        className='w-full h-[300px]'/>
                        <View className='mt-10 flex items-center justify-center'>
                            <Text className='text-3xl font-bold mx-10 text-center'>
                                {item.title}
                            </Text>
                            <Text className='font-JakartaSemiBold text-center text-[#858585] text-lg 
                            mt-3 mx-10'>
                                {item.description}
                            </Text>
                        </View>
                    </View>
                ))}
            </Swiper>
            <CustomButton title={isLastSlide?'Get started':"Next"} className='w-11/12 mt-10'
            onPress={()=>isLastSlide? 
                router.replace('/(auth)/sign-up')
                :swiperRef.current?.scrollBy(1)
            }/>
        </SafeAreaView>
    )
}