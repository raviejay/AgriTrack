import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from "antd";

const { Option } = Select;

const DataEntry = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/dataEntry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Data submitted successfully!");
        form.resetFields();
      } else {
        const errorData = await response.json();
        message.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      message.error("An error occurred while submitting the data.");
    }
  };

  // Updated color palette
  const headerColor = "#6A9C89";
  const lighterShade = "#E6F5E4";
  const borderColor = "#CBD5E0";

  return (
    <div style={{ margin: "10px" }}>
      {/* Adjusted h2 to align better */}
      <h2
        style={{
          fontWeight: "bold",
          margin: 0,
          lineHeight: "1", // Ensures consistent alignment
        }}
      >
        Data Entry
      </h2>

      {/* Form Section */}

      <div style={{ padding: "20px", backgroundColor: "#FFFFFF" }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            quantity: 1,
          }}
        >
          {/* Farmer Information */}
          <Card
            title="Farmer Information"
            style={{
              marginBottom: "20px",
              borderRadius: "8px",
              backgroundColor: lighterShade,
              border: `1px solid ${borderColor}`,
            }}
            headStyle={{
              background: headerColor,
              color: "#ffffff",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your first name",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: headerColor }} />}
                    placeholder="Enter first name"
                    style={{
                      borderRadius: "6px",
                      border: `1px solid ${borderColor}`,
                      padding: "8px",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="last_name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your last name",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: headerColor }} />}
                    placeholder="Enter last name"
                    style={{
                      borderRadius: "6px",
                      border: `1px solid ${borderColor}`,
                      padding: "8px",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Contact"
              name="contact"
              rules={[
                {
                  required: true,
                  message: "Please enter your contact number",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined style={{ color: headerColor }} />}
                placeholder="Enter contact number"
                style={{
                  borderRadius: "6px",
                  border: `1px solid ${borderColor}`,
                  padding: "8px",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Barangay Name"
              name="barangay_name"
              rules={[
                {
                  required: true,
                  message: "Please enter your barangay name",
                },
              ]}
            >
              <Input
                placeholder="Enter barangay name"
                style={{
                  borderRadius: "6px",
                  border: `1px solid ${borderColor}`,
                  padding: "8px",
                }}
              />
            </Form.Item>
          </Card>

          {/* Animal Information */}
          <Card
            title="Animal Information"
            style={{
              borderRadius: "8px",
              backgroundColor: lighterShade,
              border: `1px solid ${borderColor}`,
            }}
            headStyle={{
              background: headerColor,
              color: "#ffffff",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Kind of Animal"
                  name="animal_name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the animal name",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter animal name"
                    style={{
                      borderRadius: "6px",
                      border: `1px solid ${borderColor}`,
                      padding: "8px",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      type: "number",
                      min: 1,
                      message: "Please enter a valid quantity",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Enter quantity"
                    style={{
                      width: "100%",
                      borderRadius: "6px",
                      border: `1px solid ${borderColor}`,
                      padding: "5px",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Breed of Animal"
                  name="kind_of_animal"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the breed of animal",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter breed of animal"
                    style={{
                      borderRadius: "6px",
                      border: `1px solid ${borderColor}`,
                      padding: "8px",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    { required: true, message: "Please select a category" },
                  ]}
                >
                  <Select
                    placeholder="Select category"
                    style={{
                      borderRadius: "6px",
                      border: `1px solid ${borderColor}`,
                      height: "40px",
                    }}
                  >
                    <Option value="commercial">Commercial</Option>
                    <Option value="backyard">Backyard</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Year"
              name="year"
              rules={[{ required: true, message: "Please enter a year" }]}
            >
              <Input
                placeholder="Enter year"
                style={{
                  borderRadius: "6px",
                  border: `1px solid ${borderColor}`,
                  padding: "8px",
                }}
              />
            </Form.Item>
          </Card>

          {/* Submit Button */}
          <Form.Item style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: headerColor,
                borderColor: "#2F855A",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#fff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2F855A")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = headerColor)
              }
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DataEntry;
