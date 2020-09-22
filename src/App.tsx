import React, { useState, useEffect, FC } from 'react';
import { Button, Result } from 'antd';
import './App.css';

import environment from './relay-env';
import { graphql, QueryRenderer } from 'react-relay';

import LoginMutation from './mutations/LoginMutation'
import { stringify } from 'querystring';

const email = 'ben@cerbs.net';
const password = 'jenova';

const App: FC = () => {
  const [user, setUser] = useState({
    id: null,
    firstName: String,
    lastName: String,
    email: String
  });

  const login = () => {
    LoginMutation(email, password, (data: any) => {
      localStorage.setItem('token', data.login.id)
      setUser(data.login.user)
    })
  }

  useEffect(() => {
    login();
  }, []);

  return (
    <div className="App">
      { user.id && (
        <Result
          status="success"
          title="Successfully logged in!"
          subTitle={`${user.firstName} ${user.lastName} - email: ${user.email}`}
        />
      )}
    </div>
  );
};

export default App;
