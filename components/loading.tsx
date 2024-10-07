import { theme } from "@/constants/theme";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

interface ILoaderProps {
  size?: ActivityIndicatorProps["size"];
  color?: string;
}

const Loading = ({
  size = "large",
  color = theme.colors.primary,
}: ILoaderProps) => {
  return <ActivityIndicator size={size} color={color} />;
};

export default Loading;
