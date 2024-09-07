import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="welcome"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="sign-in"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="sign-up"
                options={{
                    title: "",
                    headerBackTitle: "",
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "#F5F5F5",
                    },
                    headerLeft: () => {
                        return (
                            <TouchableOpacity onPress={router.back}>
                                <Ionicons
                                    name="arrow-back"
                                    size={34}
                                    color={"#141518"}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />
        </Stack>
    );
};

export default Layout;
