
const UserAccount = () => {

  return (
    <div className="grid grid-cols-3 grid-rows-5 gap-4 w-[80%]">
      <div className="shadow-md col-span-3 flex justify-left items-center">
        <h2 className="text-4xl ms-[5%]">Account</h2>
        
      </div>

      <div className="col-start-1 col-end-4 md:col-end-2 row-start-2  flex flex-col justify-between  shadow-2xl text-md p-9 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-10 h-10 mb-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
          />
        </svg>

        <div className="flex flex-col ">
          <h2 className="font-bold mb-2">Personal Info</h2>
          <h2 className="font-extralight text-[0.9rem]">
            Provide Your Personal Details
          </h2>
        </div>
      </div>

      <div className="md:col-start-2 md:col-end-3 col-start-1 col-end-4 row-start-3 md:row-start-2 border-2 p-9 cursor-pointer shadow-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-10 h-10 mb-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
          />
        </svg>

        <div className="flex flex-col ">
          <h2 className="font-bold mb-2">Wallet</h2>
          <h2 className="font-extralight text-[0.9rem]">
            See Your Wallet Balance
          </h2>
        </div>
      </div>

      {/* <div className="col-start-3 row-start-3 sm:row-start-2 border-2 h-[200px]">
        
    </div> */}
      {/* 
    <div className="border-2">19</div>
    <div className="border-2">20</div>
    <div className="border-2">21</div>
    <div className="border-2">22</div>
    <div className="border-2">23</div>
    <div className="col-start-2 row-start-5 border-2">24</div>
    <div className="col-start-1 row-start-5 border-2">25</div>
    <div className="col-start-3 row-start-4 border-2">26</div>
    <div >27</div> */}
    </div>
  );
};

export default UserAccount;