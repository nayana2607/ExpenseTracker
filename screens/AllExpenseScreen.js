import { StyleSheet, View } from "react-native";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenseScreen = () => {
  const expenseContext = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expenseContext.expenses}
      expensePeriod={"Total"}
      fallBackText="No expenses registered"
    />
  );
};
const styles = StyleSheet.create({});
export default AllExpenseScreen;
