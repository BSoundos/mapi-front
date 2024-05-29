import DataTable from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { removeEndpoint } from '@/components/features/apis/endpointSlice';

function ListEndpoints() {
  const dispatch = useDispatch();
  const columns = [
    {
      name: 'Endpoint',
      selector: (row) => row.title,
      sortable: true,
      className: 'mr-18',
    },
    {
      name: 'Method',
      ignoreRowClick: true,
      allowOverflow: true,
      cell: (row) => row.http_method,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => <button className="underline text-[#9ABAE5]">Edit</button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const endpoints = useSelector((state: RootState) => state.endpoints.endpoints);

  const handleChange = (state) => {
    const selectedRows = state.selectedRows;

    // If no rows are selected, do nothing
    if (selectedRows.length === 0) {
      return;
    }

    // Dispatch the removeEndpoint action for each selected row
    selectedRows.forEach((rowIndex) => {
      const selectedEndpoint = endpoints[rowIndex];
      dispatch(removeEndpoint(selectedEndpoint.id));
    });
  };

  const customStyles = {};

  return (
    <div className="border border-[#7E89AC] bg-mapi-neutral-1 rounded-sm py-1.5">
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