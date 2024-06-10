

import { fetchEndpoints } from "@/components/features/apis/endpointSlice";
import { removeEndpoint } from '@/components/features/apis/endpointSlice';

import Navbar from "@/components/NavbarProvider";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SideBarPro from "@/components/apis_management/SideBarPro";
import { useEffect,useState } from "react";
import DataTable from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';



export default function EndpointsApi() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate=useNavigate();

  const endpoints = useSelector((state: RootState) => state.endpoints.endpoints);
  const currentVersion=useSelector((state:RootState)=>state.versions.currentVersion);
  const versionId = new URLSearchParams(window.location.search).get('versionId');
  const fetchVersionId = versionId ? parseInt(versionId) : currentVersion?.api_version_id;

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
      cell: (row) => <button onClick={()=>{navigate(`/endpoint-api/${id}/detailsEndpoint/${row.endpoint_id}`)}} className="underline text-[#9ABAE5]">Edit</button>,
      ignoreRowClick: false,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleDeleteEndpoints = () => {
    if (selectedRows.length === 0) {
      return;
    }

    selectedRows.forEach((row) => {
     dispatch(removeEndpoint({versionId:fetchVersionId,endpintId:row.endpoint_id}));
     console.log(row.endpoint_id)
     console.log(selectedRows)
    });

    setSelectedRows([]);
  };

  const onSelectedRowsChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  useEffect(() => {
    dispatch(fetchEndpoints(id));
  }, [dispatch, id]);

  return (
    <div className="flex">
      <SideBarPro />
      <div className="bg-mapi-neutral-2 flex-1">
        <Navbar id={id} />
        <div className="container px-5 flex-1 mt-8 pl-14 overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52]">
          <h2 className="text-white text-2xl font-bold">Endpoints Configuration</h2>
          <div className="flex-col mt-5">
            <h5 className="text-base text-[#9ABAE5] mb-7">Add and define your API endpoints.</h5>
            <div className="flex justify-between w-full items-center mb-5">
              <div className="flex flex-1 justify-end gap-2">
                <Link to={`/add-endpoint/${id}`}>
                  <button className="bg-[#2C5EAF] bg-opacity-15 border border-[#616161] text-[#99BDE6] text-opacity-85 py-1 px-3 rounded text-sm font-semibold w-fit">
                    + Add Endpoint
                  </button>
                </Link>
                <button
                  onClick={handleDeleteEndpoints}
                  className="bg-[#D53939] border border-[#7E89AC] text-[#FFFFFF] border-opacity-30 py-1 px-4 rounded text-sm w-fit"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="border border-[#7E89AC] bg-mapi-neutral-1 rounded-sm py-1.5">
              <DataTable
                columns={columns}
                data={endpoints}
                selectableRows
                onSelectedRowsChange={onSelectedRowsChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
