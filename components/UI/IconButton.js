import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ icon, color, size, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressStyle}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;
const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressStyle: {
    opacity: 0.75,
  },
});
