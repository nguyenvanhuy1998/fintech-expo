import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Currency } from "@/interfaces";

const Crypto = () => {
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
        <View>
            {currencies.data?.map((currency: Currency) => (
                <View key={currency.id} className="flex flex-row">
                    <Image
                        source={{
                            uri: data?.[currency.id].logo,
                        }}
                        className="w-8 h-8"
                    />
                    <Text>{currency.name}</Text>
                </View>
            ))}
        </View>
    );
};

export default Crypto;
