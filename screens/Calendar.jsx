import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import { Calendar } from "react-native-calendars";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PrimaryButton from "../components/PrimaryButton";

const CalendarScreen = () => {
  const date = new Date().toLocaleDateString("en-CA");
  const [selectedData, setSelectedData] = useState(date);
  const [items, setItems] = useState({
    "2023-05-14": { marked: true, items: [{ title: "Kalendarz do oddania" }] },
    "2023-05-16": { marked: true, items: [{ title: "Biblioteka do oddania" }] },
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("calendarEvents")
      .then((value) => {
        if (value !== null) {
          setItems(JSON.parse(value));
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("calendarEvents", JSON.stringify(items)).catch(
      (error) => console.log(error)
    );
  }, [items]);

  const dataSelectionHandler = (day) => {
    setSelectedData(day.dateString);
    setInputValue(items[day.dateString]?.items[0]?.title);

    console.log(`day: ${day.dateString}, selectedData: ${selectedData}`);
    console.log(`inputValue = ${inputValue}`);

    console.log(items[day.dateString]?.items[0]?.title);
  };

  const titleInputHandler = (value) => {
    setInputValue(value);
    console.log(value);
  };

  const addNewEvent = () => {
    setItems((prevItems) => ({
      ...prevItems,
      [selectedData]: { marked: true, items: [{ title: inputValue }] },
    }));
    console.log(selectedData);
    console.log(items);
  };


  const removeEvent = () => {
    const updatedItems = { ...items };
    delete updatedItems[selectedData];
    setItems(updatedItems);
    setInputValue("")
  };

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
          ...items,
          [selectedData]: {
            selected: true,
            selectedTextColor: "white",
            selectedColor: "#4bc4f6",
          },
        }}
      />
      <View style={styles.newEventContainer}>
        <Text style={styles.selectedData}>{selectedData}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleInputHandler}
          value={inputValue}
          editable={items[selectedData]?.items[0]?.title ? false : true}
        />
        <PrimaryButton
          bgColor={items[selectedData]?.items[0]?.title ? "#ee4445" : "#3478f6"}
          press={
            items[selectedData]?.items[0]?.title ? removeEvent : addNewEvent
          }
        >
          {items[selectedData]?.items[0]?.title ? "Remove Event" : "Add Event"}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
};
export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
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
    flexDirection: "column",
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
  },
});
