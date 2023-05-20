




import React, { useEffect, useState } from 'react';
import './App.css';
import DataGrid from './DataGrid';
import PostsPagination from './PostsPagination';

const API_URL = 'https://jsonplaceholder.typicode.com';
const USERS_URL = `${API_URL}/users`;
const pages = 10;

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState(''); // Add sortOrder state
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(USERS_URL)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, filter]);

  const filterUsers = () => {
    if (!filter) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(filter.toLowerCase()) ||
          user.email.toLowerCase().includes(filter.toLowerCase()) ||
          user.username.toLowerCase().includes(filter.toLowerCase()) ||
          user.phone.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const sortUsers = (column) => {
    setSortColumn(column);

    const sorted = [...filteredUsers].sort((a, b) => {
      const A = a[column];
      const B = b[column];

      if (A < B) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (A > B) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredUsers(sorted);
  };

  const handleRowClick = (userId) => {
    setSelectedPostId(null);
    fetch(`${API_URL}/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setTotalPages(Math.ceil(data.length / pages));
      })
      .catch((error) => console.log(error));
  };

  const handlePostPageChange = (pageNumber) => {
    const startIndex = (pageNumber - 1) * pages;
    const endIndex = startIndex + pages;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    setPosts(paginatedPosts);
  };

  const handleCommentClick = (postId) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null);
      setComments([]);
    } else {
      setSelectedPostId(postId);
      fetch(`${API_URL}/comments?postId=${postId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.slice(0, 5));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="app">
      <h1>User Data</h1>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter users"
        className="filter-input"
      />
      <DataGrid
        data={filteredUsers}
        onRowClick={handleRowClick}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        sortUsers={sortUsers}
      />
      {posts.length > 0 && (
        <PostsPagination
          posts={posts}
          onPostPageChange={handlePostPageChange}
          totalPages={totalPages}
          selectedPostId={selectedPostId}
          comments={comments}
          onCommentClick={handleCommentClick}
        />
      )}
    </div>
  );
};

export default App;



