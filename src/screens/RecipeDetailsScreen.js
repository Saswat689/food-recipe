import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Loading } from "../components/loading";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export function RecipeDetailsScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  async function getMealData(id) {
    try {
      const res = await axios.get(
        "https://themealdb.com/api/json/v1/1/lookup.php?i=" + id
      );
      if (res && res.data) {
        setMeal(res.data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.log("Error", err.message);
    }
  }

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/
    const match = url.match(regex)
    if (match && match[1]) {
        return match[1]
    }
    return null
  }

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style={"light"} />

      {/* recipe image */}
      <View className="flex-row justify-center">
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 20,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 2,
          }}
        />
      </View>

      {/* back button */}
      <View className="w-full absolute flex-row justify-between items-center pt-12">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-white ml-5"
        >
          <Ionicons name="chevron-back" size={hp(3.5)} color="#f59e0b" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavourite(!isFavourite)}
          className="p-2 rounded-full bg-white mr-5"
        >
          <Ionicons
            name="heart"
            size={hp(3.5)}
            color={isFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {/* meal description */}

      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* name and area */}
          <View className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {meal?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500"
            >
              {meal?.strArea}
            </Text>
          </View>

          {/* misc */}
          <View className="flex-row justify-around">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: wp(12.5), width: wp(12.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <AntDesign name="clockcircleo" size={hp(4)} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: wp(12.5), width: wp(12.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <Ionicons name="people" size={hp(4)} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: wp(12.5), width: wp(12.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FontAwesome5 name="fire" size={hp(4)} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Cal
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: wp(12.5), width: wp(12.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FontAwesome5 name="layer-group" size={hp(4)} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                ></Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* ingredients */}
      <View className="space-y-4 mx-4 mt-4">
        <Text
          style={{ fontSize: hp(2.5) }}
          className="font-bold flex-1 text-neutral-700"
        >
          Ingredients
        </Text>
        <View className="space-y-2 ml-3">
          {ingredientsIndexes(meal).map((i) => {
            return (
              <View key={i} className="flex-row space-x-4">
                <View
                  style={{ height: hp(1.5), width: hp(1.5) }}
                  className="bg-amber-300 rounded-full"
                />
                <View className="flex-row space-x-2">
                  <Text
                    style={{ fontSize: hp(1.7) }}
                    className="font-extrabold text-neutral-700"
                  >
                    {meal["strMeasure" + i]}
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.7) }}
                    className="font-medium text-neutral-600"
                  >
                    {meal["strIngredient" + i]}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Instructions */}
      <View className="space-y-4 mx-4 mt-4">
        <Text
          style={{ fontSize: hp(2.5) }}
          className="font-bold flex-1 text-neutral-700"
        >
          Instructions
        </Text>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="text-neutral-700 leading-6"
        >
          {meal?.strInstructions}
        </Text>
      </View>

    </ScrollView>
  );
}
