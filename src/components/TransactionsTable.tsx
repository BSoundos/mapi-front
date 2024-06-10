import React from 'react';
import {Link} from "react-router-dom";

interface Transaction {
  id: number;
  apiName: string;
  totalAmount: number;
  planName: string;
  createdAt: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse w-full">
        <thead className="border-b-2 border-corner-1-300 bg-mapi-neutral-2">
          <tr>
            <th className="px-4 py-2 text-mapi-neutral-5 text-opacity-85 text-sm text-left">API Name</th>
            <th className="px-4 py-2 text-mapi-neutral-5 text-opacity-85 text-sm text-left">Total Amount</th>
            <th className="px-4 py-2 text-mapi-neutral-5 text-opacity-85 text-sm text-left">Plan Name</th>
            <th className="px-4 py-2 text-mapi-neutral-5 text-opacity-85 text-sm text-left">Created At</th>
            <th className="px-4 py-2 text-mapi-neutral-5 text-opacity-85 text-sm text-left">Monthly Statement</th>
          </tr>
        </thead>
        <tbody className="shadow-xl border-b-2 border-corner-1-300 space-y-5 bg-mapi-neutral-2 bg-opacity-40">
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="px-4 py-2 text-xs text-mapi-neutral-5">{transaction.apiName}</td>
              <td className="px-4 py-2 text-xs text-mapi-neutral-5">{transaction.totalAmount} DA</td>
              <td className="px-4 py-2 text-xs text-mapi-neutral-5">{transaction.planName}</td>
              <td className="px-4 py-2 text-xs text-mapi-neutral-5">{transaction.createdAt}</td>
              <td className="px-4 py-2 text-xs text-secondary-blue">
                <button>
                  <Link to={`/Transaction_details/${transaction.id}`}>View details</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
