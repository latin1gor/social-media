import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const PostDetails = () => {
  const { postId } = useLocalSearchParams();
  console.log(postId);

  return <Text>Post details</Text>;
};

export default PostDetails;
