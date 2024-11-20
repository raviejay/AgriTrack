import { useEffect, useState } from "react";
import { Table, Spin, Alert, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import * as XLSX from "xlsx";

const BarangayData = () => {
  const [barangayData, setBarangayData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:8000/api/barangay/data")
      .then((response) => {
        console.log("API Response:", response.data); // Debugging
        setBarangayData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err); // Debugging
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  // Filter data based on search input
  const filteredData = barangayData.filter((item) =>
    item.barangay_name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Columns definition for the table
  const columns = [
    {
      title: "Barangay Name",
      dataIndex: "barangay_name",
      key: "barangay_name",
    },
    {
      title: "Total Backyard",
      dataIndex: "total_backyard",
      key: "total_backyard",
    },
    {
      title: "Total Commercial",
      dataIndex: "total_commercial",
      key: "total_commercial",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Export table data to Excel
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Barangay Data");
    XLSX.writeFile(wb, "BarangayData.xlsx");
  };

  return (
    <div style={{ margin: "10px" }}>
      {/* Title and Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 0,
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            margin: 0,
            lineHeight: "1", // Ensures consistent alignment
          }}
        >
          Inventory
        </h2>
        <Space>
          <Input
            placeholder="Search Barangay"
            value={searchText}
            onChange={handleSearchChange}
            style={{
              width: 400,
              height: 35, // Ensure consistent height
              display: "flex",
              alignItems: "center", // Align content inside the input
            }}
            suffix={<SearchOutlined style={{ color: "#6A9C89" }} />}
          />
        </Space>
      </div>

      {/* Export Button */}
      <div style={{ marginTop: "15px", marginBottom: "20px" }}>
        <Button
          type="primary"
          onClick={handleExport}
          style={{ backgroundColor: "#6A9C89", borderColor: "#6A9C89" }}
        >
          Export to Excel
        </Button>
      </div>

      {/* Spinner and Error Handling */}
      {loading && <Spin size="large" />}
      {error && <Alert message={error} type="error" />}

      {/* Table */}
      {!loading && !error && (
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="barangay_name"
          pagination={false}
          style={{
            marginTop: "20px",
          }}
          components={{
            header: {
              cell: (props) => (
                <th
                  {...props}
                  style={{
                    backgroundColor: "#6A9C89",
                    color: "white",
                  }}
                />
              ),
            },
          }}
        />
      )}
    </div>
  );
};

export default BarangayData;
