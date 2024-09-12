import {supabase} from "@/lib/supabase";


export const getUserData = async (userId: string) => {

    try {
        const { data, error} = await supabase
            .from("users")
            .select()
            .eq('id', userId)
            .single();

            if (error) {
                return {success: false, msg: e.message}
            }
            return {success: true, data};

    } catch (error: any) {
        console.error(error)
        return {success: false, msg: error?.message}
    }
}