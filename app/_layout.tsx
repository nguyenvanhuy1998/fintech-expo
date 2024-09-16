import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { tokenCache } from "@/lib/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserInactivityProvider } from "@/context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const queryClient = new QueryClient();

const InitialLayout = () => {
    const [loaded] = useFonts({
        "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
        "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
        "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
        "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
        "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
        Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
        "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!publishableKey) {
        throw new Error(
            "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
        );
    }
    if (!loaded) {
        return null;
    }
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="(auth)"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="(root)"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
};

export default function RootLayout() {
    return (
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            <QueryClientProvider client={queryClient}>
                <ClerkLoaded>
                    <UserInactivityProvider>
                        <GestureHandlerRootView className="flex-1">
                            <InitialLayout />
                        </GestureHandlerRootView>
                    </UserInactivityProvider>
                </ClerkLoaded>
            </QueryClientProvider>
        </ClerkProvider>
    );
}
