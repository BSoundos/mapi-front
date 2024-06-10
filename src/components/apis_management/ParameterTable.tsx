import React from 'react';
import CheckedBox from '@/components/ui/CheckedBox';

const ParameterTable = ({ rows, setRows }) => {
  const handleRowChange = (index, field, value) => {
    const updatedRows = rows.map((row, idx) =>
      idx === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
    console.log(updatedRows);
  };

  const DATA_TYPE_CHOICES = [
    ['STRING', 'STRING'],
    ['ENUM', 'ENUM'],
    ['NUMBER', 'NUMBER'],
    ['BOOLEAN', 'BOOLEAN'],
    ['DATE(YYYY-MM-DD)', 'DATE(YYYY-MM-DD)'],
    ['TIME(24H-HH:MM)', 'TIME(24H-HH:MM)'],
    ['OBJECT', 'OBJECT'],
    ['ARRAY', 'ARRAY'],
  ];

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(), // Generate a unique id for the new row
        name: '',
        description: '',
        isRequired: false,
        dataType: '',
        default: '',
      },
    ]);
  };

  return (
    <div className="mb-1 flex flex-col gap-6 items-center">
      <div className="flex bg-mapi-neutral-2 border-b border-b-[#7E89AC] bg-opacity-30 px-20 pt-2 pb-3 w-full justify-between text-sm">
        <div className="text-[#9ABAE5]">Name</div>
        <div className="text-[#9ABAE5] pl-3">Type</div>
        <div className="text-[#9ABAE5]">Example Value</div>
        <div className="text-[#9ABAE5]">Required</div>
      </div>
      {rows && rows.map((row, index) => (
        <div key={row.id} className="flex justify-between w-full pl-4 pr-16">
          <input
            type="text"
            value={row.name}
            onChange={(e) => handleRowChange(index, 'name', e.target.value)}
            className="border border-[#404040] py-1 pl-1 outline-none bg-[#081028] text-[#BFBFBF] w-44"
            placeholder="Insert parameter name"
          />
          <select
            value={row.dataType}
            onChange={(e) => handleRowChange(index, 'dataType', e.target.value)}
            className="w-36 border border-[#7E89AC] border-opacity-30 py-1 text-sm outline-none bg-[#081028] text-[#BFBFBF]"
          >
            <option value="">Type</option>
            {DATA_TYPE_CHOICES.map(([value, label]) => (
              <option key={value} value={value} className="text-sm">
                {label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={row.default}
            onChange={(e) => handleRowChange(index, 'default', e.target.value)}
            className="border border-[#404040] p-1 outline-none bg-[#081028] text-[#BFBFBF] w-44"
            placeholder="Insert example value"
          />
          <div className="flex gap-2 w-20 ml-8">
            <input
              id={`recommended-${index}`}
              className="hidden"
              type="checkbox"
              checked={row.isRequired}
              onChange={(e) => handleRowChange(index, 'isRequired', e.target.checked)}
            />
            <div
              className={`w-5 h-5 rounded border border-[#7E89AC] flex justify-center items-center cursor-pointer ${
                row.isRequired ? 'bg-primary-dark border-primary-dark' : ''
              }`}
              onClick={() => handleRowChange(index, 'isRequired', !row.isRequired)}
            >
              {row.isRequired && <CheckedBox />}
            </div>
            <div className="text-mapi-text text-sm">Required</div>
          </div>
        </div>
      ))}
      <div className="flex justify-end w-full">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddRow();
          }}
          className="bg-primary-dark border border-[#616161] font-semibold text-sm py-1 px-4 rounded-md text-white"
        >
          Add a parameter
        </button>
      </div>
    </div>
  );
};

export default ParameterTable;
