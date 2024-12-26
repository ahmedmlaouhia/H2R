import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { FaCalendarCheck, FaClock, FaBan, FaCheckCircle } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const Home = () => {
  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Number of Leaves",
        data: [3, 2, 5, 4, 6, 7, 3, 5, 2, 4, 3, 1],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "2024",
        data: [2, 3, 1, 4, 5, 6, 2, 3, 5, 1, 4, 2],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
      {
        label: "2023",
        data: [3, 2, 4, 3, 2, 5, 3, 2, 4, 3, 5, 1],
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-orange-100 p-6 rounded-lg shadow-xl flex items-center space-x-4">
          <FaCalendarCheck className="text-4xl text-orange-600" />
          <div>
            <h3 className="text-xl font-semibold">Remaining Leave Days</h3>
            <p className="text-lg">15</p>
          </div>
        </div>
        <div className="card bg-yellow-100 p-6 rounded-lg shadow-xl flex items-center space-x-4">
          <FaClock className="text-4xl text-yellow-600" />
          <div>
            <h3 className="text-xl font-semibold">Pending Requests</h3>
            <p className="text-lg">2</p>
          </div>
        </div>
        <div className="card bg-red-100 p-6 rounded-lg shadow-xl flex items-center space-x-4">
          <FaBan className="text-4xl text-red-600" />
          <div>
            <h3 className="text-xl font-semibold">Cancelled Requests</h3>
            <p className="text-lg">1</p>
          </div>
        </div>
        <div className="card bg-green-100 p-6 rounded-lg shadow-xl flex items-center space-x-4">
          <FaCheckCircle className="text-4xl text-green-600" />
          <div>
            <h3 className="text-xl font-semibold">Confirmed Requests</h3>
            <p className="text-lg">7</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="mt-8 bg-white p-6 rounded-lg shadow-xl">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Leaves Taken Per Month
          </h3>
          <Bar data={barData} options={{ responsive: true }} />
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-xl">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Leaves Trend Comparison (2023 vs 2024)
          </h3>
          <Line data={lineData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        

        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-xl">
          <h3 className="text-2xl font-semibold mb-4">Reminders</h3>
          <ul>
            <li>Team meeting scheduled for tomorrow at 10 AM.</li>
            <li>Submit your timesheet by Friday.</li>
            <li>New company policy updates available. Check your inbox.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
