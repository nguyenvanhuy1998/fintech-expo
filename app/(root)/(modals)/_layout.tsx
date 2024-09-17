import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="lock"
                options={{
                    headerShown: false,
                    animation: "none",
                }}
            />
            <Stack.Screen
                name="account"
                options={{
                    presentation: "transparentModal",
                    animation: "fade",
                    title: "",
                    headerTransparent: true,
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="close-outline"
                                size={34}
                                color={"#fff"}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    );
};

export default Layout;
