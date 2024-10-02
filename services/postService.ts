import { uploadFile } from "@/services/imageService";
import { supabase } from "@/lib/supabase";

export const createOrUpdatePost = async (post: any) => {
  try {
    // upload image
    if (post.file && typeof post === "object") {
      const isImage = post?.file?.type === "image";
      const folderName = isImage ? "postImages" : "postVideos";
      const fileResult = await uploadFile(folderName, post?.file?.uri, isImage);
      if (fileResult.success) post.file = fileResult.data;
      else return fileResult;

      const { data, error } = await supabase
        .from("posts")
        .upsert(post)
        .select()
        .single();

      if (error) {
        console.error("Create post error:", error);
        return { success: false, msg: "Could not create post" };
      }
      return { success: true, data: data };
    }
  } catch (e) {
    console.error("Create post error:", e);
    return { success: false, msg: "Could not create post" };
  }
};
