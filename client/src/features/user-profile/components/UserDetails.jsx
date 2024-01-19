

const UserDetails=()=>{

    return (
       <div className="flex   flex-grow">
        <div className="w-[25%] min-h-[100vh] flex justify-center pt-8">
            <div className="shadow-2xl border-2 w-[250px] h-[250px] rounded-full"> </div>
        </div>
        <div className="w-[75%] h-[100vh] grid grid-flow-row grid-cols-2 mx-[100px] mt-[50px] roundex-md">
            <div className="col-span-1 h-[150px] flex w-full shadow-xl rounded-md">
                <div className="flex justify-around items-center h-full w-full">
                    <h2 className="font-bold">Wallent Balance</h2>
                    <h2>₹ 3487</h2>
                </div>
            </div>
            <div className="col-span-1  h-[150px] flex justify-center">lsd</div>
            <div className="col-span-1  h-[150px] flex justify-center">lsd</div>
            <div className="col-span-1  h-[150px] flex justify-center">lsd</div>
            <div className="col-span-1  h-[150px] flex justify-center">lsd</div>
            <div className="col-span-1  h-[150px] flex justify-center">lsd</div>
      

        </div>
       </div>
    )
}

export default UserDetails;