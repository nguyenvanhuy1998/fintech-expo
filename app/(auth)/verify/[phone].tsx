import { Link, useLocalSearchParams } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;
const VerifyPhoneNumber = () => {
    const { phone, signIn } = useLocalSearchParams<{
        phone: string;
        signIn: string;
    }>();
    const [code, setCode] = useState("");
    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });

    useEffect(() => {
        if (code.length === 6) {
            signIn === "true" ? verifySignIn() : verifyCode();
        }
    }, [code]);

    const verifySignIn = () => {
        console.log("verifySignIn");
    };
    const verifyCode = () => {
        console.log("verifyCode");
    };

    return (
        <View className="flex-1 bg-background p-4">
            <Text className="text-[40px] font-JakartaExtraBold ">
                6-digit code
            </Text>
            <Text className="text-xl mt-5 font-Jakarta text-gray">
                Code sent to {phone} unless you already have an account
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

export default VerifyPhoneNumber;
