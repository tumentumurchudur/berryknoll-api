import axios from 'axios';
import React, { useState } from 'react';
import { Grid, TextField, Paper, Button, Typography } from '@material-ui/core';
import './App.css';

const BASE_URL = 'http://107.21.184.232';

function App() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!userName || !password) {
      return;
    }

    setIsLoading(true);

    axios
      .post(`${BASE_URL}/v1/auth/login`, { email: userName, password })
      .then(function (response) {
        // handle success
        setToken(response?.data?.tokens?.access?.token);
        setLoggedIn(true);
      })
      .catch(function (error) {
        // handle error
        setLoggedIn(false);
      })
      .finally(function () {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <div>Logging in...</div>;
  }

  if (loggedIn) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="subtitle1" gutterBottom>
          You are logged in successfully!
        </Typography>
        <Typography variant="body1" gutterBottom>
          {token}
        </Typography>
      </div>
    );
  }

  return (
    <div className="App">
      <Typography variant="subtitle1" gutterBottom>
        Welcome to my app!
      </Typography>

      <Paper>
        <Grid container spacing={3} direction={'column'} justify={'center'} alignItems={'center'}>
          <Grid item xs={12}>
            <TextField
              value={userName}
              label="Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={password}
              label="Password"
              type={'password'}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={handleLogin}>
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default App;
