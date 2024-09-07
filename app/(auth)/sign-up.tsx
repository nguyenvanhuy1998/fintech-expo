import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const SignUp = () => {
    const [countryCode, setCountryCode] = useState("+84");
    const [phoneNumber, setPhoneNumber] = useState("");
    const onSignUp = () => {};
    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
            <StatusBar style="dark" />

            <View className="flex-1 p-4 bg-background">
                <Text className="text-4xl font-JakartaBold">
                    Let's get started!
                </Text>
                <Text className="text-base mt-5 text-gray font-Jakarta">
                    Enter your phone number. We will send you a confirmation
                    code there
                </Text>
                <View className="mt-10 mb-10 flex-row">
                    <TextInput
                        className="bg-lightGray p-5 rounded-2xl text-xl mr-2 font-Jakarta"
                        placeholder="Country code"
                        placeholderTextColor={"#626D77"}
                        value={countryCode}
                    />
                    <TextInput
                        className="bg-lightGray p-5 rounded-2xl text-xl flex-1 font-Jakarta"
                        placeholder="Phone number"
                        placeholderTextColor={"#626D77"}
                        keyboardType="numeric"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>
                <Link href={"/(auth)/sign-in"} replace asChild>
                    <TouchableOpacity>
                        <Text className="text-primary-500 text-base font-JakartaMedium">
                            Already have an account? Log in
                        </Text>
                    </TouchableOpacity>
                </Link>
                <View className="flex-1" />
                <TouchableOpacity
                    disabled={!phoneNumber}
                    className={`p-3 h-[60px] rounded-full justify-center items-center mb-5 ${
                        phoneNumber ? "bg-primary-500" : "bg-primary-400"
                    }`}
                    onPress={onSignUp}
                >
                    <Text className="text-xl text-white font-JakartaMedium">
                        Sign up
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default SignUp;
