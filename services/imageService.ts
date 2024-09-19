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
  } catch (e) {
    console.log("File upload error: ", e);
    return { success: false, msg: "Could not upload media" };
  }
};

const getFilePath = (folderName: string, isImage: boolean) => {
  return `/${folderName}/${new Date().getTime()}${isImage ? '.png'}}`;
};
