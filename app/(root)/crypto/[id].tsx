import {
    View,
    Text,
    SectionList,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { defaultStyles } from "../../../constants/styles";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import { format } from "date-fns";
import * as Haptics from "expo-haptics";
import Animated, {
    SharedValue,
    useAnimatedProps,
} from "react-native-reanimated";

const categories = ["Overview", "News", "Orders", "Transactions"];
// Animated.addWhitelistedNativeProps({
//     text: true,
// });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
    return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}

const CryptoDetail = () => {
    const { id } = useLocalSearchParams();
    const headerHeight = useHeaderHeight();
    const [activeIndex, setActiveIndex] = useState(0);
    const font = useFont(
        require("@/assets/fonts/PlusJakartaSans-Regular.ttf"),
        12
    );
    const { state, isActive } = useChartPressState({
        x: 0,
        y: {
            price: 0,
        },
    });
    const animatedPriceText = useAnimatedProps(() => {
        return {
            text: `${state.y.price.value.value.toFixed(2)} €`,
            defaultValue: "",
        };
    });
    const animatedDateText = useAnimatedProps(() => {
        const date = new Date(state.x.value.value);
        return {
            text: date.toLocaleDateString(),
            defaultValue: "",
        };
    });

    useEffect(() => {
        console.log({ isActive });
        if (isActive) {
            Haptics.selectionAsync();
        }
    }, [isActive]);

    const { data } = useQuery({
        queryKey: ["info", id],
        queryFn: async () => {
            const info = await fetch(`/api/info?ids=${id}`).then((res) =>
                res.json()
            );
            return info[+id];
        },
    });
    const { data: tickers } = useQuery({
        queryKey: ["tickers"],
        queryFn: async (): Promise<any[]> =>
            fetch(`/api/tickers`).then((res) => res.json()),
    });
    return (
        <>
            <Stack.Screen options={{ title: data?.name }} />
            <SectionList
                style={{
                    marginTop: headerHeight,
                }}
                contentInsetAdjustmentBehavior="automatic"
                sections={[{ data: [{ title: "Chart" }] }]}
                keyExtractor={(item) => item.title}
                renderSectionHeader={() => (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: Colors.background,
                            paddingHorizontal: 16,
                            paddingBottom: 8,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            borderBottomColor: Colors.lightGray,
                        }}
                    >
                        {categories.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setActiveIndex(index)}
                                style={
                                    activeIndex === index
                                        ? styles.categoriesBtnActive
                                        : styles.categoriesBtn
                                }
                            >
                                <Text
                                    style={
                                        activeIndex === index
                                            ? styles.categoryTextActive
                                            : styles.categoryText
                                    }
                                    className="font-Jakarta"
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
                ListHeaderComponent={() => (
                    <>
                        <View className="flex flex-row justify-between items-center mx-4">
                            <Text className="text-xl font-JakartaBold mb-5 text-gray">
                                {data?.symbol}
                            </Text>
                            <Image
                                source={{ uri: data?.logo }}
                                className="w-[60px] h-[60px]"
                            />
                        </View>

                        <View
                            style={{
                                gap: 10,
                            }}
                            className="flex flex-row m-3 "
                        >
                            <TouchableOpacity
                                style={[
                                    defaultStyles.pillButtonSmall,
                                    {
                                        gap: 10,
                                    },
                                ]}
                                className="bg-primary-500 flex flex-row"
                            >
                                <Ionicons
                                    name="add"
                                    size={24}
                                    color={"white"}
                                />
                                <Text
                                    style={defaultStyles.buttonText}
                                    className="font-JakartaMedium"
                                >
                                    Buy
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    defaultStyles.pillButtonSmall,
                                    {
                                        gap: 10,
                                    },
                                ]}
                                className="bg-primary-400 flex flex-row"
                            >
                                <Ionicons
                                    name="arrow-back"
                                    size={24}
                                    color={Colors.primary}
                                />
                                <Text
                                    style={[
                                        defaultStyles.buttonText,
                                        {
                                            color: Colors.primary,
                                        },
                                    ]}
                                    className="font-JakartaMedium"
                                >
                                    Receive
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                renderItem={({ item }) => (
                    <>
                        <View style={defaultStyles.block} className="h-[500px]">
                            {tickers && (
                                <>
                                    {!isActive && (
                                        <View>
                                            <Text className="text-3xl font-JakartaBold text-dark">
                                                {tickers[
                                                    tickers.length - 1
                                                ].price.toFixed(2)}
                                                €
                                            </Text>
                                            <Text className="text-lg font-Jakarta text-gray">
                                                Today
                                            </Text>
                                        </View>
                                    )}
                                    {isActive && (
                                        <View>
                                            <AnimatedTextInput
                                                editable={false}
                                                underlineColorAndroid={
                                                    "transparent"
                                                }
                                                animatedProps={
                                                    animatedPriceText
                                                }
                                                className="text-3xl font-JakartaBold text-dark"
                                            />
                                            <AnimatedTextInput
                                                className="text-lg font-Jakarta text-gray"
                                                animatedProps={animatedDateText}
                                            />
                                        </View>
                                    )}
                                    <CartesianChart
                                        chartPressState={state}
                                        axisOptions={{
                                            font,
                                            tickCount: 5,
                                            labelOffset: { x: -2, y: 0 },
                                            labelColor: Colors.gray,
                                            formatYLabel: (v) => `${v} €`,
                                            formatXLabel: (ms) =>
                                                format(new Date(ms), "MM/yy"),
                                        }}
                                        data={tickers!}
                                        xKey="timestamp"
                                        yKeys={["price"]}
                                    >
                                        {({ points }) => (
                                            <>
                                                <Line
                                                    points={points.price}
                                                    color={Colors.primary}
                                                    strokeWidth={3}
                                                />
                                                {isActive && (
                                                    <ToolTip
                                                        x={state.x.position}
                                                        y={
                                                            state.y.price
                                                                .position
                                                        }
                                                    />
                                                )}
                                            </>
                                        )}
                                    </CartesianChart>
                                </>
                            )}
                        </View>

                        <View style={defaultStyles.block} className="mt-5">
                            <Text className="text-xl font-JakartaBold mb-5 text-gray">
                                Overview
                            </Text>
                            <Text className="text-gray">
                                Bitcoin is a decentralized digital currency,
                                without a central bank or single administrator,
                                that can be sent from user to user on the
                                peer-to-peer bitcoin network without the need
                                for intermediaries. Transactions are verified by
                                network nodes through cryptography and recorded
                                in a public distributed ledger called a
                                blockchain.
                            </Text>
                        </View>
                    </>
                )}
            />
        </>
    );
};
const styles = StyleSheet.create({
    categoriesBtn: {
        padding: 10,
        paddingHorizontal: 14,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    categoriesBtnActive: {
        padding: 10,
        paddingHorizontal: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    categoryText: {
        fontSize: 14,
        color: Colors.gray,
    },
    categoryTextActive: {
        fontSize: 14,
        color: "#000",
    },
});
export default CryptoDetail;
