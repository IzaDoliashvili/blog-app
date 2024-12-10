import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { userAtom } from "@/store/auth";
import { supabase } from "@/supabase";
import { useAtom } from "jotai";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type BlogsListCreateValues = {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  image_file: null | File;
};

const BlogsListFilterFormDefaultValues = {
  title_ka: "",
  title_en: "",
  description_ka: "",
  description_en: "",
  image_file: null,
};

const CreateBlogForm = () => {
  const { t, i18n } = useTranslation(); 
  const currentLang = i18n.language; 
  const [user] = useAtom(userAtom);

  const { control, handleSubmit } = useForm<BlogsListCreateValues>({
    defaultValues: BlogsListFilterFormDefaultValues,
  });

  const onSubmit = (formValues: BlogsListCreateValues) => {
    if (formValues?.image_file) {
      supabase.storage
        .from("blog_images")
        .upload(formValues?.image_file?.name, formValues?.image_file)
        .then((res) => {
          const translatedTitle =
            currentLang === "ka" ? formValues.title_ka : formValues.title_en;
          const translatedDescription =
            currentLang === "ka"
              ? formValues.description_ka
              : formValues.description_en;

          return supabase.from("blogs").insert({
            [`title_${currentLang}`]: translatedTitle,
            [`description_${currentLang}`]: translatedDescription,
            image_url: res.data?.fullPath,
            user_id: user?.user?.id,
          });
        })
        .then((res) => {
          console.log("Successfully Created Blog: ", res);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-4 h-max my-12">
      <div className="flex w-96 flex-col items-center justify-center gap-y-4">
        <Controller
          control={control}
          name={`title_${currentLang}` as keyof BlogsListCreateValues}
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                onChange={onChange}
                value={value}
                placeholder={t("Title")}
              />
            );
          }}
        />
        <Controller
          control={control}
          name={`description_${currentLang}` as keyof BlogsListCreateValues}
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                onChange={onChange}
                value={value}
                placeholder={t("Description")}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="image_file"
          render={({ field: { onChange } }) => {
            return (
              <Input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onChange(file);
                }}
                placeholder={t("Upload File")}
              />
            );
          }}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          className={cn(
            buttonVariants({ variant: "link", size: "lg" }),
            "w-full bg-blue-500 text-white"
          )}
        >
          {t("Create Blog")}
        </Button>
      </div>
    </div>
  );
};

export default CreateBlogForm;

// import { Button, buttonVariants } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { userAtom } from "@/store/auth";
// import { supabase } from "@/supabase";
// import { useAtom } from "jotai";
// import { Controller, useForm } from "react-hook-form";
// import { useTranslation } from "react-i18next";

// type BlogsListCreateValues = {
//   title_ka: string;
//   title_ka: string;
//   description_ka: string;
//   description_en: string;
//   image_file: null | File;
// };

// const BlogsListFilterFormDefaultValues = {
//   title: "",
//   description: "",
//   image_file: null,
// };

// const CreateBlogForm = () => {
//   const { t } = useTranslation(); 
//   const [user] = useAtom(userAtom);

//   const { control, handleSubmit } = useForm<BlogsListCreateValues>({
//     defaultValues: BlogsListFilterFormDefaultValues,
//   });

//   const onSubmit = (formValues: BlogsListCreateValues) => {
//     if (formValues?.image_file) {
//       supabase.storage
//         .from("blog_images")
//         .upload(formValues?.image_file?.name, formValues?.image_file)
//         .then((res) => {
//           return supabase.from("blogs").insert({
//             title: formValues.title,
//             description: formValues.description,
//             image_url: res.data?.fullPath,
//             user_id: user?.user?.id,
//           });
//         })
//         .then((res) => {
//           console.log("Successfully Created Blog: ", res);
//         });
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center gap-y-4 h-max my-12">
//       <div className="flex w-96 flex-col items-center justify-center gap-y-4">
//         <Controller
//           control={control}
//           name="title"
//           render={({ field: { onChange, value } }) => {
//             return (
//               <Input onChange={onChange} value={value} placeholder="Title" />
//             );
//           }}
//         />
//         <Controller
//           control={control}
//           name="description"
//           render={({ field: { onChange, value } }) => {
//             return (
//               <Input
//                 onChange={onChange}
//                 value={value}
//                 placeholder="Description"
//               />
//             );
//           }}
//         />
//         <Controller
//           control={control}
//           name="image_file"
//           render={({ field: { onChange } }) => {
//             return (
//               <Input
//                 type="file"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   onChange(file);
//                 }}
//                 placeholder="File"
//               />
//             );
//           }}
//         />
//         <Button
//             onClick={handleSubmit(onSubmit)}
//             className={cn(buttonVariants({ variant: "link", size: "lg" }), "w-full bg-blue-500 text-white")}
//           >
//             {t("Create Blog")}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default CreateBlogForm;