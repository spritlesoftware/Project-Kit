import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Containers/Authentications/Login";
import Register from "../Containers/Authentications/Register";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // presentation: 'modal',
        animationTypeForReplace: "push",
        animation: "slide_from_right",
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={Register} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
