import { View, Text, Image, Alert } from 'react-native'
import React, { useCallback } from 'react'
import CustomButton from './CustomButton'
import * as AuthSession from 'expo-auth-session'
import { icons } from '@/constants'
import { useSSO } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import { fetchAPI } from '@/lib/fetch'

export default function OAuth() {
    const { startSSOFlow } = useSSO()
    const handleGoogleSignIn = useCallback(async () => {
            try {
            const { createdSessionId, setActive, signUp } = await startSSOFlow({
                strategy: 'oauth_google',
                redirectUrl: AuthSession.makeRedirectUri({
                    scheme: "uber-clone",
                    path: '/(root)/(tabs)/Home.tsx'
                }),
            })

            if (createdSessionId && setActive) {
                setActive({session: createdSessionId,})
                if(signUp?.createdUserId){
                    await fetchAPI('/(api)/user',{
                        method:"POST",
                        body:JSON.stringify({
                            name: `${signUp.firstName} ${signUp.lastName}`,
                            email: signUp.emailAddress,
                            clerkId: signUp.createdUserId,
                        })
                    })
                } 
                return (
                    router.push('/(root)/(tabs)/Home')
                ) 
            }
        }catch(err){
            console.error("OAuth Error:", JSON.stringify(err, null, 2));
        }
    }, [startSSOFlow])
    return (
    <View>
        <View className='flex-row items-center justify-center mt-4 gap-x-3'>
            <View className='flex-1 h-[1px] bg-general-100'></View>
            <Text className=''>Or</Text>
            <View className='flex-1 h-[1px] bg-general-100'></View>
        </View>
        <CustomButton 
        title='Log In with Google' 
        className='mt-5 shadow-none'
        IconLeft={()=>(
            <Image source={icons.google} className='w-5 h-5 mx-2' resizeMode='contain'/>
        )} 
        bgVariant='outline'
        textVariant='primary'
        onPress={handleGoogleSignIn}
        />
    </View>
    )
}