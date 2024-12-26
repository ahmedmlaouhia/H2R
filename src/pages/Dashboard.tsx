import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { FaChartBar, FaUserCog, FaUsers, FaClipboardCheck } from 'react-icons/fa';

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

const DashboardAdmin = () => {
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Number of Leaves Per Month',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: '>Employees on Leave Per Month',
        data: [12, 15, 9, 20, 13, 25],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Congé Annuel', 'Congé Maladie', 'Congé Sans Solde'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="w-full p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-teal-100 p-6 rounded-lg shadow-xl">
          <div className="flex items-center space-x-4">
            <FaUsers className="text-4xl text-teal-600" />
            <div>
              <h3 className="text-xl font-semibold">Users</h3>
              <p>50</p>
            </div>
          </div>
        </div>
        <div className="card bg-purple-100 p-6 rounded-lg shadow-xl">
          <div className="flex items-center space-x-4">
            <FaChartBar className="text-4xl text-purple-600" />
            <div>
              <h3 className="text-xl font-semibold">Timesheet Submissions</h3>
              <p>5</p>
            </div>
          </div>
        </div>
        <div className="card bg-blue-100 p-6 rounded-lg shadow-xl">
          <div className="flex items-center space-x-4">
            <FaClipboardCheck className="text-4xl text-blue-600" />
            <div>
              <h3 className="text-xl font-semibold">Leave Requests</h3>
              <p>10</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="mb-10">
          <h3 className="text-2xl text-center mb-4">Number of Leaves Per Month</h3>
          <Line data={lineData} options={{ responsive: true }} />
        </div>



        <div className="mb-10">
          <h3 className="text-2xl text-center mb-4">Employees on Leave Per Month</h3>
          <Bar data={barData} options={{ responsive: true }} />
        </div>

        <div className="mb-10 h-[300px]">
          <h3 className="text-2xl mb-4">Leave Types Distribution</h3>
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="grid grid-cols grid-cols-3 gap-6">

        <div className="card bg-yellow-100 p-6 rounded-lg shadow-xl">
          <div className="flex items-center space-x-4">
            <FaClipboardCheck className="text-4xl text-yellow-600" />
            <div>
              <h3 className="text-xl font-semibold">Pending Leaves</h3>
              <p>8</p>
            </div>
          </div>
        </div>
        <div className="card bg-green-100 p-6 rounded-lg shadow-xl">
          <div className="flex items-center space-x-4">
            <FaClipboardCheck className="text-4xl text-green-600" />
            <div>
              <h3 className="text-xl font-semibold">Confirmed Leaves</h3>
              <p>12</p>
            </div>
          </div>
        </div>
        <div className="card bg-red-100 p-6 rounded-lg shadow-xl">
          <div className="flex items-center space-x-4">
            <FaClipboardCheck className="text-4xl text-red-600" />
            <div>
              <h3 className="text-xl font-semibold">Cancelled Leaves</h3>
              <p>3</p>
            </div>
          </div>
        </div>
      </div>



      
    </div>
  );
};

export default DashboardAdmin;
