import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

import CalendarScreen from "./screens/Calendar";
import CalendarListScreen from "./screens/CalendarList";
import AgendaScreen from "./screens/CalendarAgenda";

const Tab = createMaterialBottomTabNavigator();

export default function App() {

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
          activeColor="#3478f6"
          inactiveColor="#939293"
          barStyle={{ backgroundColor: "#f4f5f5" }}
        >
          <Tab.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="calendar"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="List"
            component={CalendarListScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Agenda"
            component={AgendaScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="view-agenda-outline"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
