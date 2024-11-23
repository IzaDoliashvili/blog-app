import { userAtom } from "@/store/auth";
import { fillProfileInfo, getProfileInfo } from "@/supabase/account";
import { FillProfileInfoPayload } from "@/supabase/account/index.type";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

const ProfileView = () => {
    const user = useAtomValue(userAtom);
  
    const [profilePayload, setProfilePayload] = useState<FillProfileInfoPayload>({
      avatar_url: "",
      full_name_en: "",
      full_name_ka: "",
      username: "",
    });
  
    useEffect(() => {
      if (user) {
        getProfileInfo(user?.user.id).then((res) => console.log(res));
      }
    }, [user]);
  
    const { mutate: handleFillProfileInfo } = useMutation({
      mutationKey: ["fill-profile-info"],
      mutationFn: fillProfileInfo,
    });
  
    const handleSubmit = () => {
      handleFillProfileInfo({ ...profilePayload, id: user?.user?.id });
    };
  
    return (
      <div className="flex flex-col items-center justify-center gap-y-4">
        <label>username</label>
        <input
          className="border border-black"
          name="username"
          value={profilePayload.username}
          onChange={(e) => {
            setProfilePayload({
              username: e.target.value,
              avatar_url: profilePayload.avatar_url,
              full_name_en: profilePayload.full_name_en,
              full_name_ka: profilePayload.full_name_ka,
            });
          }}
        />
        <label>Avatar Url</label>
        <input
          className="border border-black"
          name="avatar"
          value={profilePayload.avatar_url}
          onChange={(e) => {
            setProfilePayload({
              username: profilePayload.username,
              avatar_url: e.target.value,
              full_name_en: profilePayload.full_name_en,
              full_name_ka: profilePayload.full_name_ka,
            });
          }}
        />
        <label>Full Name Ka</label>
        <input
          className="border border-black"
          name="fullnameka"
          value={profilePayload.full_name_en}
          onChange={(e) => {
            setProfilePayload({
              username: profilePayload.username,
              avatar_url: profilePayload.avatar_url,
              full_name_en: profilePayload.full_name_en,
              full_name_ka: e.target.value,
            });
          }}
        />
        <label>Full Name En</label>
        <input
          className="border border-black"
          value={profilePayload.full_name_en}
          name="fullnameen"
          onChange={(e) => {
            setProfilePayload({
              username: profilePayload.username,
              avatar_url: profilePayload.avatar_url,
              full_name_en: e.target.value,
              full_name_ka: profilePayload.full_name_ka,
            });
          }}
        />
  
        <button onClick={handleSubmit}>SUBMIT</button>
      </div>
    );
  };
  
  export default ProfileView;