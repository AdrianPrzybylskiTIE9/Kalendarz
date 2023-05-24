import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { Calendar } from "react-native-calendars";
import CalendarList from "react-native-calendars/src/calendar-list/new";
import { useState } from "react";

const CalendarListScreen = () => {
  const date = new Date().toLocaleDateString("en-CA");
  const [selectedData, setSelectedData] = useState(date);

  const dataSelectionHandler = (day) => {
    setSelectedData(day.dateString);
    console.log(`day: ${day.dateString}, selectedData: ${selectedData}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CalendarList
        onDayPress={dataSelectionHandler}
        scrollEnabled={true}
        showScrollIndicator={true}
        style={styles.calendar}
        theme={{
          "stylesheet.calendar.header": {
            dayTextAtIndex0: {
              color: "red",
            },
            dayTextAtIndex6: {
              color: "green",
            },
            monthText: {
              paddingBottom: 20,
              fontWeight: "bold",
            },
            week: {
              marginTop: 7,
              marginBottom: -1, // Add this to compensate for the added border
              flexDirection: "row",
              justifyContent: "space-around",
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            },
          },
        }}
        markedDates={{
          "2023-04-24": { marked: true, selected: true },
          "2023-04-25": { marked: true },
          [selectedData]: {
            selected: true,
            selectedTextColor: "orange",
            selectedColor: "black",
          },
        }}
      />
    </SafeAreaView>
  );
};
export default CalendarListScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
  },
  calendar: {
    // backgroundColor: '#63ADF2'
    // color: 'white'
    marginVertical: 20,
  },
});
