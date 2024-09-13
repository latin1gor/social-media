import { StyleSheet, Text, View } from "react-native";
import BackButton from "@/components/back-button";
import { useRouter } from "expo-router";
import { hp } from "@/helpers/common";
import { theme } from "@/constants/theme";

interface IHeaderProps {
  title: string;
  showBackButton?: boolean;
  mb?: number;
}

const Header = ({ title, showBackButton = false, mb = 10 }: IHeaderProps) => {
  const router = useRouter();
  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      {showBackButton && (
        <View style={styles.backButton}>
          <BackButton router={router} />
        </View>
      )}
      <Text style={styles.title}>{title || ""}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    gap: 10,
  },
  title: {
    fontSize: hp(2.7),
    fontWeight: "700",
    color: theme.colors.textDark,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
});
