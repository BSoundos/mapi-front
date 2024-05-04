const HalfNavBar = () => {
    return (
        <div className=" bg-gradient-to-l from-mapi-neutral-3 to-white/5 rounded-lg shadow-lg p-8 w-80 border border-x-corner-1-300  " style={{ height: '500px', margin: '0 0 0 60px  ' }}>
        <nav >
        <ul className="space-y-7 mt-8 font-inter">
            <li><a href="#" className="text-mapi-neutral-5 text-sm hover:text-mapi-secondary-3">Profile Settings</a></li>
            <li><a href="#" className="text-mapi-neutral-5 text-sm hover:text-mapi-secondary-3">Security Settings</a></li>
            <li><a href="#" className="text-mapi-neutral-5 text-sm hover:text-mapi-secondary-3">Support Tickets</a></li>
            <li><a href="/Transaction_history" className="text-mapi-neutral-5 text-sm hover:text-mapi-secondary-3">Transaction History</a></li>
            <li><a href="/SubscriptionsList" className="text-mapi-neutral-5 text-sm hover:text-mapi-secondary-3">Subscription & Usage</a></li>
        </ul>

        </nav>
      </div>
    );
  };
  
  export default HalfNavBar;
  