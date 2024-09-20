import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/lib/supabase";
import { supabaseUrl } from "@/constants";

export const getUserImageSrc = (imagePath: string) => {
  if (imagePath) {
    getSupabaseFileUrl(imagePath);
  } else {
    return require("../assets/images/user.jpg");
  }
};

export const getSupabaseFileUrl = (filePath: string) => {
  if (filePath) {
    return {
      uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`,
    };
  }

  return null;
};

export const uploadFile = async (
  folderName: string,
  fileUri: string,
  isImage: boolean = true,
) => {
  try {
    let fileName = getFilePath(folderName, isImage);

    let fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    let imageData = decode(fileBase64);
    console.log(fileName, fileName);
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, imageData, {
        cacheControl: "3600",
        upsert: false,
        contentType: isImage ? "image/*" : "video/*",
      });

    if (error) {
      console.log("File upload error 1: ", error);
      return { success: false, msg: "Could not upload media" };
    }

    return { success: true, data: data?.path };
  } catch (e) {
    console.log("File upload error 2: ", e);
    return { success: false, msg: "Could not upload media" };
  }
};

const getFilePath = (folderName: string, isImage: boolean) => {
  return `/${folderName}/${new Date().getTime()}${isImage ? ".png" : "mp4"}`;
};
