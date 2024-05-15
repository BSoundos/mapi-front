import * as React from 'react';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

function ListEndpoints() {
  const columns = [
    {
      name: 'Endpoint',
      selector: row => row.title,
      sortable: true,
      className:"mr-18",

    },
    {
      name: 'Method',
      ignoreRowClick: true,
      allowOverflow: true,
      cell: row => row.http_method,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => <button className='underline text-[#9ABAE5]'>Edit</button>, // You can customize the action button here
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const endpoints = useSelector((state: RootState) => state.endpoints.endpoints);

  const handleChange = () => {
    console.log("selection");
  };

  const customStyles = {};

  return (
    <div className='border border-[#7E89AC] bg-mapi-neutral-1 rounded-sm py-1.5'>
      <DataTable
        columns={columns}
        data={endpoints}
        selectableRows
        onSelectedRowsChange={handleChange}
        customStyles={customStyles}
      />
    </div>
  );
}

export default ListEndpoints;
