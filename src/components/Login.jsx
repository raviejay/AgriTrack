import { Button, Input, Form, message } from "antd";
import axios from "axios";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./login.css";

const Login = () => {
  const onFinish = async (values) => {
    try {
      // Send a POST request to your backend API
      const response = await axios.post("http://localhost:8000/api/login", {
        email: values.email,
        password: values.password,
      });

      // Check if the login was successful and the token is present
      if (response.data.token) {
        const token = await response.data.token;
        const user_type = await response.data.user_type;
        // Store the token in local storage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userType", user_type);

        // Show success message
        message.success({
          content: "Login success!",
          duration: 4,
          icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
        // Redirect to a different page if necessary
        // Example: window.location.href = "/dashboard";
      } else {
        message.error(
          response.data.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      // Handle error response
      message.error("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <div className="background-blur"></div>
      <div className="login-form-wrapper">
        <h2 className="login-title">Login</h2>
        <Form
          name="login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="login-form"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
