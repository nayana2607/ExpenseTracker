import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpenses = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const expenseContext = useContext(ExpensesContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isError, setisError] = useState();
  const selectedExpense = expenseContext.expenses.find(
    (expense) => expense.id === editedExpenseId
  );
  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsUpdating(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseContext.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setisError("Couldn't delete");
      setIsUpdating(false);
    }
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    try {
      if (isEditing) {
        expenseContext.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseContext.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setisError("Could't save expenses");
      setIsUpdating(true);
    }
  }
  function handleError() {
    setisError(null);
  }
  if (isError && !isUpdating) {
    return <ErrorOverlay message={isError} onConfirm={handleError} />;
  }
  if (isUpdating) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
        submitButtonLabel={isEditing ? "Update" : "Add"}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
