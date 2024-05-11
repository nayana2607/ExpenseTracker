import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import AllExpenseScreen from "./screens/AllExpenseScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import RecentExpenses from "./screens/RecentExpenses";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageExpenses from "./screens/ManageExpenses";
import { MaterialIcons } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function BottomsTab() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: "white",
        headerRight: ({ tintColor }) => (
          <IconButton
            icon={"add"}
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Recent Screen"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ size, color }) => (
            <Entypo name="hour-glass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="All Expenses"
        component={AllExpenseScreen}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Exp",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="account-balance-wallet"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
            initialRouteName="Expense Overview"
          >
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpenses}
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              name="Expense Overview"
              component={BottomsTab}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
});
