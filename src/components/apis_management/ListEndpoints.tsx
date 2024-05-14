import * as React from 'react';
import DataTable from 'react-data-table-component';


function ListEndpoints() {
  const columns = [
    {
      name: 'Endpoint',
      selector: row => row.title,
      sortable: true,
      headerStyle: {  marginRight: '450px', },
      style: {
        marginRight: '450px',
      },

    },
    {
      name: 'Method',
      selector: row => row.year,
      sortable: true,
    },
    {
      name: 'Action',
      selector: row => row.year,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
    },
    {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
    },
  ];

  const handleChange = () => {
    console.log("selection");
  };

  const customStyles = {
    
  };



  return (
    <div className='border border-[#7E89AC] bg-mapi-neutral-1 rounded-sm py-1.5'>
      <DataTable
        columns={columns}
        data={data}
        selectableRows
        onSelectedRowsChange={handleChange}
        customStyles={customStyles}

      />
    </div>
  );
}

export default ListEndpoints;