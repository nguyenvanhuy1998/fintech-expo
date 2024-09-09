import { View, Text } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";

const CustomHeader = () => {
    const { top } = useSafeAreaInsets();
    return (
        <BlurView
            style={{
                paddingTop: top,
            }}
        >
            <View></View>
        </BlurView>
    );
};

export default CustomHeader;
