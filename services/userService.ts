import { supabase } from "@/lib/supabase";
import id from "ajv/lib/vocabularies/core/id";

export const getUserData = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", userId)
      .single();

    if (error) {
      return { success: false, msg: e.message };
    }
    return { success: true, data };
  } catch (error: any) {
    console.error(error);
    return { success: false, msg: error?.message };
  }
};

export const updateUser = async (userId: string, data: any) => {
  try {
    const { error } = await supabase
      .from("users")
      .update(data)
      .eq("id", userId);

    if (error) {
      return { success: false, msg: e.message };
    }
    return { success: true, data };
  } catch (error: any) {
    console.error(error);
    return { success: false, msg: error?.message };
  }
};
