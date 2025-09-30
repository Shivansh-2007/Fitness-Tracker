import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, DatePicker, message } from 'antd';
import Navbar from '../Components/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Register = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    axios.post("http://localhost:5001/api/auth/register", {values})
      .then(response => {
        setData(response.data.message);
        message.success('Registration successful!');
        setTimeout(() => {
          navigate('/login');
        }, 2);
      })
      .catch(error => {
        const errorMsg = error.response?.data?.message || 'Registration failed';
        setData(errorMsg);
        message.error(errorMsg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Registration Failed:', errorInfo);
    message.error('Please fill out all required fields correctly');
  };

  return (
    <div>
      <Navbar />
      <Form
        name="register"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: '20px auto' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dob"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please choose a username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 8, message: 'Password must be at least 8 characters!' }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
          rules={[
            { validator: (_, value) => 
              value ? Promise.resolve() : Promise.reject('You must accept the terms!') 
            }
          ]}
        >
          <Checkbox>
            I agree to the <a href="/terms">Terms and Conditions</a>
          </Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            block
            loading={loading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <p style={{display: 'flex', justifyContent: 'center', color: 'red'}}>{data}</p>
    </div>
  );
};

export default Register;