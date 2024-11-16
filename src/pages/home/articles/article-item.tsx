import React from 'react';
import { Article } from '../articles/article'

type ArticleItemProps = {
  article: Article;
};

export const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  return (
    <div className="article-item  border bg-dark-2  p-4 rounded-lg shadow-md mb-6">
      <div className="article-image bg-gray-700 rounded h-48 mb-4 flex items-center justify-center">
       
        <span className="text-gray-200">Image</span>
      </div>
      <h3 className="text-xl  font-semibold mb-2">{article.title}</h3>
      <div className="article-meta  text-gray-400 text-sm mb-2">
        <span>{article.author}</span> <span>•</span> <span>{article.date}</span> <span>•</span> <span>{article.readTime}</span>
      </div>
      <p className="text-gray-300 mb-4">{article.summary}</p>
      <div className="tags flex gap-2">
        {article.tags.map((tag) => (
          <span key={tag} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
