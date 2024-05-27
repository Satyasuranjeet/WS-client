import React, { useState } from 'react';
import axios from 'axios';
import { Codex } from '../Code/Code';
import { Link } from 'react-router-dom'; 

function Home() {
  const [url, setUrl] = useState('');
  const [html, setHtml] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://web-scraping-ten.vercel.app/scrape', { url });
      setHtml(response.data.html);
      setError('');
    } catch (error) {
      setHtml('');
      setError('Failed to fetch HTML content. Please check the URL and try again.');
    }
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className=''>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Web Scraping App</Link>
          <div>
            <Link to="/login" className="mx-2 hover:text-green-600">Logout</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto my-8 px-4">
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
              </svg>
            </div>
            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required onChange={handleChange} />
          </div>
          <button type="submit" className="p-2.5 mt-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block mx-auto">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
        {error && <p className="error mt-4">{error}</p>}
        {html && (
          <div className="codex-container mt-4 overflow-auto">
            <h2 className="text-xl font-semibold mt-4">HTML Content</h2>
            <Codex code={html} language="html" showLineNumbers={true} className="text-justify w-full" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
