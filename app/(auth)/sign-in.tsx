import { Image, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '@/constants'
import Inputfield from '@/components/Inputfield'
import CustomButton from '@/components/CustomButton'
import { Link, useRouter } from 'expo-router'
import OAuth from '@/components/OAuth'
import { useSignIn } from '@clerk/clerk-expo'

export default function SignIn() {
    const [form,setForm] = useState({
        email:'',
        password:''
    })
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const onSignInPress = async () => {
        if (!isLoaded) return

        try {
        const signInAttempt = await signIn.create({
            identifier: form.email,
            password: form.password,
        })

        if (signInAttempt.status === 'complete') {
            await setActive({ session: signInAttempt.createdSessionId })
            router.replace('/(root)/(tabs)/Home')
        } 
    
        else {
            console.error(JSON.stringify(signInAttempt, null, 2))
        }
        } catch (err) {
        console.error(JSON.stringify(err, null, 2))
        }
    }
    return (
        <SafeAreaView className='flex-1'>
            <View className='flex-1'>
                <View className='w-full h-[250px] relative'>
                    <Image source={images.signUpCar} 
                    className='w-full h-[250px] z-0'/>
                    <Text className='font-JakartaSemiBold text-2xl absolute bottom-5 left-5'>
                        Welcome 👋
                    </Text>
                </View>
                <View className='p-5'>
                    <Inputfield 
                    label='Email'
                    placeholder='Enter your Email'
                    icon={icons.email}
                    value={form.email}
                    onChangeText={(value)=>setForm({...form,email:value.trim()})}
                    />
                    <Inputfield 
                    label='Password'
                    placeholder='Enter your password'
                    icon={icons.lock}
                    value={form.password}
                    secureTextEntry={true}
                    onChangeText={(value)=>setForm({...form,password:value})}
                    />
                    <CustomButton title='Sign In' className='mt-6'
                    onPress={onSignInPress}/>
                    <OAuth/>
                    <Link href='/(auth)/sign-up' className='text-center text-general-200 text-lg mt-7'>
                        <Text>Don&apos;t have an account? {" "}</Text>
                        <Text className='text-primary-500'>Sign Up</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    )
}