import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const UserGraph = () => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    fetchData();
  }, [year, month]);

  const fetchData = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');

      const response = await axios.post(
        'http://13.235.87.222:5000/api/v1/user/user-cnt',
        {
          year: year,
          month: month,
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`, 
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const pieData = {
    labels: data.map((item) => item.date.split('T')[0]),
    datasets: [
      {
        label: 'Users Visited',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
        data: data.map((item) => item.count),
      },
    ],
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 2000; year--) {
      years.push(year);
    }
    return years;
  };

  const generateMonthOptions = () => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    return months;
  };

  const containerStyle = {
    width: '30%',
    height: '30vh',
  };

  return (
    <div>
      <div>
        <label>Select Year: </label>
        <select onChange={(e) => setYear(e.target.value)} value={year}>
          {generateYearOptions().map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Month: </label>
        <select onChange={(e) => setMonth(e.target.value)} value={month}>
          {generateMonthOptions().map((mon) => (
            <option key={mon} value={mon}>
              {mon}
            </option>
          ))}
        </select>
      </div>
      <div style={containerStyle}>
        <Pie data={pieData} />
      </div>

      <h2>User Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Count</th>
            <th>Users</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.date.split('T')[0]}</td>
              <td>{item.count}</td>
              <td>
                <ul>
                  {item.users.map((user) => (
                    <li key={user._id}>
                      {`${user.firstName} (${user.phoneNumber}) - Last Visited: ${user.lastVisited}`}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserGraph;
