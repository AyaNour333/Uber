import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Image, TextInput, Platform, Keyboard } from 'react-native'
import React from 'react'
import { InputFieldProps } from '@/types/type'

export default function Inputfield({
    label,
    labelStyle,
    icon,
    iconStyle,
    secureTextEntry=false,
    inputStyle,
    containerStyle,
    className,
    ...props
}:InputFieldProps) {
    return (
        <KeyboardAvoidingView behavior={Platform.OS==="ios"?'padding':'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className='w-full my-2'>
                    <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
                        {label}
                    </Text>
                    <View className={`flex-row justify-start items-center rounded-full relative
                    bg-neutral-100 border border-neutral-100 focus:border-primary-500
                    ${containerStyle}`}>
                        {icon&&(
                            <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`}/>
                        )}
                        <TextInput className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
                        secureTextEntry={secureTextEntry} {...props}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}