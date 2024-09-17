import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { router } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

const codeLength = Array(6).fill(0);
const OFFSET = 20;
const TIME = 80;
const Lock = () => {
    const { user } = useUser();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [code, setCode] = useState<number[]>([]);
    const offset = useSharedValue(0);
    const animatedCodeStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: offset.value }],
        };
    });

    useEffect(() => {
        if (code.length === 6) {
            if (code.join("") === "111111") {
                router.replace("/(root)/(tabs)/home");
                setCode([]);
            } else {
                // TODO: ERROR
                offset.value = withSequence(
                    withTiming(-OFFSET, { duration: TIME / 2 }),
                    withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
                    withTiming(0, { duration: TIME / 2 })
                );
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error
                );
                setCode([]);
            }
        }
    }, [code]);

    const onNumberPress = (num: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setCode([...code, num]);
    };
    const onBiometricAuthPress = async () => {
        const { success } = await LocalAuthentication.authenticateAsync();
        console.log({ success });
        if (success) {
            router.replace("/(root)/(tabs)/home");
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    };
    const numberBackSpace = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setCode(code.slice(0, -1));
    };
    return (
        <SafeAreaView>
            <Text className="text-2xl font-JakartaBold mt-[80px] self-center">
                Welcome back, {firstName}
            </Text>
            <Animated.View
                className="flex flex-row justify-center items-center my-[100px]"
                style={[
                    {
                        gap: 20,
                    },
                    animatedCodeStyle,
                ]}
            >
                {codeLength.map((_, index) => (
                    <View
                        key={index}
                        className={`w-5 h-5 rounded-full ${
                            code[index] ? "bg-primary-500" : "bg-lightGray"
                        }`}
                    />
                ))}
            </Animated.View>

            <View
                className="mx-[80px]"
                style={{
                    gap: 60,
                }}
            >
                <View className="flex flex-row justify-between">
                    {[1, 2, 3].map((number) => (
                        <TouchableOpacity
                            key={number}
                            onPress={() => onNumberPress(number)}
                        >
                            <Text className="text-[32px] font-Jakarta text-dark">
                                {number}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className="flex flex-row justify-between">
                    {[4, 5, 6].map((number) => (
                        <TouchableOpacity
                            key={number}
                            onPress={() => onNumberPress(number)}
                        >
                            <Text className="text-[32px] font-Jakarta text-dark">
                                {number}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className="flex flex-row justify-between">
                    {[7, 8, 9].map((number) => (
                        <TouchableOpacity
                            key={number}
                            onPress={() => onNumberPress(number)}
                        >
                            <Text className="text-[32px] font-Jakarta text-dark">
                                {number}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className="flex flex-row justify-between items-center">
                    <TouchableOpacity onPress={onBiometricAuthPress}>
                        <MaterialCommunityIcons
                            name="face-recognition"
                            size={26}
                            color={Colors.dark}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onNumberPress(0)}>
                        <Text className="text-[32px] font-Jakarta text-dark">
                            0
                        </Text>
                    </TouchableOpacity>
                    <View className="min-w-[30px]">
                        {code.length > 0 && (
                            <TouchableOpacity onPress={numberBackSpace}>
                                <MaterialCommunityIcons
                                    name="backspace-outline"
                                    size={26}
                                    color={Colors.dark}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <Text className="self-center text-lg font-JakartaMedium text-primary-500">
                    Forgot your passcode?
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Lock;
