import React from 'react';
import { NavLink } from 'react-router-dom';
import NavigationBar from './Navbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Home = () => {
  return (
    <div>
      <NavigationBar />
        <h1 style={{textAlign:'center'}}>Dashboard</h1>
        <p style={{textAlign:'center'}}>Welcome back, Admin! Track the app progress</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                <Card style={{ width: '45%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
                <CardContent>
                <Typography variant="h5" component="div">
                        Track Transactions status
                </Typography>
                <Button
                variant="contained"
                color="primary"
                component={NavLink}
                to="/wallet"
                style={{ marginTop: '10px' }} // Add margin to the top
                >
                Track
                </Button>
                </CardContent>
                </Card>

                <Card style={{ width: '45%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
                <CardContent>
                <Typography variant="h5" component="div">
                Track User Activation Status
                </Typography>
                <Button
                variant="contained"
                color="primary"
                component={NavLink}
                to="/user"
                style={{ marginTop: '10px' }} // Add margin to the top
                >
                Track
                </Button>
                </CardContent>
                </Card>
        </div>
    </div>
  );
};

export default Home;
