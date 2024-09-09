import { DropDown, RoundBtn } from "@/components";
import { useBalanceStore } from "@/store/balanceStore";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
    const headerHeight = useHeaderHeight();
    const { balance, runTransaction, transactions, clearTransactions } =
        useBalanceStore();

    const onAddMoney = () => {
        runTransaction({
            id: Math.random().toString(),
            amount:
                Math.floor(Math.random() * 1000) *
                (Math.random() > 0.5 ? 1 : -1),
            date: new Date(),
            title: "Add Money",
        });
    };
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
                        {balance()}
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
                    onPress={clearTransactions}
                />
                <RoundBtn icon={"list"} text="Details" />
                <DropDown />
            </View>

            <Text className="text-xl font-JakartaBold m-5 mb-2.5">
                Transactions
            </Text>
            <View
                className="bg-white mx-5 p-3.5 rounded-2xl"
                style={{
                    gap: 20,
                }}
            >
                {transactions.length === 0 && (
                    <Text className="p-3.5 text-gray font-Jakarta">
                        No transactions yet
                    </Text>
                )}
                {transactions.map((transaction) => {
                    return (
                        <View
                            key={transaction.id}
                            className="flex-row items-center gap-4"
                        >
                            <View className="w-10 h-10 bg-lightGray items-center justify-center rounded-[20px]">
                                <Ionicons
                                    name={
                                        transaction.amount > 0
                                            ? "add"
                                            : "remove"
                                    }
                                    size={24}
                                    color={"#141518"}
                                />
                            </View>
                            <View className="flex flex-1">
                                <Text className="font-Jakarta">
                                    {transaction.title}
                                </Text>
                                <Text className="font-Jakarta text-gray text-[12px]">
                                    {transaction.date.toLocaleString()}
                                </Text>
                            </View>
                            <Text>{transaction.amount}€</Text>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
};
export default Home;
