import { uploadFile } from "@/services/imageService";
import { supabase } from "@/lib/supabase";
import { comment } from "postcss";

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
      .select(
        "*, user: users (id, image, name), postLIkes (*), comments(count)",
      )
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

export const fetchPostDetails = async (postId: string) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `*,
           user: users (id, image, name),
           postLIkes (*),
           comments (*, user: users(id, name, image))`,
      )
      .eq("id", postId)
      .order("created_at", { ascending: false, foreignTable: "comments" })
      .single();

    if (error) {
      console.error("Fetch post details error:", error);
      return { success: false, msg: "Could not Fetch post details" };
    }

    return { success: true, data, msg: "Everything is good" };
  } catch (e) {
    console.error("Fetch posts details error:", e);
    return { success: false, msg: "Could not fetch the post details" };
  }
};

export const createComment = async (comment: any) => {
  console.log(comment);
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert(comment)
      .select()
      .single();

    if (error) {
      console.error("Create comment  error:", error);
      return { success: false, msg: "Could Create the comment" };
    }
    console.log(data);
    return { success: true, data };
  } catch (e) {
    console.error("Create comment error:", e);
    return { success: false, msg: "Could not  Create the comment" };
  }
};

export const removeComment = async (commentId: string) => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  try {
    if (error) {
      console.error("Remove comment error:", error);
      return { success: false, msg: "Could Remove comment " };
    }

    return { success: true, data: { commentId }, msg: "Everything is good" };
  } catch (e) {
    console.error("Remove comment  error:", e);
    return { success: false, msg: "Could not Remove comment" };
  }
};
