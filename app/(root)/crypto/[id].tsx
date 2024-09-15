import {
    View,
    Text,
    SectionList,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { defaultStyles } from "../../../constants/styles";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";

const categories = ["Overview", "News", "Orders", "Transactions"];
const CryptoDetail = () => {
    const { id } = useLocalSearchParams();
    const headerHeight = useHeaderHeight();
    const [activeIndex, setActiveIndex] = useState(0);

    const { data } = useQuery({
        queryKey: ["info", id],
        queryFn: async () => {
            const info = await fetch(`/api/info?ids=${id}`).then((res) =>
                res.json()
            );
            return info[+id];
        },
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
                        {/* TODO: CHART */}
                        <View className="h-[500px] bg-green-500">

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
