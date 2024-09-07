import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth'; 
const Service = () => {
  const [services, setServices] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);
      // Error state
  const {API} = useAuth()

  console.log(API)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/api/auth/service`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Fetched Data:', result); // Log the data to inspect structure

        if (result && result.msg) {
          // Flatten services objects into an array
          const servicesArray = Object.entries(result.msg[0]).map(([key, value]) => ({ id: key, ...value }));
          setServices(servicesArray);
        } else {
          throw new Error('Invalid data structure received from API');
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section>
        <div>
          <h1>Services</h1>
          <p>Loading services...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div>
          <h1>Services</h1>
          <p>Error loading services: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div>
        <h1>Our Services</h1>
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service.id} style={styles.serviceCard}>
              <h2>{service.service}</h2>
              <p>{service.description}</p>
              <p><strong>Price:</strong> {service.price}</p>
              <p><strong>Provider:</strong> {service.provider}</p>
            </div>
          ))
        ) : (
          <p>No services available at the moment.</p>
        )}
      </div>
    </section>
  );
};

// Optional: Inline styles for basic styling
const styles = {
  serviceCard: {
    border: '1px solid #ccc',
    padding: '16px',
    marginBottom: '16px',
    borderRadius: '8px',
  },
};

export default Service;
