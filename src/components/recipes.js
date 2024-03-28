import { View, Text, Pressable, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { mealData } from "../constants";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Loading } from "./loading";
import { useNavigation } from '@react-navigation/native';

export default function Recipes({ categories, recipes }) {
    const navigation = useNavigation()

    return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View className="flex-wrap flex-row space-x-4">
        {categories?.length == 0 || recipes?.length == 0 ? (
          <Loading size="large" className="mt-20"/>
        ) : (
          <>
            {recipes.map((item, i) => {
              return <RecipeCard item={item} index={i} key={i} navigation={navigation}/>;
            })}
          </>
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index,navigation }) => {
  let isEven = index % 2 === 0;

  return (
    <Animated.View
      key={item.idMeal}
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
      className="w-[50%] flex justify-center"
    >
      <Pressable
        style={{
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        onPress={() => navigation.navigate('RecipeDetail',{...item})}
        className="flex justify-center mb-4 space-y-1"
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            height: index % 3 == 0 ? hp(25) : hp(35),
            width: "100%",
            borderRadius: 35,
          }}
        />
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
