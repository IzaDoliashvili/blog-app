import { Input } from "@/components/ui/input";
import { supabase } from "@/supabase";
import qs from "qs";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import underscore from "underscore";

type SingleBlog = {
  created_at: string;
  description_en: string | null;
  id: number;
  image_url: string | null;
  title_en: string | null;
  user_id: string | null;
  title_ka: string;
  description_ka: string;
  image_file: null | File;
};

type BlogsFilterFormValues = {
  searchText: string;
};


const BlogList = () => {
  const [blogs, setBlogs] = useState<SingleBlog[]>([]);
  const [searchParams] = useSearchParams();
  const parsedQueryParams = qs.parse(searchParams.toString());

  const { control, watch } = useForm<BlogsFilterFormValues>({
    defaultValues: parsedQueryParams,
  });

  useEffect(() => {
    const parsedSearchParams = qs.parse(searchParams.toString());

    const searchText = parsedSearchParams?.searchText;

    supabase
      .from("blogs")
      .select("*")
      .ilike("title_en", `%${searchText ?? ""}%`)
      .throwOnError()
      .then((res) => {
        const blogsList = res.data as unknown as SingleBlog[];
        setBlogs(blogsList); console.log(blogsList);

      });
      
  }, []);

  

  const watchedSearchText = watch("searchText");

  const fetchBlogs = useCallback(
    underscore.debounce((watchedSearchText: string) => {
      supabase
        .from("blogs")
        .select("*")
        .ilike("title_en", `${watchedSearchText}%`)
        .throwOnError()
        .then((res) => {
          const blogsList = res.data as unknown as SingleBlog[];
          setBlogs(blogsList);
        });
    }, 500),
    [],
  );

  useEffect(() => {
    if (watchedSearchText?.length > 3) {
      fetchBlogs(watchedSearchText);
    }
  }, [watchedSearchText, fetchBlogs]);


  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex items-center justify-center gap-x-4 px-44">
        <Controller
          control={control}
          name="searchText"
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                onChange={onChange}
                value={value}
                placeholder="Enter Search Text..."
              />
            );
          }}
        />
      </div>
      <div className="flex flex-col gap-y-10 px-32">
        {blogs.map((blog) => {
          const blogImageUrl = blog?.image_url
            ? `${import.meta.env.VITE_SUPABASE_BLOG_IMAGES_STORAGE_URL}/${blog?.image_url}`
            : "";

          return (
            <div
              key={blog.id}
              className="flex flex-col gap-y-4 border border-gray-400 p-6"
            >
              <div>
                <img className="border border-black" src={blogImageUrl} />
              </div>
              <div>{blog.title_en}</div>
              <div>{blog.description_en}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;