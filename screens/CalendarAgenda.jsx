import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { Agenda } from "react-native-calendars";
import { useState } from "react";

const AgendaScreen = () => {
  const date = new Date().toLocaleDateString("en-CA");
  const [selectedData, setSelectedData] = useState(date);
  const [items, setItems] = useState({
    "2023-05-14": [{ title: "Kalendarz do oddania" }],
    "2023-05-16": [{ title: "Biblioteka do oddania" }],
  });

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
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        onDayPress={dataSelectionHandler}
        items={items}
        loadItemsForMonth={loadItems}
        scrollEnabled={true}
        showScrollIndicator={true}
        renderItem={(item) => (
          <View style={styles.agendaContainer}>
            <Text style={styles.agendaTitle}>{item.title}</Text>
          </View>
        )}
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
export default AgendaScreen;

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
