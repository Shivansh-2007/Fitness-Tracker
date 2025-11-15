import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    axios.post("http://localhost:5001/api/auth/login", { values })
      .then(response => {
        if (response.status === 200) {
          message.success('Login successful');
          navigate('/dashboard');
        }
        setData(response.data);
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'Login failed';
        setData(errorMessage);
        message.error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Validation failed:', errorInfo);
    message.error('Please fill out all required fields correctly');
  };

  const styles = {
    page: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #06402B -10%, #4CAF50 100%)',
      fontFamily: "'Poppins', sans-serif"
    },
    box: {
      background: 'white',
      padding: '40px 50px',
      borderRadius: '15px',
      boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.2)',
      width: '400px',
      textAlign: 'center'
    },
    title: {
      fontSize: '2rem',
      color: '#06402B',
      marginBottom: '10px',
      fontWeight: 'bold'
    },
    subtitle: {
      color: '#555',
      marginBottom: '25px'
    },
    button: {
      width: '100%',
      backgroundColor: '#32CD32',
      borderColor: '#32CD32',
      fontWeight: 'bold',
      borderRadius: '8px',
      transition: 'all 0.3s ease'
    },
    error: {
      color: 'red',
      marginTop: '10px',
      fontWeight: 500
    },
    footer: {
      marginTop: '15px',
      color: '#333'
    },
    link: {
      color: '#06402B',
      fontWeight: 'bold',
      textDecoration: 'none'
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Log in to continue your fitness journey 💪</p>

        <Form
          name="login-form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              style={styles.button}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        {data && <p style={styles.error}>{data}</p>}

        <p style={styles.footer}>
          Don’t have an account?{' '}
          <a href="/register" style={styles.link}>Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
