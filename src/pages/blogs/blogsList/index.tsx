import { Input } from "@/components/ui/input";
import { supabase } from "@/supabase";
import qs from "qs";
import {useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
dayjs.extend(relativeTime);

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
  const watchedSearchText = watch("searchText");
  const debounsedSearchText = useDebounce(watchedSearchText,500)

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


  useEffect(() => {
    if (debounsedSearchText?.length > 3) {
      supabase
        .from("blogs")
        .select("*")
        .ilike("title_en", `${watchedSearchText}%`)
        .throwOnError()
        .then((res) => {
          const blogsList = res.data as unknown as SingleBlog[];
          setBlogs(blogsList);
        });
    }
  }, [debounsedSearchText]);


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
          const creationTime = dayjs(blog.created_at);
          const isRecent = dayjs().diff(creationTime, "day") < 1;
          const formattedCreationTime = isRecent
            ? creationTime.fromNow()
            : creationTime.format("HH:mm - DD/MM/YYYY");

          return (
            <Card key={blog.id}>
              <CardHeader>
                <CardTitle>{blog.title_en}</CardTitle>
                <CardDescription>{blog.description_en}</CardDescription>
              </CardHeader>
              <CardContent>
                 <img  src={blogImageUrl} />
              </CardContent>
              <CardFooter>
                  {isRecent
                  ? `Created ${formattedCreationTime}`
                  : `Creation time: ${formattedCreationTime}`}
              </CardFooter>
            </Card>
  
          )}
        )}
    </div>
    </div>
  );
};

export default BlogList;