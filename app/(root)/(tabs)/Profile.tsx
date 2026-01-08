import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUser } from '@clerk/clerk-expo'
import Inputfield from '@/components/Inputfield'

export default function Profile() {
    const {user} = useUser()
    return (
        <SafeAreaView className='bg-[#F6F8FA]'>
            <ScrollView 
            className="px-5"
            contentContainerStyle={{ paddingBottom: 120 }}
            >
                <Text className='text-2xl font-JakartaBold my-5'>Your Profile</Text>
                <View className='justify-center items-center my-8'>
                    <Image 
                    source={{
                        uri:user?.imageUrl
                    }} 
                    className='w-[100px] h-[100px] rounded-full'
                    />
                </View>
                <View className='px-5 py-3 items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300'>
                    <Inputfield
                    label='First name'
                    placeholder={user?.firstName || "Not Found"}
                    containerStyle='w-full'
                    inputStyle='p-3.5'
                    editable={false}
                    />
                    <Inputfield
                    label='Last name'
                    placeholder={user?.lastName || "Not Found"}
                    containerStyle='w-full'
                    inputStyle='p-3.5'
                    editable={false}
                    />
                    <Inputfield
                    label='Email'
                    placeholder={user?.primaryEmailAddress?.emailAddress || "Not Found"}
                    containerStyle='w-full'
                    inputStyle='p-3.5'
                    editable={false}
                    />
                    <Inputfield
                    label='Phone number'
                    placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
                    containerStyle='w-full'
                    inputStyle='p-3.5'
                    editable={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}