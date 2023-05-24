import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import CalendarList from "react-native-calendars/src/calendar-list/new";

const CalendarListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CalendarList
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
