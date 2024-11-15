import React from 'react';
import { articles } from '../home/articles/state'
import { ArticleItem } from '../../pages/home/articles/article-item';

export const Home: React.FC = () => {
  return (
  <>
    <div className="articles-container">
      <h2 className="text-2xl font-bold text-white mb-4">Recent Articles</h2>
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
    <aside className="w-1/3 space-y-6 ml-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-white">Popular Tags</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {['Blockchain', 'Cryptocurrency', 'Technology', 'Programming', 'AI', 'Machine Learning'].map(tag => (
            <span key={tag} className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-white">Featured Authors</h3>
        <div className="mt-4 space-y-4">
          {[
            { name: 'Alice Johnson', role: 'Blockchain Enthusiast' },
            { name: 'Bob Smith', role: 'Crypto Analyst' },
            { name: 'Carol Williams', role: 'Tech Journalist' },
          ].map(author => (
            <div key={author.name} className="flex items-center space-x-4">
              <div className="bg-gray-600 rounded-full h-10 w-10"></div>
              <div>
                <p className="font-semibold text-white">{author.name}</p>
                <p className="text-gray-400 text-sm">{author.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  </>
  );
  
};
