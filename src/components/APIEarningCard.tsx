interface APIEarningCardProps {
    name: string;
    category: string;
    totalEarnings: number;
    taxEarnings: number;
}

const APIEarningCard: React.FC<APIEarningCardProps> = ({
    name,
    category,
    totalEarnings,
    taxEarnings,
}) => {
    return (
        <div className="bg-[#0B1739] border border-gray-300 border-opacity-10 rounded-lg p-4">
            <div className="flex justify-between">
                <h3 className="text-base text-white font-normal mb-2">{name}</h3>
                <p className="text-sm text-white bg-[#57C3FF] bg-opacity-20 mb-2 p-1  border border-[#57C3FF] border-opacity-20 rounded-sm">{category}</p>
            </div>
            <p className="text-sm mb-2 ">Total Earnings: <span className="text-[#AAC166]">{totalEarnings} DA</span></p>
            <p className="text-sm">Tax Earnings: {taxEarnings} DA</p>
        </div>
    );
};

export default APIEarningCard;