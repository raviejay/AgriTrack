import { useEffect, useState } from "react";
import { Table, Spin, Alert } from "antd";

const BarangayData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8000/api/Barangay/Data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  // Define the columns for Ant Design Table
  const columns = [
    {
      title: "Barangay Name",
      dataIndex: "barangay_name",
      key: "barangay_name",
    },
    {
      title: "Total Backyard Count",
      dataIndex: "total_backyard_count",
      key: "total_backyard_count",
      render: (text) => (text ? text : "N/A"), // Handle null values
    },
    {
      title: "Total Commercial Count",
      dataIndex: "total_commercial_count",
      key: "total_commercial_count",
      render: (text) => (text ? text : "N/A"), // Handle null values
    },
  ];

  // Conditional rendering for loading, error, or data
  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="barangay_name"
      pagination={false}
    />
  );
};

export default BarangayData;
