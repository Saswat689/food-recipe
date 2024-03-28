import { View, Text, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Categories from "../components/categories";
import { useEffect, useState } from "react";
import axios from "axios";
import Recipes from "../components/recipes";

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Chicken");
  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    console.log(searchText,'is here')
    setRecipes([]);
    searchRecipes(searchText);
  }, [searchText]);

  useEffect(() => {
    getCategories();
  });

  useEffect(() => {
    console.log(activeCategory, "cat here");
    setRecipes([]);
    getRecipes(activeCategory);
  }, [activeCategory]);

  async function getCategories() {
    try {
      const res = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (res && res.data) {
        setCategories(res.data.categories);
      }
    } catch (err) {
      console.log("Error", err.message);
    }
  }

  async function searchRecipes(query) {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + query
      );
      console.log(query,'query')
      console.log(res.data.meals,'null');
      if (res && res.data) {
        setRecipes(res.data.meals);
      }
    } catch (err) {
      console.log("Error", err.message);
    }
  }

  async function getRecipes(category = "Chicken") {
    try {
      const res = await axios.get(
        "https://themealdb.com/api/json/v1/1/filter.php?c=" + category
      );
      if (res && res.data) {
        setRecipes(res.data.meals);
      }
    } catch (err) {
      console.log("Error", err.message);
    }
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={{
              uri: "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
            }}
            style={{ height: hp(5), width: hp(5.5) }}
            className="bg-blue-50 rounded-full"
          />
          <AntDesign name="bells" size={hp(4)} color="gray" />
        </View>
        {/* greetings and punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello Saswat!
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make Your Own Food!
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-500">Home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            defaultValue={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <Entypo name="magnifying-glass" size={hp(2.5)} color="gray" />
          </View>
        </View>

        {/* categories */}
        {categories.length > 0 && (
          <View>
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </View>
        )}

        {/* recipes */}
        {recipes && (
          <View>
            <Recipes recipes={recipes} categories={categories} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
