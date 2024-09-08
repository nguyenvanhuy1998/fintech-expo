import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
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

const SignUp = () => {
    const [email, setEmail] = useState("");

    const { isLoaded, signUp } = useSignUp();
    const onSignUp = async () => {
        if (!isLoaded) {
            return;
        }
        try {
            await signUp.create({
                emailAddress: email,
            });
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });
            router.push({
                pathname: "/verify/[email]",
                params: {
                    email,
                },
            });
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert("Error", err.errors[0].longMessage);
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
                <Text className="text-4xl font-JakartaBold">
                    Let's get started!
                </Text>
                <Text className="text-base mt-5 text-gray font-Jakarta">
                    Enter your phone number. We will send you a confirmation
                    code there
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
                <Link href={"/(auth)/sign-in"} replace asChild>
                    <TouchableOpacity>
                        <Text className="text-primary-500 text-base font-JakartaMedium text-center">
                            Already have an account? Log in
                        </Text>
                    </TouchableOpacity>
                </Link>
                <View className="flex-1" />
                <TouchableOpacity
                    disabled={!email}
                    className={`p-3 h-[60px] rounded-full justify-center items-center mb-5 ${
                        email ? "bg-primary-500" : "bg-primary-400"
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
