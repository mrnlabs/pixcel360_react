import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Define types
type TimePeriod = "daily" | "weekly" | "monthly";

interface UserData {
  date: string;
  fullDate: string;
  newUsers: number;
  activeUsers: number;
}

interface UserAnalyticsData {
  data: UserData[];
  totals: {
    newUsers: number;
    activeUsers: number;
    retentionRate: number;
  };
}

interface UserAnalytics {
  daily: UserAnalyticsData;
  weekly: UserAnalyticsData;
  monthly: UserAnalyticsData;
}

interface PageProps {
  metrics: {
    cards: any[];
    userAnalytics: UserAnalytics;
  };
}

const DBarChart: React.FC = ({userAnalytics}: any) => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("monthly");
  const [chartData, setChartData] = useState<UserData[]>([]);
  const [totals, setTotals] = useState({
    newUsers: 0,
    activeUsers: 0,
    retentionRate: 0
  });

  // Update chart data when time period changes
  useEffect(() => {
    const analyticsData = userAnalytics[timePeriod];
    setChartData(analyticsData.data);
    setTotals(analyticsData.totals);
  }, [timePeriod, userAnalytics]);

  return (
    <div className="box">
      <div className="box-header justify-between">
        <div className="box-title">User Analytics</div>
        <div className="flex gap-2">
          <button
            className={`ti-btn ti-btn-sm ${timePeriod === "daily" ? "ti-btn-light" : "ti-btn-outline-light"}`}
            onClick={() => setTimePeriod("daily")}
          >
            Daily
          </button>
          <button
            className={`ti-btn ti-btn-sm ${timePeriod === "weekly" ? "ti-btn-light" : "ti-btn-outline-light"}`}
            onClick={() => setTimePeriod("weekly")}
          >
            Weekly
          </button>
          <button
            className={`ti-btn ti-btn-sm ${timePeriod === "monthly" ? "ti-btn-light" : "ti-btn-outline-light"}`}
            onClick={() => setTimePeriod("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="box-body pb-1">
        <div style={{ minHeight: "345px" }} className="w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "10px",
                }}
                formatter={(value, name) => [
                  value.toLocaleString(),
                  name === "newUsers" ? "New Users" : "Active Users",
                ]}
                labelFormatter={(label, items) => {
                  // Find the corresponding data item to get the full date
                  const item = chartData.find(d => d.date === label);
                  return item ? `Date: ${item.fullDate}` : `Date: ${label}`;
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) =>
                  value === "newUsers" ? "New Users" : "Active Users"
                }
              />
              <Bar
                dataKey="newUsers"
                fill="#4f46e5"
                radius={[4, 4, 0, 0]}
                name="newUsers"
                barSize={timePeriod === "monthly" ? 16 : 24}
              />
              <Bar
                dataKey="activeUsers"
                fill="#06b6d4"
                radius={[4, 4, 0, 0]}
                name="activeUsers"
                barSize={timePeriod === "monthly" ? 16 : 24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Totals summary */}
        <div className="flex justify-between mt-6 px-4">
          <div className="text-center">
            <p className="text-sm text-textmuted">Total New Users</p>
            <h4 className="font-semibold">{totals.newUsers.toLocaleString()}</h4>
          </div>
          <div className="text-center">
            <p className="text-sm text-textmuted">Total Active Users</p>
            <h4 className="font-semibold">{totals.activeUsers.toLocaleString()}</h4>
          </div>
          <div className="text-center">
            <p className="text-sm text-textmuted">Average Retention</p>
            <h4 className="font-semibold">{totals.retentionRate.toFixed(1)}%</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBarChart;