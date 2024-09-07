import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAssets } from "expo-asset";
import { videos } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const Welcome = () => {
    const [assets] = useAssets([videos.intro]);
    return (
        <View className="flex-1 justify-between">
            <StatusBar style="light" />
            {assets && (
                <Video
                    shouldPlay
                    isLooping
                    isMuted
                    resizeMode={ResizeMode.COVER}
                    source={{ uri: assets[0].uri }}
                    className="w-full h-full absolute"
                />
            )}
            {/* Title Header */}
            <View className="mt-20 p-5">
                <Text className="text-4xl font-JakartaExtraBold uppercase text-white">
                    Ready to change the way you money?
                </Text>
            </View>

            {/* Actions */}
            <View className="flex-row justify-center gap-5 mb-[60px] p-5">
                <Link
                    href={"/(auth)/sign-in"}
                    asChild
                    className="p-[10px] h-[60px] rounded-full items-center justify-center flex-1 bg-dark"
                >
                    <TouchableOpacity>
                        <Text className="text-white text-xl font-JakartaMedium">
                            Log in
                        </Text>
                    </TouchableOpacity>
                </Link>
                <Link
                    href={"/(auth)/sign-up"}
                    asChild
                    className="p-[10px] h-[60px] rounded-full items-center justify-center flex-1 bg-white"
                >
                    <TouchableOpacity>
                        <Text className="text-dark text-xl font-JakartaMedium">
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
};

export default Welcome;
