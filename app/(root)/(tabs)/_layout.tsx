import { icons } from '@/constants'
import { Tabs } from 'expo-router'
import { Image, ImageSourcePropType, View } from 'react-native'

const TabIcon = ({source,focused}:{source:ImageSourcePropType,focused:boolean})=>(
    <View className={`justify-center items-center rounded-full w-12 h-12
    ${focused? `bg-general-400`:``}`}>
        <Image 
        source={source}
        className='w-7 h-7'
        resizeMode='contain'
        />
    </View>
)
export default function Layout() {
    return (
        <Tabs initialRouteName='Home'
        screenOptions={{
            tabBarActiveTintColor:"white",
            tabBarInactiveTintColor:"white",
            tabBarShowLabel:false,
            tabBarStyle:{
                backgroundColor: "#333333",
                borderRadius: 50,
                overflow: "hidden",
                marginHorizontal: 20,
                marginBottom: 40,
                height: 78,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                paddingBottom:30
            },
        }}
        >
            <Tabs.Screen 
            name='Home' 
            options={{
                title:"Home",
                headerShown:false,
                tabBarIcon:({focused})=><TabIcon focused={focused}
                source={icons.home}/>
            }}/>
            <Tabs.Screen 
            name='Rides' 
            options={{
                title:"Rides",
                headerShown:false,
                tabBarIcon:({focused})=><TabIcon focused={focused}
                source={icons.list}/>
            }}/>
            <Tabs.Screen 
            name='Chat' 
            options={{
                title:"Chat",
                headerShown:false,
                tabBarIcon:({focused})=><TabIcon focused={focused}
                source={icons.chat}/>
            }}/>
            <Tabs.Screen 
            name='Profile' 
            options={{
                title:"Profile",
                headerShown:false,
                tabBarIcon:({focused})=><TabIcon focused={focused}
                source={icons.profile}/>
            }}/>
        </Tabs>
    )
}