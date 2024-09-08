import { Ionicons } from "@expo/vector-icons";
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

enum SignInType {
    Email,
    Google,
    Apple,
}
const SignIn = () => {
    const [email, setEmail] = useState("");

    const onSignIn = (type: SignInType) => {
        if (type === SignInType.Email) {
            console.log("Login Email");
        }
    };
    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
            <StatusBar style="dark" />

            <View className="flex-1 p-4 bg-background">
                <Text className="text-4xl font-JakartaBold">Welcome back</Text>
                <Text className="text-base mt-5 text-gray font-Jakarta">
                    Enter the email associated with your account
                </Text>
                <TextInput
                    className="bg-lightGray p-5 rounded-2xl text-xl mr-2 font-Jakarta mt-10 mb-4"
                    placeholder="Enter email"
                    keyboardType="email-address"
                    placeholderTextColor={"#626D77"}
                    value={email}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                />
                <TouchableOpacity
                    disabled={!email}
                    className={`p-3 h-[60px] rounded-full justify-center items-center mb-5 ${
                        email ? "bg-primary-500" : "bg-primary-400"
                    }`}
                    onPress={() => onSignIn(SignInType.Email)}
                >
                    <Text className="text-xl text-white font-JakartaMedium">
                        Continue
                    </Text>
                </TouchableOpacity>
                <View className="flex-row items-center gap-4">
                    <View className={`flex-1 h-[1px] bg-gray`} />
                    <Text className="text-xl text-gray font-Jakarta">or</Text>
                    <View className={`flex-1 h-[1px] bg-gray`} />
                </View>

                <TouchableOpacity
                    onPress={() => onSignIn(SignInType.Google)}
                    style={{
                        gap: 16,
                    }}
                    className="bg-white p-[10px] rounded-full mt-5 h-[60px] flex flex-row items-center justify-center"
                >
                    <Ionicons name="logo-google" size={24} color={"#000"} />
                    <Text className="text-dark text-base font-JakartaMedium">
                        Continue with Google
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onSignIn(SignInType.Apple)}
                    style={{
                        gap: 16,
                    }}
                    className="bg-white p-[10px] rounded-full mt-5 h-[60px] flex flex-row items-center justify-center"
                >
                    <Ionicons name="logo-apple" size={24} color={"#000"} />
                    <Text className="text-dark text-base font-JakartaMedium">
                        Continue with Apple
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default SignIn;
