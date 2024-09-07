import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router, Stack } from "expo-router";
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
                    headerRight: () => {
                        return (
                            <Link href={"/(auth)/help"} asChild>
                                <TouchableOpacity>
                                    <Ionicons
                                        name="help-circle-outline"
                                        size={34}
                                        color={"#141518"}
                                    />
                                </TouchableOpacity>
                            </Link>
                        );
                    },
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
            <Stack.Screen
                name="help"
                options={{
                    title: "Help",
                    presentation: "modal",
                }}
            />
        </Stack>
    );
};

export default Layout;
