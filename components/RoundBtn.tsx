import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    icon: typeof Ionicons.defaultProps;
    text: string;
    onPress?: () => void;
};

const RoundBtn = ({ icon, text, onPress }: Props) => {
    return (
        <TouchableOpacity className="items-center gap-2.5" onPress={onPress}>
            <View className="w-[60px] h-[60px] bg-lightGray items-center justify-center rounded-[30px]">
                <Ionicons name={icon} size={30} color={"#141518"} />
            </View>
            <Text className="text-base font-JakartaMedium text-dark">
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default RoundBtn;
