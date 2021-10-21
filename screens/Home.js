import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home(params) {
  const [weatherData, setWeatherData] = useState();

  async function getWeather(city = "Accra") {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=61068a62ec385ad7804f3f54145b1367`
    )
      .then((response) => response.json())
      .then((response) => {
        setWeatherData(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getWeather();
  }, []);

  const cities = ["Accra", "Kumasi", "London", "Florida", "Tokyo"];
  const weatherImages = [
    {
      weather: "overcast clouds",
      image: require("../assets/images/clouds.png"),
    },
    {
      weather: "heavy intensity rain",
      image: require("../assets/images/RainyClouds.png"),
    },
    {
      weather: "light rain",
      image: require("../assets/images/lightRain.png"),
    },
  ];

  const compare = weatherImages.find(
    (item) => weatherData?.weather[0]?.description === item?.weather
  )?.image;

  const weathernames = String(
    weatherData?.weather[0]?.description
  ).toLowerCase();

  const nocompare = () => {
    var choose;
    switch (true) {
      case /rain/.test(weathernames):
        choose = require("../assets/images/RainyClouds.png");
        break;
      case /clouds/.test(weathernames):
        choose = require("../assets/images/clouds.png");
        break;
      default:
        choose = require("../assets/images/cloudy.png");
        break;
    }
    return choose
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgb(25,23,44)",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "stretch",
    },
  });

  return (
    <View style={styles.container}>
      {/* Card */}
      <SafeAreaView style={{ flex: 0.1 }}></SafeAreaView>
      <View
        style={{
          flex: 0.5,
          backgroundColor: "#211f30",
          width: "95%",
          borderRadius: 25,
          padding: 20,
        }}
      >
        {/* Today */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>Today</Text>
          <View>
            <Text style={{ color: "white" }}>{new Date().toDateString()}</Text>
            <Text
              style={{
                color: "rgba(255,255,255,0.4)",
                textTransform: "capitalize",
              }}
            >
              {weatherData?.weather[0]?.description}
            </Text>
          </View>
        </View>
        {/* Temperature and Clound */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 65 }}>
            {(weatherData?.main?.temp - 273.15).toFixed(1)}
            {/* {<p style={{ display: "inline" }}>&deg;</p>} */}
            <Text style={{ color: "orange" }}>c</Text>
          </Text>
          <Image
            source={compare ? compare : nocompare()}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />
        </View>
        <SafeAreaView style={{ flex: 0.1 }}></SafeAreaView>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Location */}
          <Ionicons
            name="location-outline"
            color="white"
            style={{ alignItems: "center" }}
          />
          <Text
            style={{
              color: "white",
              marginHorizontal: 4,
              alignItems: "center",
            }}
          >
            {weatherData?.name}
          </Text>
        </View>
      </View>
      <SafeAreaView style={{ flex: 0.03 }}></SafeAreaView>
      <FlatList
        style={{ flex: 1, width: "95%", height: "100%" }}
        data={cities}
      keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingTop: 2,
          marginVertical: 10,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              getWeather(item);
            }}
            style={{
              backgroundColor: "#211f30",
              marginBottom: 10,
              borderRadius: 7,
              height: 55,
              flexDirection: "row",
              padding: 15,
            }}
          >
            <Text
              style={{
                flex: 1,
                color: "white",
                height: 80,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {item}
            </Text>
            <Ionicons
              name={
                item === weatherData?.name
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              color="white"
              size={18}
            />
          </TouchableOpacity>
        )}
      />
      <SafeAreaView style={{ flex: 0.5 }}></SafeAreaView>
    </View>
  );
}
