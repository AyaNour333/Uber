import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFetch } from '@/lib/fetch'
import { Ride } from '@/types/type'
import RideCard from '@/components/RideCard'
import { images } from '@/constants'
import { useUser } from '@clerk/clerk-expo'

export default function Rides() {
    const { user } = useUser()
    const {data:recentRides , loading } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`)
    return (
        <SafeAreaView className='bg-general-500'>
            <FlatList data={recentRides as Ride[]} 
            renderItem={({item})=><RideCard key={item.driver_id} {...item}/>}
            className='px-5'
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={{
                paddingBottom: 100
            }}
            ListEmptyComponent={()=>(
                <View className='flex-row items-center justify-center'>
                    {!loading ? 
                    <View>
                        <Image
                        source={images.noResult} 
                        className='w-40 h-40' 
                        alt='no recent rides found'
                        resizeMode='contain'
                        />
                        <Text>No recent rides found</Text>
                    </View>
                    :<ActivityIndicator size='small' color='#000' className='mt-5'/>
                    }
                </View>
            )}
            ListHeaderComponent={()=>(
                <>
                <Text className='my-5 text-2xl font-JakartaBold'>All Rides</Text>
                </>
            )}
            />
        </SafeAreaView>
    )
}