export const getUserImageSrc = (imagePath: string | undefined) => {
  if (imagePath) {
    return { uri: imagePath };
  } else {
    return require("../assets/images/user.jpg");
  }
};
