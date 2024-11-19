
import { useLocation, useParams } from 'react-router-dom';
import { articles } from '../home/articles/state';
import { ArticleItem } from '../home/articles/article-item';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub, FaUsers } from "react-icons/fa";
import { Button } from "@/components/ui/button"

const AuthorPage = () => {
  const { authorName } = useParams();
  const { state } = useLocation();
  const author = state?.author || { role: 'Unknown role' };
  const authorArticles = articles.filter((article) => article.author === authorName);

  return (
    <>
      <div className="min-h-full mt-10 flex flex-col items-center justify-center">
        <div className=" w-3/4 p-6 border rounded-lg shadow-lg">
          <div className="flex items-center mb-6">
            <div className="bg-gray-600 rounded-full h-16 w-16 mr-6"></div>
            <div>
              <h1 className="text-3xl font-bold">{authorName}</h1>
              <p className="text-gray-400">{author.role}</p>
            </div>
          </div>
          <p>
            Tech enthusiast, software engineer, and avid blogger. Passionate about AI,
            web development, and the future of technology.
          </p>
          <div className="flex space-x-6 mt-6">
            <Button variant="outline" size="icon">
              <FaTwitter className='rounded-xl' />
            </Button>
            <Button variant="outline" size="icon">
               <FaFacebook />
            </Button>
            <Button variant="outline" size="icon">
              <FaLinkedin />
            </Button>
            <Button variant="outline" size="icon">
              <FaGithub />
            </Button>
          </div>
          <div className="mt-4 flex space-x-4">
            <div className='flex gap-x-2'>
            <FaUsers className="text-gray-500 text-xl" />
            <p> 1234 Followers</p>
            </div>
            <div className='flex gap-x-2'>
            <FaUsers className="text-gray-500 text-xl" />
            <p> 567 Following</p>
            </div>
            
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center  mt-6">
        <Tabs defaultValue="articles" className='  w-3/4'>
          <TabsList className="mb-4">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <div className="space-y-6">
              {authorArticles.length > 0 ? (
                authorArticles.map((article) => (
                  <ArticleItem key={article.id} article={article} />
                ))
              ) : (
                <p className="text-gray-400 text-center">No articles found for this author.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div className="p-6 border rounded-lg shadow-lg bg-gray-800">
              <h2 className="text-2xl font-bold mb-4">About {authorName}</h2>
              <p className="text-gray-300">
                Jane Doe is a tech enthusiast, software engineer, and avid blogger. Passionate
                about AI, web development, and the future of technology. With over 5 years of
                experience in the tech industry, she has contributed to numerous projects and
                articles, inspiring others to explore and innovate in the field of technology.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AuthorPage;
