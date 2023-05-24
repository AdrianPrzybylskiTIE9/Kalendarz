import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { Agenda } from "react-native-calendars";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AgendaScreen = () => {
  const date = new Date().toLocaleDateString("en-CA");
  const [selectedData, setSelectedData] = useState(date);
  const [items, setItems] = useState({
    "2023-05-14": { marked: true, items: [{ title: "Kalendarz do oddania" }] },
    "2023-05-16": { marked: true, items: [{ title: "Biblioteka do oddania" }] },
  });

  const markedDates = Object.keys(items).reduce((result, date) => {
    result[date] = { marked: true };
    return result;
  }, {});

  const itemsList = Object.keys(items).reduce((result, date) => {
    result[date] = items[date].items;
    return result;
  }, {});

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem("calendarEvents");
      if (value !== null) {
        setItems(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    try {
      const value = await AsyncStorage.getItem("calendarEvents");
      if (value !== null) {
        setItems(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const dataSelectionHandler = (day) => {
    setSelectedData(day.dateString);
    console.log(`day: ${day.dateString}, selectedData: ${selectedData}`);
  };

  const loadItems = (day) => {
    setTimeout(() => {
      const newItems = {
        [day]: [{ title: "New Item" }],
        ...items,
      };
      setItems(newItems);
      updateData(); // Call updateData to update items from AsyncStorage
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        onDayPress={dataSelectionHandler}
        items={itemsList}
        loadItemsForMonth={loadItems}
        scrollEnabled={true}
        showScrollIndicator={true}
        renderItem={(item) => (
          <View style={styles.agendaContainer}>
            {console.log(`item = ${item}`)}
            <Text style={styles.agendaTitle}>{item.title}</Text>
          </View>
        )}
        showClosingKnob={true}
        showOnlySelectedDayItems
        style={styles.calendar}
        theme={{
          agendaKnobColor: "#4bc4f6",
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
          ...markedDates,
          [selectedData]: {
            selected: true,
            selectedTextColor: "white",
            selectedColor: "#4bc4f6",
          },
        }}
      />
    </SafeAreaView>
  );
};

export default AgendaScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "white",
  },
  calendar: {
    marginTop: 5,
    height: '100%',
  },
  agendaContainer: {
    flex: 1,
    backgroundColor: "white",
    height: 100,
    marginVertical: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
  },
  agendaTitle: {
    fontSize: 16,
    color: "#7a93a4",
  },
});
