import * as FileSystem from "expo-file-system";

export const getUserImageSrc = (imagePath: string | undefined) => {
  if (imagePath) {
    return { uri: imagePath };
  } else {
    return require("../assets/images/user.jpg");
  }
};

export const uploadFile = async (
  folderName: string,
  fileUri: string,
  isImage: boolean = true,
) => {
  try {
    const fileName = getFilePath(folderName, isImage);
    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  } catch (e) {
    console.log("File upload error: ", e);
    return { success: false, msg: "Could not upload media" };
  }
};

const getFilePath = (folderName: string, isImage: boolean) => {
  return `/${folderName}/${new Date().getTime()}${isImage ? ".png" : "mp4"}}`;
};
