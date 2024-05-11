import { FlatList, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = (props) => {
  function renderExpenses(itemData) {
    return (
      <ExpenseItem
        description={itemData.item.description}
        amounts={itemData.item.amount}
        date={itemData.item.date}
        id={itemData.item.id}
      />
    );
  }
  return (
    <FlatList
      data={props.expenses}
      renderItem={renderExpenses}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
