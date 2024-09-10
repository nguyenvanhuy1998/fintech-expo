import React from "react";
import { View } from "react-native";
import SortTableList from "./SortTableList";
import Title from "./Title";

const titles = [
    {
        id: "spent",
    },
    {
        id: "cashback",
    },
    {
        id: "recent",
    },
    {
        id: "cards",
    },
];
const WidgetList = () => {
    return (
        <View className="px-5 mb-[80px]">
            <SortTableList
                editing={true}
                onDragEnd={(positions) =>
                    console.log(JSON.stringify(positions, null, 2))
                }
            >
                {titles.map((tile, index) => (
                    <Title
                        onLongPress={() => true}
                        key={tile.id + "-" + index}
                        id={tile.id}
                    />
                ))}
            </SortTableList>
        </View>
    );
};

export default WidgetList;
