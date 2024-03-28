import { ActivityIndicator, Text, View } from 'react-native';

export function Loading(props) {

  return (
    <View className="flex-1 flex justify-center items-center">
        <ActivityIndicator {...props}/>
    </View>
  );
}
