import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";

const CustomHeader = () => {
    const { top } = useSafeAreaInsets();
    return (
        <BlurView
            intensity={80}
            tint="extraLight"
            style={{
                paddingTop: top,
                paddingBottom: 10,
            }}
        >
            <View className="flex flex-row items-center justify-center h-[60px] gap-2.5 px-5 bg-transparent">
                <TouchableOpacity className="w-10 h-10 rounded-[20px] bg-gray items-center justify-center">
                    <Text className="text-white font-JakartaMedium text-base">
                        SG
                    </Text>
                </TouchableOpacity>
                <View className="flex flex-row flex-1 items-center justify-center bg-lightGray rounded-full">
                    <Ionicons
                        style={{
                            padding: 10,
                        }}
                        name="search"
                        size={20}
                        color={Colors.dark}
                    />
                    <TextInput
                        className="flex flex-1 p-2.5 pl-0 bg-lightGray text-dark rounded-full"
                        placeholder="Search"
                        placeholderTextColor={Colors.dark}
                    />
                </View>
                <View className="w-10 h-10 rounded-full bg-lightGray items-center justify-center">
                    <Ionicons
                        name="stats-chart"
                        size={20}
                        color={Colors.dark}
                    />
                </View>
                <View className="w-10 h-10 rounded-full bg-lightGray items-center justify-center">
                    <Ionicons name="card" size={20} color={Colors.dark} />
                </View>
            </View>
        </BlurView>
    );
};

export default CustomHeader;
