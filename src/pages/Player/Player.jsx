import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js';
import 'chartjs-plugin-datalabels';
import './Player.css';
import {Chart, ArcElement} from 'chart.js'
import Navigation from '../../components/Navigation/Navigation';
Chart.register(ArcElement);

const Player = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
    const [playerData, setPlayerData] = useState([]);
    const fetchData = async () => {
        try {
          const token = localStorage.getItem('adminToken');
          const headers = {
            'Authorization': `Bearer ${token}`,
          };
    
          const response = await axios.post(
            'http://localhost:5000/api/v1/player/get-players',
            filter,
            {
              headers: headers, 
            }
          );
    
          setData(response.data.counts);
          setPlayerData(response.data.players);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, [filter]);

  useEffect(() => {
    fetchData();
  }, [filter]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const dataLabels = data.map((item) => item._id);
  const dataCounts = data.map((item) => item.count);

  const chartData = {
    labels: dataLabels,
    datasets: [
      {
        data: dataCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      datalabels: {
        color: '#fff',
        anchor: 'end',
        align: 'start',
        offset: 4,
        font: {
          weight: 'bold',
        },
        formatter: (value) => {
          return value;
        },
      },
    },
  };

  return (
      <div className="PlayerPieChart">
          <Navigation></Navigation>
      <h1 className="PieChartTitle">Players Analysis</h1>
      <div className="ChartContainer">
        
        <div className="PieChart">
          <label>
            Filter by Team or Country:
            <input
              type="text"
              name="team_name"
              placeholder="Team Name"
              className="FilterInput"
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="FilterInput"
              onChange={handleFilterChange}
            />
                  </label>
                  
          <Pie
            data={chartData}
            options={chartOptions}
            className="PieChartCanvas"
                  />
                  <div className="DataList">
          <h2>Data Table</h2>
          <div className="TableContainer">
            <ul>
              {dataLabels.map((label, index) => (
                <li key={label}>
                  {label}: {dataCounts[index]}
                </li>
              ))}
            </ul>
          </div>
        </div>
              </div>
      <div className="DataTable">
        <table>
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Country</th>
              <th>Player Image</th>
              <th>Speciality</th>
              <th>Team Name</th>
              <th>Team Logo</th>
            </tr>
          </thead>
          <tbody>
            {playerData.map((player) => (
              <tr key={player._id}>
                <td>{player.player_name}</td>
                <td>{player.country}</td>
                <td>{player.player_image}</td>
                <td>{player.speciality}</td>
                <td>{player.team_name}</td>
                <td>{player.team_logo}</td>
              </tr>
            ))}
          </tbody>
                  </table>
                  </div>
          </div>
    </div>
  );
};

export default Player;
