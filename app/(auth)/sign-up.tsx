import { Alert, Image, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '@/constants'
import Inputfield from '@/components/Inputfield'
import CustomButton from '@/components/CustomButton'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import OAuth from '@/components/OAuth'
import { ReactNativeModal } from "react-native-modal";
import { fetchAPI } from '@/lib/fetch'

export default function SignUp() {
    const [form,setForm] = useState({
        name:'',
        email:'',
        password:''
    })
    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: "",
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return

        // Start sign-up process using email and password provided
        try {
        await signUp.create({
            emailAddress:form.email,
            password:form.password,
        })

        // Send user an email with verification code
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

        setVerification({
            ...verification,
            state:'pending'
        })
        } catch (err:any) {
        Alert.alert('Error',err.errors[0].longMessage)
        }
    }

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return
        try {
        // Use the code the user provided to attempt verification
        const signUpAttempt = await signUp.attemptEmailAddressVerification({
            code:verification.code,
        })
        // If verification was completed, set the session to active
        if (signUpAttempt.status === 'complete') {
            // TODO : create database user !
            await fetchAPI('/(api)/user',{
                method:'POST',
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    clerkId: signUpAttempt.createdUserId
                })
            })
            await setActive({ session: signUpAttempt.createdSessionId })
            setVerification({...verification,state:'success'})
        } else {
            // If the status is not complete, check why. User may need to
            // complete further steps.
            setVerification({
                ...verification,
                state:'failed',
                error:"verification failed"
            })
        }
        } catch (err:any) {
                setVerification({
                ...verification,
                state:'failed',
                error: err.errors[0].longMessage
            })
        }
    }

    // if (verification.state==="pending") {
    //     return (
    //     <>
    //         <Text>Verify your email</Text>
    //         <TextInput
    //         value={verification.code}
    //         placeholder="Enter your verification code"
    //         onChangeText={(code) => setVerification({...verification,code})}
    //         />
    //         <TouchableOpacity onPress={onVerifyPress}>
    //         <Text>Verify</Text>
    //         </TouchableOpacity>
    //     </>
    //     )
    // }
    return (
        <SafeAreaView className='flex-1'>
            <View className='flex-1'>
                <View className='w-full h-[250px] relative'>
                    <Image source={images.signUpCar} 
                    className='w-full h-[250px] z-0'/>
                    <Text className='font-JakartaSemiBold text-2xl absolute bottom-5 left-5'>
                        Create Your Account
                    </Text>
                </View>
                <View className='p-5'>
                    <Inputfield 
                    label='Name'
                    placeholder='Enter name'
                    icon={icons.person}
                    value={form.name}
                    onChangeText={(value)=>setForm({...form,name:value})}
                    />
                    <Inputfield 
                    label='Email'
                    placeholder='Enter your Email'
                    icon={icons.email}
                    value={form.email}
                    onChangeText={(value)=>setForm({...form,email:value})}
                    />
                    <Inputfield 
                    label='Password'
                    placeholder='Enter your password'
                    icon={icons.lock}
                    value={form.password}
                    secureTextEntry={true}
                    onChangeText={(value)=>setForm({...form,password:value})}
                    />
                    <CustomButton title='Sign Up' className='mt-6'
                    onPress={onSignUpPress}/>
                    <OAuth/>
                    <Link href='/(auth)/sign-in' className='text-center text-general-200 text-lg mt-2 mb-5'>
                        Already have an account? {" "}
                        <Text className='text-primary-500'>Log in</Text>
                    </Link>
                </View>
                {/* verify */}
                <ReactNativeModal isVisible={verification.state==="pending"}
                onModalHide={()=>{
                    if(verification.state === "success") setShowSuccessModal(true)
                }}
                >
                    <View className='px-7 py-9 rounded-2xl min-h-[300px] bg-white'>
                        <Text className="font-JakartaExtraBold text-2xl mb-2">
                        Verification
                        </Text>
                        <Text className="font-Jakarta mb-5">
                        We&apos;ve sent a verification code to {form.email}.
                        </Text>
                        <Inputfield
                        label={"Code"}
                        icon={icons.lock}
                        placeholder={"12345"}
                        value={verification.code}
                        keyboardType="numeric"
                        onChangeText={(code) =>
                            setVerification({ ...verification, code })
                        }
                        />
                        {verification.error&& (
                        <Text className="text-red-500 text-sm mt-1">
                            {verification.error}
                        </Text>)}
                        <CustomButton
                        title="Verify Email"
                        onPress={onVerifyPress}
                        className="mt-5 bg-success-500"
                        />
                    </View>
                </ReactNativeModal>
                <ReactNativeModal isVisible={showSuccessModal}>
                    <View className='px-7 py-9 rounded-2xl min-h-[300px] bg-white'>
                        <Image source={images.check} className='w-[110px] h-[110px] mx-auto mt-5'/>
                        <View className='my-5'>
                            <Text className='text-center text-3xl font-JakartaBold '>Verified!</Text>
                            <Text className='text-center text-base text-gray-400 font-Jakarta mt-2'>
                                You have successfully verified your account.
                                </Text>
                        </View>
                        <CustomButton title='Browse Home'
                        onPress={()=>{
                            setShowSuccessModal(false)
                            router.push('/(root)/(tabs)/Home')
                            }}/>
                    </View>
                </ReactNativeModal>
            </View>
        </SafeAreaView>
    )
}