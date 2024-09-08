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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export interface FormData {
    email: string;
    password: string;
}
const SignUp = () => {
    const [form, setForm] = useState<FormData>({
        email: "",
        password: "",
    });
    const { isLoaded, signUp } = useSignUp();
    const onSignUp = async () => {
        if (!isLoaded) {
            return;
        }
        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            });
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });
            router.push({
                pathname: "/verify/[email]",
                params: {
                    email: form.email,
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
        <KeyboardAwareScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                flexGrow: 1,
            }}
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

                <Link href={"/(auth)/sign-in"} replace asChild>
                    <TouchableOpacity>
                        <Text className="text-primary-500 mb-5 text-base font-JakartaMedium text-center">
                            Already have an account? Log in
                        </Text>
                    </TouchableOpacity>
                </Link>

                <TouchableOpacity
                    className={`p-3 h-[60px] rounded-full justify-center items-center mb-5 bg-primary-500`}
                    onPress={onSignUp}
                >
                    <Text className="text-xl text-white font-JakartaMedium">
                        Sign up
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default SignUp;
