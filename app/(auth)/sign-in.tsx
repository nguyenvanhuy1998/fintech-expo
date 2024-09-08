import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { FormData } from "./sign-up";

enum SignInType {
    Email,
    Google,
    Apple,
}
const SignIn = () => {
    const [form, setForm] = useState<FormData>({
        email: "",
        password: "",
    });
    const { signIn, isLoaded, setActive } = useSignIn();
    const onSignIn = async (type: SignInType) => {
        if (!isLoaded) {
            return;
        }
        if (type === SignInType.Email) {
            try {
                const signInAttempt = await signIn.create({
                    identifier: form.email,
                    password: form.password,
                });
                if (signInAttempt.status === "complete") {
                    await setActive({
                        session: signInAttempt.createdSessionId,
                    });
                    router.replace("/(root)/(tabs)/home");
                } else {
                    console.error(JSON.stringify(signInAttempt, null, 2));
                }
            } catch (error) {
                console.error(JSON.stringify(error, null, 2));
                if (isClerkAPIResponseError(error)) {
                    Alert.alert("Error", error.errors[0].longMessage);
                }
            }
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
                <View className="mt-5 mb-5">
                    <TextInput
                        className="bg-lightGray p-5 rounded-2xl text-xl mr-2 font-Jakarta mb-4"
                        placeholder="Enter email"
                        keyboardType="email-address"
                        placeholderTextColor={"#626D77"}
                        value={form.email}
                        autoCapitalize="none"
                        onChangeText={(value) =>
                            setForm({
                                ...form,
                                email: value,
                            })
                        }
                    />
                    <TextInput
                        className="bg-lightGray p-5 rounded-2xl text-xl mr-2 font-Jakarta mb-4"
                        placeholder="Enter password"
                        placeholderTextColor={"#626D77"}
                        value={form.password}
                        autoCapitalize="none"
                        secureTextEntry
                        onChangeText={(value) =>
                            setForm({
                                ...form,
                                password: value,
                            })
                        }
                    />
                </View>
                <TouchableOpacity
                    className={`p-3 h-[60px] rounded-full justify-center items-center mb-5 bg-primary-500`}
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
