import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const ExpensesOutput = (props) => {
  let content = <Text style={styles.infoText}>{props.fallBackText}</Text>;
  if (props.expenses.length > 0) {
    content = <ExpensesList expenses={props.expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary
        periodName={props.expensePeriod}
        expenses={props.expenses}
      />

      {content}
    </View>
  );
};

export default ExpensesOutput;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
