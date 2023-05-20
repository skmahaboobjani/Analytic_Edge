

import React,{useState} from 'react';
import './App.css';
import Comments from './Comments';
const pages = 10;

const PostsPagination = ({
  posts,
  onPostPageChange,
  totalPages,
  selectedPostId,
  comments,
  onCommentClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginationClick = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
    onPostPageChange(pageNumber);
  };

  const startIndex = (currentPage - 1) * pages;
  const endIndex = startIndex + pages;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return (
    <div>
      <h2>Posts</h2>
      <table className="data-grid">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>
                {selectedPostId === post.id ? (
                  <button style={{color:"white",backgroundColor:"blue"}} onClick={() => onCommentClick(post.id)}>Hide Comments</button>
                ) : (
                  <button  style={{color:"white",backgroundColor:"blue"}} onClick={() => onCommentClick(post.id)}>View Comments</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPostId && <Comments postId={selectedPostId} comments={comments} />}
      <div className="pagination">
        {Array.from({ length: totalPages - 1 }, (_, index) => index + 2).map((page) => (
          <button
            key={page}
            onClick={() => handlePaginationClick(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostsPagination;



