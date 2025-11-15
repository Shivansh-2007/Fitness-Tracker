import React, { useState } from "react";
import { Button, Checkbox, Form, Input, DatePicker, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 
  function disabledFutureDates(current) {
    return current && current > dayjs().endOf("day");
  }

  const onFinish = async (values) => {
    setLoading(true);
    try {
      
      const payload = {
        fullName: values.fullName?.trim(),
        email: values.email?.trim(),
        username: values.username?.trim(),
        password: values.password,
        dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
        confirmPassword: values.confirmPassword,
        agreement: values.agreement
      };

      const res = await axios.post("http://localhost:5001/api/auth/register", payload);

      const msg = res?.data?.message || "Registration successful!";
      setData(msg);
      message.success(msg);

      const { login } = useAuth();
      login({user: res.data.user, accessToken: res.data.accessToken });
      navigate("/dashboard");

    } catch (error) {
      const resp = error?.response?.data;
      let errorMsg = "Registration failed";

      if (resp) {
        if (resp.message) errorMsg = resp.message;
        else if (resp.error) errorMsg = resp.error;
        else if (resp.code === 11000) {
          const key = Object.keys(resp.keyValue || {})[0];
          errorMsg = key ? `${key} already in use` : "Duplicate field value";
        } else if (typeof resp === "string") errorMsg = resp;
      } else if (error.message) {
        errorMsg = error.message;
      }

      setData(errorMsg);
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Registration Failed:", errorInfo);
    message.error("Please fill out all required fields correctly");
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #06402B, #4CAF50)",
      fontFamily: "'Poppins', sans-serif",
      padding: "40px 20px",
      boxSizing: "border-box",
    },
    box: {
      background: "white",
      padding: "40px 30px",
      borderRadius: "15px",
      boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.2)",
      width: "100%",
      maxWidth: "500px",
      textAlign: "center",
    },
    title: { fontSize: "2rem", color: "#06402B", marginBottom: "15px", fontWeight: "bold" },
    subtitle: { color: "#555", marginBottom: "30px" },
    button: { width: "100%", backgroundColor: "#32CD32", borderColor: "#32CD32", fontWeight: "bold", borderRadius: "8px" },
    error: { color: "red", marginTop: "10px", fontWeight: 500 },
    link: { color: "#06402B", fontWeight: "bold", textDecoration: "none" },
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Start your fitness journey today 🚀</p>

        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: "Please input your full name!" }]}>
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email address" />
          </Form.Item>

          <Form.Item label="Date of Birth" name="dob">
            <DatePicker style={{ width: "100%" }} disabledDate={disabledFutureDates} />
          </Form.Item>

          <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please choose a username!" }]}>
            <Input placeholder="Pick a unique username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Create a strong password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("The two passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Re-enter your password" />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[{ validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error("You must accept the terms!"))) }]}
          >
            <Checkbox>
              I agree to the <Link to="/terms">Terms and Conditions</Link>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={styles.button} loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>

        {data && <p style={styles.error}>{data}</p>}

        <p style={{ marginTop: "15px" }}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
