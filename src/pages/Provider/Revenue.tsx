
import MyChart from "@/components/MyChart";
import SideBarUser from "@/components/SideBarUser";
import NavBarRe from "@/components/NavBarRe";
const Revenue = () => {

  return (
    <div>
      
        <div className="bg-[#0B1739] pt-4   flex">
            {/* c la place de SideBar */}
            <SideBarUser/>
            <div className="border-l border-opacity-30 border-[#7E89AC] w-full">
                <NavBarRe/>
                <div className="px-10 pb-8 ">                      
                        <h1 className="text-white py-4 text-2xl font-bold">Analytics</h1>
                        <div className="flex justify-between   text-white text-xs mb-4 p-4 border border-opacity-30 border-[#7E89AC]">
                            <div className="border-r border-opacity-30 border-[#7E89AC] pr-4 pl-4 flex flex-col justify-center items-center ">
                                <p className="pb-2">Earnings to date</p>
                                <p>$3,740</p>
                            </div>
                            <div className="border-r border-opacity-30 border-[#7E89AC] pr-4 pl-4 flex flex-col justify-center items-center ">
                                <p className="pb-2">Avg. selling price</p>
                                <p>$238.31</p>
                            </div>
                            <div className="border-r border-opacity-30 border-[#7E89AC] pr-4 pl-4 flex flex-col justify-center items-center ">
                                <p className="pb-2">Number of purchases</p>
                                <p>541</p>
                            </div>
                            <div className="border-r border-opacity-30 border-[#7E89AC] pr-4 pl-4 flex flex-col justify-center items-center ">
                                <p className="pb-2">Successful requests rate</p>
                                <p className="text-[#AAC166]">100%</p>
                            </div>
                            <div className="border-r border-opacity-30 border-[#7E89AC] pr-4 pl-4 flex flex-col justify-center items-center ">
                                <p className="pb-2">Requests number</p>
                                <p className="">1900</p>
                            </div>
                            <div className=" pr-4 pl-4 flex flex-col justify-center items-center ">
                                <p className="pb-2">Earned this month</p>
                                <p>$0</p>
                            </div>

                        </div>
                        <MyChart/>
                </div>
            </div>
        </div>
      </div>
  );
};

export default Revenue;
