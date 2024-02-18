import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart } from 'chart.js';
import axios from 'axios';

Chart.register(ArcElement);

const WalletChart = () => {
  const [counts, setCounts] = useState({
    succ_cnt: 0,
    pend_cnt: 0,
    fail_cnt: 0,
  });

  useEffect(() => {

    const adminToken = localStorage.getItem('adminToken');

    const apiUrl = 'http://localhost:5000/api/v1/wallet/get-wallet-cnt';


    const config = {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    };


    axios.get(apiUrl, config)
      .then((response) => {
        setCounts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const cardStyle = {
    width: '70%',
    marginLeft: '10%',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

  const pieChartData = {
    labels: ['Success', 'Pending', 'Failure'],
    datasets: [
      {
        data: [counts.succ_cnt, counts.pend_cnt, counts.fail_cnt],
        backgroundColor: ['#36B9CC', '#4E73DF', '#1CC88A'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    width: 150,
    height: 150,
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Wallet</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1', width: '100%' }}>
          <Card style={cardStyle}>
            <CardHeader title="Success" />
            <CardContent>
              <Typography variant="h4" style={{ color: 'green' }}>{counts.succ_cnt}</Typography>
            </CardContent>
          </Card>
          <Card style={cardStyle}>
            <CardHeader title="Pending" />
            <CardContent>
              <Typography variant="h4" style={{ color: 'orange' }}>{counts.pend_cnt}</Typography>
            </CardContent>
          </Card>
          <Card style={cardStyle}>
            <CardHeader title="Failure" />
            <CardContent>
              <Typography variant="h4" style={{ color: 'red' }}>{counts.fail_cnt}</Typography>
            </CardContent>
          </Card>
        </div>
        <div style={{ flex: '1', marginRight: '10%' }}>
          <Pie data={pieChartData} options={chartOptions}></Pie>
        </div>
      </div>
    </div>
  );
}

export default WalletChart;
