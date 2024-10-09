import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AcceptedPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/accepted-patients')
      .then(response => {
        setPatients(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch accepted patients:', error);
        setError('Failed to fetch accepted patients');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  const handleRowClick = (patient) => {
    navigate('/test-booking', { state: { patient } });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Accepted Patients</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">First Name</th>
            <th className="border border-gray-300 px-4 py-2">Last Name</th>
            <th className="border border-gray-300 px-4 py-2">Date of Birth</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Test Type</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(patient)}>
              <td className="border border-gray-300 px-4 py-2">{patient.id}</td>
              <td className="border border-gray-300 px-4 py-2">{patient.first_name}</td>
              <td className="border border-gray-300 px-4 py-2">{patient.last_name}</td>
              <td className="border border-gray-300 px-4 py-2">{patient.dob}</td>
              <td className="border border-gray-300 px-4 py-2">{patient.email}</td>
              <td className="border border-gray-300 px-4 py-2">{patient.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{patient.test_type}</td>
              <td className="border border-gray-300 px-4 py-2">{patient.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AcceptedPatients;
