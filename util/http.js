import axios from "axios";

const url = "https://react-native-course-e1110-default-rtdb.firebaseio.com";
export async function storeExpense(expenseData) {
  const response = await axios.post(`${url}/expenses.json`, expenseData);
  return response.data.name;
}

export function updateExpense(id, expenseData) {
  return axios.put(`${url}/expenses/${id}.json`, expenseData);
}
export function deleteExpense(id) {
  return axios.delete(`${url}/expenses/${id}.json`);
}

export async function fetchExpenses() {
  const res = await axios.get(`${url}/expenses.json`);
  const expenses = [];
  for (const key in res.data) {
    const expenseObj = {
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}
