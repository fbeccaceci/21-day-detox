import "@/styles/unistyles";
import HomeStackNavigator from "@/navigation/home-stack-navigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
}
