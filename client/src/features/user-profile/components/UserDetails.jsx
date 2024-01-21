

const UserDetails=()=>{

    return (
       <div className="flex   flex-grow">
        <div className="w-[25%] min-h-[100vh] flex justify-center pt-8 border-2">
            <div className=" w-[250px] h-[250px] rounded-full  shadow-md"> </div>
        </div>
        <div className="w-[75%] h-[100vh] grid grid-flow-row grid-cols-2 mx-[100px] mt-[50px] roundex-md">
            <div className="col-span-1 h-[150px] flex w-full shadow-md rounded-sm">
                <div className="flex justify-around items-center h-full w-full">
                    <h2 className="font-bold">Wallet Balance</h2>
                    <h2>₹ 3487</h2>
                </div>
            </div>
            <div className="col-span-1  h-[150px] flex justify-center"></div>
            <div className="col-span-1  h-[150px] flex justify-center"></div>
            <div className="col-span-1  h-[150px] flex justify-center"></div>
            <div className="col-span-1  h-[150px] flex justify-center"></div>
            <div className="col-span-1  h-[150px] flex justify-center"></div>
      

        </div>
       </div>
    )
}

export default UserDetails;