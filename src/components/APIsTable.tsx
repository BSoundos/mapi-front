import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const APIsTable = ({ subscriptions }) => {
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = React.useState<'all' | 'public' | 'private'>('all');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleToggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    const dateA = new Date(a.subscription_date);
    const dateB = new Date(b.subscription_date);

    if (sortOrder === 'asc') {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  });

  const filteredSubscriptions = sortedSubscriptions.filter((subscription) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'public') {
      return !!subscription.subscription_plan;
    } else if (filter === 'private') {
      return !subscription.subscription_plan;
    }
  });

  return (
    <div className="mb-10">
      <div className="flex justify-end mb-4">
        <label htmlFor="planFilter" className="mr-2" style={{ color: 'white' }}>Filter by Plan:</label>
        <select id="planFilter" value={filter} onChange={handleFilterChange} className="border rounded-md px-3 py-1 bg-gray-800" style={{ color: 'white' }}>
          <option value="all">All</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <button onClick={handleToggleSortOrder} style={{ color: 'white', marginLeft: '0.5rem' }}>
          {sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}
        </button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ color: 'white' }}>API Name</TableCell>
            <TableCell style={{ color: 'white' }}>Plan Name</TableCell>
            <TableCell style={{ color: 'white' }}>Plan Type</TableCell>
            <TableCell style={{ color: 'white' }}>Date Subscribed</TableCell>
            <TableCell style={{ color: 'white' }}>Status</TableCell>
            <TableCell style={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSubscriptions.map((subscription) => (
            <TableRow key={subscription.subscription_id}>
              <TableCell style={{ color: 'white' }}>{subscription.api_name}</TableCell>
              <TableCell style={{ color: 'white' }}>
                {subscription.subscription_plan ? subscription.subscription_plan.name : subscription.user_plan.name}
              </TableCell>
              <TableCell style={{ color: 'white' }}>
                {subscription.subscription_plan ? "Public plan" : "Private plan"}
              </TableCell>
              <TableCell style={{ color: 'white' }}>{subscription.subscription_date}</TableCell>
              <TableCell style={{ color: 'white' }}>
                {subscription.access_key && subscription.access_key.status === 1 ? (
                  <span className="bg-green-500 px-2 py-1 rounded-full text-white">Active</span>
                ) : (
                  <span className="bg-red-500 px-2 py-1 rounded-full text-white">Paused</span>
                )}
              </TableCell>
              <TableCell style={{ color: 'white' }}>
                <div className="flex space-x-4">
                  <button style={{ color: 'white', textDecoration: 'underline' }}>Go to API</button>
                  <button style={{ color: 'white', textDecoration: 'underline' }}>Manage key</button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default APIsTable;
