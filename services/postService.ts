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
    }

    const { data, error } = await supabase
      .from("posts")
      .upsert(post)
      .select()
      .single();

    if (error) {
      console.error("Create post error:", error);
      return { success: false, msg: "Could not create post" };
    }
    return { success: true, data, msg: "Everything is good" };
  } catch (e) {
    console.error("Create post error:", e);
    return { success: false, msg: "Could not create post" };
  }
};

export const fetchPosts = async (limit: number = 10) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*, user: users (id, image, name), postLIkes (*)")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Fetch post error:", error);
      return { success: false, msg: "Could not Fetch post" };
    }

    return { success: true, data, msg: "Everything is good" };
  } catch (e) {
    console.error("Fetch posts error:", e);
    return { success: false, msg: "Could not fetch the post" };
  }
};

export const createPostLike = async (postLike: any) => {
  try {
    const { data, error } = await supabase
      .from("postLIkes")
      .insert(postLike)
      .select()
      .single();

    if (error) {
      console.error("createPostLike post error:", error);
      return { success: false, msg: "Could not createPostLike post" };
    }
    console.log(data);
    return { success: true, data };
  } catch (e) {
    console.error("createPostLike posts error:", e);
    return { success: false, msg: "Could not createPostLike the post" };
  }
};

export const removePostLike = async (postId: string, userId: string) => {
  const { error } = await supabase
    .from("postLIkes")
    .delete()
    .eq("userId", userId)
    .eq("postId", postId);

  try {
    if (error) {
      console.error("createPostLike post error:", error);
      return { success: false, msg: "Could notremovePostLike post" };
    }

    return { success: true, msg: "Everything is good" };
  } catch (e) {
    console.error("createPostLike posts error:", e);
    return { success: false, msg: "Could not createPostLike the post" };
  }
};
