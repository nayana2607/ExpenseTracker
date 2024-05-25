import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpense: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { descriptio, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "add":
      return [action.payload, ...state];
    case "set":
      const inverted = action.payload.reverse();
      return inverted;
    case "update":
      const updatedIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatedIndex];
      const updateItem = { ...updatableExpense, ...action.payload.data };
      const newState = [...state];
      newState[updatedIndex] = updateItem;

      return newState;
    case "delete":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}
function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  function addExpense(expenseData) {
    dispatch({ type: "add", payload: expenseData });
  }

  function setExpense(expenses) {
    dispatch({ type: "set", payload: expenses });
  }
  function deleteExpense(id) {
    dispatch({ type: "delete", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({
      type: "update",
      payload: {
        id: id,
        data: expenseData,
      },
    });
  }
  const value = {
    expenses: expensesState,
    setExpense: setExpense,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
