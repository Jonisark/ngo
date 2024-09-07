import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';

const AdminContact = () => {
  const { authorization,API } = useAuth();
  const [contactData, setContactData] = useState([]);
  const [error, setError] = useState(null);

  const getContactData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts`, {
        method: 'GET',
        headers: {
          Authorization: authorization,
        },
      });
      const data = await response.json();
      console.log('contact data', data);

      if (response.ok) {
        // Access the `contacts` array from the data object
        if (Array.isArray(data.contacts)) {
          setContactData(data.contacts);
        } else {
          setContactData([]); // Set to empty array if data is not in expected format
        }
      } else {
        setError('Failed to fetch contact data');
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred while fetching data');
    }
  };

  const deleteContactById = async(id) => {
    try {
      const response = await fetch(`${API}/admin/contacts/delete/${id}`,{
        method: "DELETE",
        headers: {

          Authorization: authorization,
        }
      })
      if(response.ok) {
        getContactData()
        alert('Deleted succesful')
      }else {
        alert('not deleted')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getContactData();
  }, []);

  return (
    <div>
      <h1>Contacts</h1>
      {error && <p>{error}</p>}
      {contactData.length > 0 ? (
        contactData.map((curelm, index) => {
          const { username, email, message,_id } = curelm;
          return (
            <div key={index}>
              <p>{username}</p>
              <p>{email}</p>
              <p>{message}</p>
              <button onClick={() => deleteContactById(_id)}>Delete</button>
            </div>
          );
        })
      ) : (
        <p>No contacts available</p>
      )}
    </div>
  );
};

export default AdminContact;
