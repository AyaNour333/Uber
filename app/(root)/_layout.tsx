import { Stack } from 'expo-router'

export default function Layout() {
    return (
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="FindRide" options={{ headerShown: false }} />
            <Stack.Screen name="ConfirmRide" options={{ headerShown: false }} />
            <Stack.Screen name="BookRide" options={{ headerShown: false }} />
        </Stack>
    )
}