import { userAtom } from "@/store/auth";
import { fillProfileInfo, getProfileInfo } from "@/supabase/account";
import { FillProfileInfoPayload } from "@/supabase/account/index.type";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const ProfileView = () => {
    const user = useAtomValue(userAtom);
    const { t } = useTranslation(); 

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FillProfileInfoPayload>();

    useEffect(() => {
      if (user) {
        getProfileInfo(user.user.id).then((res) => console.log(res));
      }
    }, [user, setValue]);

    const { mutate: handleFillProfileInfo } = useMutation({
      mutationKey: ["fill-profile-info"],
      mutationFn: fillProfileInfo,
      onSuccess: () => {
        alert(t("Profile updated successfully!"));
      },
      onError: () => {
        alert(t("An error occurred while updating the profile."));
      },
    });
  
    const onSubmit = (data: FillProfileInfoPayload) => {
      handleFillProfileInfo({ ...data, id: user?.user?.id });
    };

  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">{t("Edit Profile")}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">{t("Username")}</label>
            <input
              {...register("username", { required: t("Username is required") })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder={t("Enter your username")}
            />
            {errors.username && <p className="text-red-800 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">{t("Avatar URL")}</label>
            <input
              {...register("avatar_url", { required: t("Avatar URL is required") })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder={t("Enter avatar URL")}
            />
            {errors.avatar_url && <p className="text-red-800 text-sm mt-1">{errors.avatar_url.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">{t("Full Name (EN)")}</label>
            <input
              {...register("full_name_en", { required: t("Full Name (EN) is required") })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder={t("Enter your full name (English)")}
            />
            {errors.full_name_en && <p className="text-red-800 text-sm mt-1">{errors.full_name_en.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">{t("Full Name (KA)")}</label>
            <input
              {...register("full_name_ka", { required: t("Full Name (KA) is required") })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder={t("Enter your full name (Georgian)")}
            />
            {errors.full_name_ka && <p className="text-red-800 text-sm mt-1">{errors.full_name_ka.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            {t("Save Changes")}
          </button>
        </form>
      </div>
    </div>
    );
  };
  
  export default ProfileView;