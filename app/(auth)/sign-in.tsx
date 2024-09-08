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
    Phone,
    Email,
    Google,
    Apple,
}
const SignIn = () => {
    const [countryCode, setCountryCode] = useState("+84");
    const [phoneNumber, setPhoneNumber] = useState("");
    const onSignIn = (type: SignInType) => {};
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
                    Enter the phone number associated with your account
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
                <TouchableOpacity
                    disabled={!phoneNumber}
                    className={`p-3 h-[60px] rounded-full justify-center items-center mb-5 ${
                        phoneNumber ? "bg-primary-500" : "bg-primary-400"
                    }`}
                    onPress={() => onSignIn(SignInType.Phone)}
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
                    onPress={() => onSignIn(SignInType.Email)}
                    style={{
                        gap: 16,
                    }}
                    className="bg-white p-[10px] rounded-full mt-5 h-[60px] flex flex-row items-center justify-center"
                >
                    <Ionicons name="mail" size={24} color={"#000"} />
                    <Text className="text-dark text-base font-JakartaMedium">
                        Continue with Email
                    </Text>
                </TouchableOpacity>
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
