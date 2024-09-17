import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { getAppIcon, setAppIcon } from "expo-dynamic-app-icon";

const ICONS = [
    {
        name: "Default",
        icon: require("@/assets/images/icon.png"),
    },
    {
        name: "Dark",
        icon: require("@/assets/images/icon-dark.png"),
    },
    {
        name: "Vivid",
        icon: require("@/assets/images/icon-vivid.png"),
    },
];
const Account = () => {
    const { user } = useUser();
    const { signOut } = useAuth();
    const [edit, setEdit] = useState(false);
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [activeIcon, setActiveIcon] = useState("Default");

    useEffect(() => {
        const loadCurrentIconPref = () => {
            const icon = getAppIcon();
            console.log("current icon ref", icon);
            setActiveIcon(icon);
        };
        loadCurrentIconPref();
    }, []);

    const onCaptureImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.75,
            base64: true,
        });
        if (!result.canceled) {
            const base64 = `data:image/png;base64,${result.assets[0].base64}`;
            user?.setProfileImage({
                file: base64,
            });
        }
    };
    const onSaveUser = async () => {
        try {
            await user?.update({
                firstName: firstName!,
                lastName: lastName!,
            });
            setEdit(false);
        } catch (error) {
            console.error(error);
        } finally {
            setEdit(false);
        }
    };
    const onSignOut = () => {
        signOut();
        router.replace("/(auth)/welcome");
    };
    const onChangeAppIcon = async (icon: string) => {
        setAppIcon(icon.toLowerCase());
        setActiveIcon(icon);
    };
    return (
        <BlurView
            intensity={80}
            tint="dark"
            style={{
                flex: 1,
                paddingTop: 100,
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
        >
            <StatusBar style="light" />
            <View className="items-center">
                <TouchableOpacity
                    onPress={onCaptureImage}
                    className="w-[100px] h-[100px] rounded-full bg-gray items-center justify-center"
                >
                    {user?.imageUrl && (
                        <Image
                            source={{ uri: user.imageUrl }}
                            className="w-[100px] h-[100px] rounded-full bg-gray"
                        />
                    )}
                </TouchableOpacity>

                <View
                    className="flex flex-row"
                    style={{
                        gap: 6,
                    }}
                >
                    {!edit && (
                        <View
                            className="flex flex-1 flex-row items-center justify-center mt-5"
                            style={{
                                gap: 12,
                            }}
                        >
                            <Text className="text-[26px] text-white font-Jakarta">
                                {firstName} {lastName}
                            </Text>
                            <TouchableOpacity onPress={() => setEdit(true)}>
                                <Ionicons
                                    name="ellipsis-horizontal"
                                    size={24}
                                    color={"#fff"}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    {edit && (
                        <View
                            className="flex flex-1 flex-row items-center justify-center mt-5"
                            style={{
                                gap: 12,
                            }}
                        >
                            <TextInput
                                placeholder="First name"
                                value={firstName || ""}
                                onChangeText={setFirstName}
                                className="w-[140px] h-[44px] bg-white border border-gray rounded-lg p-2.5"
                            />
                            <TextInput
                                placeholder="Last name"
                                value={lastName || ""}
                                onChangeText={setLastName}
                                className="w-[140px] h-[44px] bg-white border border-gray rounded-lg p-2.5"
                            />
                            <TouchableOpacity onPress={onSaveUser}>
                                <Ionicons
                                    name="checkmark-outline"
                                    size={24}
                                    color={"#fff"}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={{
                        gap: 20,
                    }}
                    className="p-3.5 flex flex-row"
                    onPress={onSignOut}
                >
                    <Ionicons name="log-out" size={24} color={"#fff"} />
                    <Text className="text-lg font-Jakarta text-white">
                        Log out
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        gap: 20,
                    }}
                    className="p-3.5 flex flex-row"
                >
                    <Ionicons name="person" size={24} color={"#fff"} />
                    <Text className="text-lg font-Jakarta text-white">
                        Account
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        gap: 20,
                    }}
                    className="p-3.5 flex flex-row"
                >
                    <Ionicons name="bulb" size={24} color={"#fff"} />
                    <Text className="text-lg font-Jakarta text-white">
                        Learn
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        gap: 20,
                    }}
                    className="p-3.5 flex flex-row justify-between"
                >
                    <View
                        style={{
                            gap: 20,
                        }}
                        className="flex flex-row items-center"
                    >
                        <Ionicons name="megaphone" size={24} color={"#fff"} />
                        <Text className="text-lg font-Jakarta text-white">
                            Inbox
                        </Text>
                    </View>

                    <View className="bg-primary-500 px-2.5 rounded-lg justify-center ">
                        <Text className="text-white text-[12px]">14</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.actions}>
                {ICONS.map((icon) => (
                    <TouchableOpacity
                        key={icon.name}
                        className="p-3.5 flex flex-row"
                        style={{
                            gap: 20,
                        }}
                        onPress={() => onChangeAppIcon(icon.name)}
                    >
                        <View
                            className="flex flex-row flex-1 items-center"
                            style={{
                                gap: 20,
                            }}
                        >
                            <Image source={icon.icon} className="w-6 h-6" />
                            <Text className="text-lg text-white font-Jakarta">
                                {icon.name}
                            </Text>
                        </View>
                        {activeIcon.toLowerCase() ===
                            icon.name.toLowerCase() && (
                            <Ionicons
                                name="checkmark"
                                size={24}
                                color={"#fff"}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </BlurView>
    );
};
const styles = StyleSheet.create({
    actions: {
        backgroundColor: "rgba(256, 256, 256, 0.1)",
        borderRadius: 16,
        gap: 0,
        margin: 20,
    },
});
export default Account;
