import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Currency } from "@/interfaces";
import { Link } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { defaultStyles } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

const Crypto = () => {
    const headerHeight = useHeaderHeight();
    const currencies = useQuery({
        queryKey: ["listings"],
        queryFn: () => fetch("/api/listings").then((res) => res.json()),
    });
    const ids = currencies.data
        ?.map((currency: Currency) => currency.id)
        .join(",");
    const { data } = useQuery({
        queryKey: ["info", ids],
        queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
        enabled: !!ids,
    });
    return (
        <ScrollView
            className="bg-background"
            contentContainerStyle={{
                paddingTop: headerHeight,
            }}
        >
            <Text
                className="font-JakartaBold"
                style={defaultStyles.sectionHeader}
            >
                Last test Crypto
            </Text>
            <View style={defaultStyles.block}>
                {currencies.data?.map((currency: Currency) => (
                    <Link
                        key={currency.id}
                        href={`/(root)/crypto/${currency.id}`}
                        asChild
                    >
                        <TouchableOpacity className="flex flex-row gap-3.5 items-center">
                            <Image
                                source={{
                                    uri: data?.[currency.id].logo,
                                }}
                                className="w-10 h-10"
                            />
                            <View className="flex flex-1 gap-1.5">
                                <Text className="text-dark font-JakartaBold">
                                    {currency.name}
                                </Text>
                                <Text className="text-gray font-Jakarta">
                                    {currency.symbol}
                                </Text>
                            </View>

                            <View className="gap-1.5 items-end">
                                <Text>
                                    {currency.quote.EUR.price.toFixed(2)} €
                                </Text>
                                <View className="flex flex-row gap-1">
                                    <Ionicons
                                        name={`${
                                            currency.quote.EUR
                                                .percent_change_1h > 0
                                                ? "caret-up"
                                                : "caret-down"
                                        }`}
                                        size={16}
                                        color={`${
                                            currency.quote.EUR
                                                .percent_change_1h > 0
                                                ? "green"
                                                : "red"
                                        }`}
                                    />
                                    <Text
                                        className={`${
                                            currency.quote.EUR
                                                .percent_change_1h > 0
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {currency.quote.EUR.percent_change_1h.toFixed(
                                            2
                                        )}{" "}
                                        %
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Link>
                ))}
            </View>
        </ScrollView>
    );
};

export default Crypto;
