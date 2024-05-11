import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {
  const expenseContext = useContext(ExpensesContext);
  const today = new Date();
  const recentExpenses = expenseContext.expenses.filter((expense) => {
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });
  return (
    <ExpensesOutput
      fallBackText="No expenses registered for last 7 days"
      expenses={recentExpenses}
      expensePeriod={"Last 7 days"}
    />
  );
};
export default RecentExpenses;
