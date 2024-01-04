'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick, handleUserClick }) => {
  return (
    <div className='mt-16 mb-40 prompt_layout '>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleUserClick={handleUserClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompt(tagName);
    setSearchedResults(searchResult);
  };

  const handleUserClick = (userName) => {
    setSearchText(userName);
    const searchResult = filterPrompt(userName);
    setSearchedResults(searchResult);
  };

  const filterPrompt = (searchText) => {
    const regex = new RegExp(searchText, 'i'); // case insensitive
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    //debounce
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompt(e.target.value);

        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          handleUserClick={handleUserClick}
        />
      ) : (
        <PromptCardList
          data={allPosts}
          handleTagClick={handleTagClick}
          handleUserClick={handleUserClick}
        />
      )}
    </section>
  );
};

export default Feed;
