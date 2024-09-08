import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

const LifeStyle = () => {
    const { signOut } = useAuth();
    const onSignOut = () => {
        signOut();
        router.replace("/(auth)/sign-in");
    };
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={onSignOut}>
                <Text>Log out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default LifeStyle;
