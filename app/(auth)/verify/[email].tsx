import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;
const VerifyEmail = () => {
    const { email, signIn } = useLocalSearchParams<{
        email: string;
        signIn: string;
    }>();
    const [code, setCode] = useState("");
    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });
    const { isLoaded, signUp, setActive } = useSignUp();

    useEffect(() => {
        if (code.length === 6) {
            signIn === "true" ? verifySignIn() : verifyCode();
        }
    }, [code]);

    const verifySignIn = () => {
        console.log("verifySignIn");
    };
    const verifyCode = async () => {
        if (!isLoaded) {
            return;
        }
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification(
                {
                    code: code,
                }
            );
            if (completeSignUp.status === "complete") {
                await setActive({
                    session: completeSignUp.createdSessionId,
                });
                router.replace("/(root)/(tabs)/home");
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
            }
        } catch (err) {
            console.log(JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert("Error", err.errors[0].longMessage);
            }
        }
    };

    return (
        <View className="flex-1 bg-background p-4">
            <Text className="text-[40px] font-JakartaExtraBold ">
                6-digit code
            </Text>
            <Text className="text-xl mt-5 font-Jakarta text-gray">
                Code sent to {email} unless you already have an account
            </Text>

            <CodeField
                ref={ref}
                {...props}
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Fragment key={index}>
                        <View
                            className={`w-[45px] h-[60px] bg-lightGray items-center justify-center rounded-lg ${
                                isFocused && "pb-2"
                            }`}
                            onLayout={getCellOnLayoutHandler(index)}
                        >
                            <Text className="text-4xl text-dark text-center font-Jakarta">
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        </View>
                        {index === 2 ? (
                            <View
                                key={`separator-${index}`}
                                className="h-0.5 w-2.5 bg-gray self-center"
                            />
                        ) : null}
                    </Fragment>
                )}
            />
            <Link href={"/(auth)/sign-in"} replace asChild>
                <TouchableOpacity>
                    <Text className="text-lg mt-5 text-primary-500 font-JakartaMedium">
                        Already have an account? Log in
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    codeFieldRoot: {
        marginVertical: 20,
        marginLeft: "auto",
        marginRight: "auto",
        gap: 12,
    },
});

export default VerifyEmail;
