import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [load, setLoad] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })
  const [users, setUsers] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
    console.log(userData);
  }

  const handleOnSubmit = (e) => {
    fetch('http://localhost:8888/api/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(() => {
      setLoad(!load)
    })
    e.preventDefault();
  }
const SERVER_URL = 'https://airtable-crud.netlify.app'
  useEffect(() => {
    fetch(`${SERVER_URL}/api/loadUser`).then((res) => res.json()).then((data) => {
      setUsers(data.users)
    });
  }, [load])

  const deleteUser = (id) => {
    fetch(`${SERVER_URL}/api/deleteUser?id=${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      }

    }).then(() => setLoad(!load))
  }
  return (
    <div className="App">
      <form onSubmit={handleOnSubmit}>
        <div className='inputContainer'>
          <label htmlFor="First name">
            First Name
            <input name="firstName" type="text" onChange={handleChange} />
          </label>
          <label htmlFor="Last name">
            Last Name
            <input name="lastName" type="text" onChange={handleChange} />
          </label>
          <label htmlFor="Email">
            Email
            <input name="email" type="text" onChange={handleChange} />
          </label>
          <label htmlFor="Phone">Phone<input name="phone" type="text" onChange={handleChange} /></label>
        </div>
        <button type="submit">Submit</button>
      </form>

      <div>
        <table border="1" >
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              users.length ? users.map(user => {
                return (
                  <tr key={user._id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button onClick={() => deleteUser(user._id)}>remove</button>
                    </td>
                  </tr>
                )
              }) : null
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
