import { useState, useEffect } from "react";
import { Table, Spin, Alert, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons"; // Import the search icon
import axios from "axios";
import * as XLSX from "xlsx"; // Import the xlsx library

const FarmerDetails = () => {
  const [farmerData, setFarmerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState(""); // For search functionality

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        // Get the auth token from localStorage
        const authToken = localStorage.getItem("authToken");

        // If no auth token, show error
        if (!authToken) {
          setError("Authorization token not found.");
          setLoading(false);
          return;
        }

        // Fetch data from API
        const response = await axios.get(
          "http://localhost:8000/api/farmers/details",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // Set data to state
        setFarmerData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, []);

  // Define columns for Ant Design Table
  const columns = [
    {
      title: "Farmer Name",
      dataIndex: "farmer_name",
      key: "farmer_name",
    },
    {
      title: "Barangay",
      dataIndex: "barangay",
      key: "barangay",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Date Added",
      dataIndex: "added_date",
      key: "added_date",
    },
  ];

  // Handle Search Filter
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = farmerData.filter((farmer) =>
    farmer.farmer_name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Function to export table data to Excel
  const handleExport = () => {
    // Create a worksheet from the filtered data
    const ws = XLSX.utils.json_to_sheet(filteredData);

    // Create a new workbook and append the worksheet to it
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Farmers Data");

    // Write the workbook to a file
    XLSX.writeFile(wb, "FarmersData.xlsx");
  };

  return (
    <div style={{ margin: "10px" }}>
      {/* Inventory Title and Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontWeight: "bold" }}>Inventory</h2>
        <Space>
          <Input
            placeholder="Search by Farmer Name"
            value={searchText}
            onChange={handleSearchChange}
            style={{ width: 200 }}
            suffix={<SearchOutlined style={{ color: "#6A9C89" }} />} // Search icon with custom color
          />
        </Space>
      </div>

      {/* Export Button */}
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
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
          dataSource={filteredData} // Use filtered data based on search input
          rowKey="farmer_name" // You can use any unique identifier here
          pagination={false} // Optional: if you want to disable pagination
          style={{
            marginTop: "20px", // To push the table below the title
          }}
          // Custom styles for column headers
          components={{
            header: {
              cell: (props) => {
                return (
                  <th
                    {...props}
                    style={{
                      backgroundColor: "#6A9C89", // Green background for headers
                      color: "white", // White text for the header
                    }}
                  />
                );
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default FarmerDetails;
