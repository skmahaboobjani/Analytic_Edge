import React from 'react';

const DataGrid = ({ data, onRowClick, sortUsers }) => {
  return (
    <div>
      <h2>Show users</h2>

      <table className="data-grid">
        <thead>
          <tr>
            <th onClick={() => sortUsers('id')}>Id</th>
            <th onClick={() => sortUsers('name')}>Name</th>
            <th onClick={() => sortUsers('email')}>Email</th>
            <th onClick={() => sortUsers('username')}>Username</th>
            <th onClick={() => sortUsers('phone')}>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.username}</td>
              <td>{item.phone}</td>
              <td>
                <button style={{color:'white',backgroundColor:"blue"}} onClick={() => onRowClick(item.id)}>View Posts</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
