import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const UserSubscriptionChart = ({ userSubscription }) => {
  const { monthly_data, yearly_data } = userSubscription;
  const [dataType, setDataType] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const getMonthlyData = (year) => {
    const filteredLabels = monthly_data.labels.filter(label => label.split('-')[0] === String(year));
    const filteredCounts = monthly_data.counts.filter((_, index) => monthly_data.labels[index].split('-')[0] === String(year));
    const monthLabels = filteredLabels.map(label => label.split('-')[1]);
    return { labels: monthLabels, counts: filteredCounts };
  };

  const data = {
    labels: dataType === 'monthly' ? getMonthlyData(selectedYear).labels : yearly_data.labels,
    datasets: [
      {
        label: 'Number of Subscriptions',
        data: dataType === 'monthly' ? getMonthlyData(selectedYear).counts : yearly_data.counts,
        fill: false,
        borderColor: '#AAC166',
        tension: 0.4,
      },
    ],
  };


  const options = {
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#DCDCDC',
        },
      },
    },
    maintainAspectRatio: true,
    responsive: true,
    height: 50,
  };

  const handleDataTypeChange = (type) => {
    setDataType(type);
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const getYearOptions = () => {
    const years = new Set(monthly_data.labels.map(label => label.split('-')[0]));
    return Array.from(years).map(year => (
      <option key={year as string} value={year as string}>
        {year as string}
      </option>
    ));
  };

  return (
    <div>
      <div className="flex justify-end">
        <select
            value={dataType}
            onChange={(e) => handleDataTypeChange(e.target.value)}
            className="px-4 py-2 cursor-pointer bg-mapi-neutral-1 text-white border border-gray-300 border-opacity-10 rounded-lg mr-3"
        >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
        </select>
        {dataType === 'monthly' && (
            <select
            value={selectedYear}
            onChange={handleYearChange}
            className="px-4 py-2 cursor-pointer bg-mapi-neutral-1 text-white border border-gray-300 border-opacity-10 rounded-lg"
            >
            {getYearOptions()}
            </select>
        )}
        </div>

      <Line data={data} options={options} />
    </div>
  );
};

export default UserSubscriptionChart;