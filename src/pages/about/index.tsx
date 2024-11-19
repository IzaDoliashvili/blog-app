import React from "react";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export const About: React.FC = () => {
  return (
    <div className="min-h-screen  ">
      <section className="text-center p-16 ml-20 mr-20">
        <h1 className="text-4xl font-semibold mb-2">About BitBlogs</h1>
        <p className="text-lg mb-8">
          Empowering tech enthusiasts to share knowledge and inspire innovation.
        </p>

        <div className="flex justify-center gap-16">
          <div className="max-w-xs">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-sm">
              At bitBlogs, we believe in the power of shared knowledge. Our
              mission is to create a platform where tech enthusiasts, developers,
              and innovators can come together to share ideas, learn from each
              other, and push the boundaries of what's possible in the world of
              technology.
            </p>
          </div>
          <div className="max-w-xl">
           <div className="w-80 h-80 bg-white"/>
          </div>

          
        </div>
      </section>
      <section className="text-center p-16 ml-20 mr-20">
      <div className="w-full">
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <div className=" gap-x-4 flex flex-row">
              <div className="flex items-center gap-2 flex-col p-10 border">
                <span className="text-lg">📚</span>
                <h3 className="text-lg font-semibold">Rich Content</h3>
                <div>
                  
                  <p className="text-sm">
                    Access a wide range of articles, tutorials, and insights on
                    the latest tech trends and best practices.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-col p-10 border">
                <span className="text-lg">🌍</span>
                <div>
                  <h3 className="text-lg font-semibold">Vibrant Community</h3>
                  <p className="text-sm">
                    Connect with like-minded individuals, share your knowledge,
                    and grow your professional network.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-col p-10 border">
                <span className="text-lg">⚡</span>
                <div>
                  <h3 className="text-lg font-semibold">Cutting-edge Topics</h3>
                  <p className="text-sm">
                    Stay ahead of the curve with content covering emerging
                    technologies and innovative solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
      </section>
      <section className=" text-center py-16 ml-20 mr-20">
        <div className="flex flex-col items-start p-8 bg-slate-600">
            <h3 className="text-3xl font-semibold">Our Story</h3>
            <span className="text-lg my-3">Founded in 2023, bitBlogs started as a small project by a group of passionate developers who wanted to create a space for sharing their experiences and learning from others. What began as a simple blog quickly grew into a thriving community of tech enthusiasts from all around the world.</span>
            <span className="text-lg my-3">Today, bitBlogs is proud to be a leading platform for technology-focused content, fostering innovation and collaboration in the ever-evolving world of tech.</span>
        </div>

      </section>

      <section className="text-center py-16 ml-20 mr-20">
        <h2 className="text-3xl font-semibold mb-4">Join Us on Our Journey</h2>
        <p className="mb-8">Whether you're a seasoned developer, a curious beginner, or somewhere in between, there's a place for you at bitBlogs. Let's shape the future of technology together.</p>
        <Link to="/signup">
          <Button className={cn("bg-blue-600 text-white px-6 py-3")}>
            Get Started Today
          </Button>
        </Link>
      </section>
    </div>
  );
};