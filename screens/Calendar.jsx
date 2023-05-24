import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from "react-native";
import Constants from "expo-constants";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";

const CalendarScreen = () => {
    const date = new Date().toLocaleDateString("en-CA");
    const [selectedData, setSelectedData] = useState(date)

    const dataSelectionHandler = (day) => {
        setSelectedData(day.dateString);
        console.log(`day: ${day.dateString}, selectedData: ${selectedData}`);
    }

    return (
      <SafeAreaView style={styles.container}>
        <Calendar
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
            "2023-05-14": { marked: true },
            "2023-05-16": { marked: true },
            [selectedData]: {
              selected: true,
              selectedTextColor: "orange",
              selectedColor: "black",
            },
          }}
        />
        <View style={styles.newEventContainer}>
          <Text style={styles.selectedData}>{selectedData}</Text>
          <TextInput style={styles.textInput} />
          <PrimaryButton>Add Event</PrimaryButton>
        </View>
      </SafeAreaView>
    );
}
export default CalendarScreen;

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
    marginVertical: 20,
  },
  newEventContainer: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    paddingTop: 30,
  },
  selectedData: {
    borderWidth: 1,
    borderColor: "#f4f5f5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#f4f5f5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  }
});
