import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { pieChartData } from "../axiosApi/handleAPI";

const PieChart = () => {
  const [chartData, setChartData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await pieChartData();
      const dt = response.data;

      const labels = dt.map((item) => item.category);
      const counts = dt.map((item) => item.count);

      setChartData({
        series: counts,
        options: {
          chart: {
            type: "pie",
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
          type="pie"
          width={chartData.options.chart.width}
          height={chartData.options.chart.height}
        />
      )}
    </div>
  );
};

export default PieChart;
