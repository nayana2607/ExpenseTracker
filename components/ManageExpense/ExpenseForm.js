import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [formInputs, setFormInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : "",
      isValid: true,
    },
  });
  function inputChangedHandler(inputIdentifier, entereValue) {
    setFormInputs((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: { value: entereValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +formInputs.amount.value,
      date: new Date(formInputs.date.value),
      description: formInputs.description.value,
    };
    const amountisValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateisValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionisValid = expenseData.description.trim().length > 0;

    if (!amountisValid || !dateisValid || !descriptionisValid) {
      setFormInputs((currInputs) => {
        return {
          amount: { value: currInputs.amount.value, isValid: amountisValid },
          date: { value: currInputs.date.value, isValid: dateisValid },
          description: {
            value: currInputs.description.value,
            isValid: descriptionisValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }
  const formIsInvalid =
    !formInputs.amount.isValid ||
    !formInputs.date.isValid ||
    !formInputs.description.isValid;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!formInputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: formInputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!formInputs.date.isValid}
          textInputConfig={{
            keyboardType: "default",
            maxLength: 10,
            placeholder: "yyyy-mm-dd",
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: formInputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!formInputs.description.isValid}
        textInputConfig={{
          keyboardType: "default",
          autoCorrect: false,
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: formInputs.description.value,
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid Inputs</Text>}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
