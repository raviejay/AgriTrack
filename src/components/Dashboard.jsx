import { Card, Col, Row, Typography, Spin } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"; // Import Recharts components
import useFetchData from "./useFetchData"; // Import the custom hook
import useFetchChartData from "./useFetchChartData"; // Import the custom hook
const { Text, Title } = Typography;

export default function Dashboard() {
  // Fetch total animals
  const { data: animalCount, loading: loadingAnimals } = useFetchData(
    "http://localhost:8000/api/animal/count"
  );

  // Fetch total livestock
  const { data: livestockCount, loading: loadingLivestock } = useFetchData(
    "http://localhost:8000/api/livestock/total"
  );

  const { data: currentYear, loading: loadingCurrent } = useFetchData(
    "http://localhost:8000/api/livestock/currentyeartotal"
  );

  // Fetch yearly livestock data for chart
  const { data: yearlyLivestockData, loading: loadingYearlyData } =
    useFetchChartData("http://localhost:8000/api/livestock/YearsData");

  // Get current date with month name and year (e.g., "October 2024")
  const currentDate = new Date();
  const options = { year: "numeric", month: "long" }; // Show month name and year
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <div>
      <h3>Dashboard</h3>

      {/* Top 3 boxes */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {/* Card 1: Total Animals */}
        <Col span={8}>
          <Card
            bordered={false}
            style={{
              backgroundColor: "#6A9C89", // Green background
              borderRadius: 0,
              color: "#fff", // White text color for contrast
            }}
          >
            <Text
              strong
              style={{
                fontSize: 24,
                fontFamily: "'Open Sans', sans-serif", // Use Open Sans font
                fontWeight: "900", // Extra bold
                color: "#fff",
              }}
            >
              Total Animals
            </Text>
            <div>
              {loadingAnimals ? (
                <Spin tip="Loading..." style={{ color: "#fff" }} />
              ) : (
                <>
                  <Title
                    level={2}
                    style={{
                      margin: 0,
                      fontFamily: "'Open Sans', sans-serif",
                      fontWeight: "900",
                      color: "#fff",
                    }}
                  >
                    {animalCount !== null ? animalCount : "N/A"}
                  </Title>
                  <Text
                    strong
                    style={{
                      fontSize: 10,
                      fontFamily: "'Open Sans', sans-serif",
                      fontWeight: "900",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    As of now, {formattedDate}
                  </Text>
                </>
              )}
            </div>
          </Card>
        </Col>

        {/* Card 2: Total Livestock */}
        <Col span={8}>
          <Card
            bordered={false}
            style={{
              backgroundColor: "#6A9C89",
              borderRadius: 0,
              color: "#fff",
            }}
          >
            <Text
              strong
              style={{
                fontSize: 24,
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: "900",
                color: "#fff",
              }}
            >
              Total Livestock
            </Text>
            <div>
              {loadingLivestock ? (
                <Spin tip="Loading..." style={{ color: "#fff" }} />
              ) : (
                <>
                  <Title
                    level={2}
                    style={{
                      margin: 0,
                      fontFamily: "'Open Sans', sans-serif",
                      fontWeight: "900",
                      color: "#fff",
                    }}
                  >
                    {livestockCount !== null ? livestockCount : "N/A"}
                  </Title>
                  <Text
                    strong
                    style={{
                      fontSize: 10,
                      fontFamily: "'Open Sans', sans-serif",
                      fontWeight: "900",
                      color: "#fff",
                    }}
                  >
                    As of now, {formattedDate}
                  </Text>
                </>
              )}
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            bordered={false}
            style={{
              backgroundColor: "#6A9C89", // Green background
              borderRadius: 0,
              color: "#fff", // White text color for contrast
            }}
          >
            <Text
              strong
              style={{
                fontSize: 23,
                fontFamily: "'Open Sans', sans-serif", // Use Open Sans font
                fontWeight: "950", // Extra bold
                color: "#fff",
              }}
            >
              Current Year Livestock
            </Text>
            <div>
              {loadingCurrent ? (
                <Spin tip="Loading..." style={{ color: "#fff" }} />
              ) : (
                <>
                  <Title
                    level={2}
                    style={{
                      margin: 0,
                      fontFamily: "'Open Sans', sans-serif",
                      fontWeight: "900",
                      color: "#fff",
                    }}
                  >
                    {currentYear !== null ? currentYear : "N/A"}
                  </Title>
                  <Text
                    strong
                    style={{
                      fontSize: 10,
                      fontFamily: "'Open Sans', sans-serif",
                      fontWeight: "900",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    As of now, {formattedDate}
                  </Text>
                </>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Bottom layout with Chart and Leaderboard */}
      <Row gutter={16}>
        <Col span={16}>
          <Card bordered={false} style={{ height: "100%", borderRadius: 0 }}>
            {loadingYearlyData ? (
              <Spin tip="Loading chart..." />
            ) : (
              <ResponsiveContainer width="100%" height={500}>
                <LineChart data={yearlyLivestockData}>
                  {/* Chart Title */}
                  <Title level={3} style={{ textAlign: "center" }}>
                    Yearly Total Livestock Count
                  </Title>

                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis
                    label={{
                      value: "Total Livestock Count", // Y-axis label text
                      angle: -90, // Rotate label
                      position: "insideLeft", // Position it inside the chart
                      style: { fontSize: "14px", fontWeight: "bold" }, // Style the label
                    }}
                    tickFormatter={(value) => value.toLocaleString()} // Format ticks with commas
                    domain={[0, 400]} // Automatically adjust range based on the data
                    tick={{ angle: -45 }} // Rotate the Y-axis ticks for readability
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total_livestock_count"
                    stroke="#FFA500"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Leaderboard"
            bordered={false}
            style={{ height: "100%", borderRadius: 0 }}
          >
            Leaderboard Content
          </Card>
        </Col>
      </Row>
    </div>
  );
}
