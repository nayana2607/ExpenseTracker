import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const expenseContext = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        expenseContext.setExpense(expenses);
      } catch (error) {
        setError("Something went wrong");
      }

      setIsFetching(false);
    }
    getExpenses();
  }, []);

  function ErrorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={ErrorHandler} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
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
