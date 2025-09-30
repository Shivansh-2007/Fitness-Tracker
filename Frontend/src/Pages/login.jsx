import React, { useState } from 'react';
import Navbar from '../Components/navbar';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    axios.post("http://localhost:5001/api/auth/login", {values})
      .then(response => {
        if (response.status === 200) {
          message.success('Login successful');
          navigate('/dashboard');
        }
        setData(response.data);
        console.log("Response:", response.data);
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'Login failed';
        setData(errorMessage);
        console.error("Login error:", error);
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

  return (
    <div>
      <Navbar />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: '20px auto' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item 
          name="remember" 
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p style={{display: 'flex', justifyContent: 'center', color: 'red'}}>{data}</p>
    </div>
  );
};

export default Login;