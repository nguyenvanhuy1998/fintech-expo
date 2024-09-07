import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { Fragment, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;
const VerifyPhoneNumber = () => {
    const { phone } = useLocalSearchParams<{ phone: string }>();
    const [code, setCode] = useState("");

    return (
        <View className="flex-1 bg-background p-4">
            <Text className="text-[40px] font-JakartaExtraBold ">
                6-digit code
            </Text>
            <Text className="text-xl mt-5 font-Jakarta text-gray">
                Code sent to {phone} unless you already have an account
            </Text>

            <CodeField
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                value={code}
                onChangeText={setCode}
                renderCell={({ index, symbol, isFocused }) => (
                    <Fragment key={index}>
                        <View
                            className={`w-[45px] h-[60px] bg-lightGray items-center justify-center rounded-lg ${
                                isFocused && "pb-2"
                            }`}
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
