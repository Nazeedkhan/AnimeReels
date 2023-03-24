import React, { useState } from "react";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Footer from "./Footer";
import SuggestedAccounts from "./SuggestedAccounts";
import Discover from "./Discover";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#4a266a] rounded";

  return (
    <>
      <div>
        <div
          className="block xl:hidden m-2 ml-4 mt-3 text-xl"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
        </div>
        {showSidebar && (
          <div className="xl:w-450 w-32 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
            <div className="xl:border-gray-200 xl:border-b-2 xl:pb-4">
              <Link href="/">
                <div className={normalLink} >
                  <p className="text-2xl text=[#4a266a] mb-2 ">
                    <AiFillHome />
                  </p>
                  <span className="text-xl hidden xl:block">For You</span>
                </div>
              </Link>
            </div>

            <Discover />
            <SuggestedAccounts />
            <Footer />
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
