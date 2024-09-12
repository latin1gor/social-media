import { hp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

interface IProps {
  uri: string;
  size?: number;
  rounded?: number;
  style?: any;
}

const Avatar = ({
  uri,
  size = hp(4),
  rounded = theme.radius.md,
  style = {},
}: IProps) => {
  return (
    <Image
      source={{ uri }}
      transition={100}
      style={[
        styles.avatar,
        { height: size, width: size, borderRadius: rounded },
        styles,
      ]}
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({});
