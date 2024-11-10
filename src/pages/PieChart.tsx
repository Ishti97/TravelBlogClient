import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { pieChartData } from "../axiosApi/handleAPI";
import { ApexOptions } from "apexcharts"; // Import the ApexOptions type

// Define types for the chart data
type Item = {
  category: string;
  count: number;
};

// Use ApexOptions as the type for chart options
type ChartData = {
  series: number[];
  options: ApexOptions;
};

const PieChart = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  const fetchData = async () => {
    try {
      const response = await pieChartData();
      const dt: Item[] = response?.data || [];

      const labels = dt.map((item) => item.category);
      const counts = dt.map((item) => item.count);

      setChartData({
        series: counts,
        options: {
          chart: {
            type: "pie", // Type matches literal type in ApexOptions
            width: 1349,
            height: 550,
          },
          title: {
            text: "Post of different Category",
          },
          labels: labels,
          noData: {
            text: "Empty Data",
          },
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Pie Chart</h2>
      {chartData && (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="pie" // Ensure this matches the chart type
          width={chartData.options.chart?.width}
          height={chartData.options.chart?.height}
        />
      )}
    </div>
  );
};

export default PieChart;
