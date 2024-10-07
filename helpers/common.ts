import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const hp = (percentage: number) => {
  return (percentage * deviceHeight) / 100;
};
export const wp = (percentage: number) => {
  return (percentage * deviceWidth) / 100;
};

export const stripHtmlTags = (html: string | null | undefined) => {
  if (!html) return "";
  return html
    .replace(/<\/?[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&[^;]+;/g, "");
};
