import { DropDown, RoundBtn } from "@/components";
import { useUser } from "@clerk/clerk-expo";
import { useHeaderHeight } from "@react-navigation/elements";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
    const { user } = useUser();
    const balance = 1420;
    const headerHeight = useHeaderHeight();

    const onAddMoney = () => {};
    const onClearTransactions = () => {};
    return (
        <ScrollView
            className="bg-background"
            contentContainerStyle={{
                paddingTop: headerHeight,
            }}
        >
            <View className="mt-20 items-center">
                <View className="flex-row justify-center items-end gap-2.5">
                    <Text className="text-[50px] font-JakartaBold">
                        {balance}
                    </Text>
                    <Text className="text-xl font-JakartaMedium">€</Text>
                </View>
                <TouchableOpacity className="bg-lightGray my-5 h-10 rounded-[20px] px-5 items-center justify-center">
                    <Text className="text-dark text-base font-JakartaMedium">
                        Accounts
                    </Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between p-5">
                <RoundBtn icon={"add"} text="Add money" onPress={onAddMoney} />
                <RoundBtn
                    icon={"refresh"}
                    text="Exchange"
                    onPress={onClearTransactions}
                />
                <RoundBtn icon={"list"} text="Details" />
                <DropDown />
            </View>
        </ScrollView>
    );
};
export default Home;
