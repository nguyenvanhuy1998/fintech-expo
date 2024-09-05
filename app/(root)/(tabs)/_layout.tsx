import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="invest"
                options={{
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="transfers"
                options={{
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="crypto"
                options={{
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="lifestyle"
                options={{
                    headerShown: false,
                }}
            />
        </Tabs>
    );
};

export default Layout;
