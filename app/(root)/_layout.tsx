import { Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="crypto/[id]"
                options={{
                    title: "",
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons
                                name="arrow-back"
                                size={34}
                                color={Colors.dark}
                            />
                        </TouchableOpacity>
                    ),
                    headerLargeTitle: true,
                    headerTransparent: true,
                    headerRight: () => (
                        <View className="flex flex-row gap-2.5">
                            <TouchableOpacity>
                                <Ionicons
                                    name="notifications-outline"
                                    color={Colors.dark}
                                    size={30}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons
                                    name="star-outline"
                                    color={Colors.dark}
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
        </Stack>
    );
};

export default Layout;
