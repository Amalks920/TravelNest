import { Button, Spinner } from "@material-tailwind/react";
import { useGetSalesReportByDateMutation, useGetSalesReportQuery } from "../services/salesReportApiSlice";
import { useEffect, useRef, useState } from "react";

const SalesReport = () => {


const [startDate,setStartDate]=useState(null)
const [endDate,setEndDate]=useState(null)


const {
  data: salesResponse,
  isError,
  isFetching,
  isLoading,
  isSuccess,
} = useGetSalesReportQuery();

//const [sales,setSales]=useState(salesResponse);

const sales=useRef(null)

useEffect(()=>{
  console.log(salesResponse)
  sales.current=salesResponse?.response

},[salesResponse])

const [
  getSalesReportByDate,
  {
    isError:isErrorFilterByDate,
    isFetching:isFetchingFilterByDate,
    isLoading:isLoadingFilterByDate,
    isSuccess:isSuccessFilterByDate
  }]=useGetSalesReportByDateMutation({startDate,endDate})



async function filterSalesByDate(){
  const response=await getSalesReportByDate({startDate,endDate})
  sales.current=response?.data
}

  const getYesterdayDateString = () => {
    const yesterday = new Date();
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, "0");
    const day = String(yesterday.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (isFetching || isLoading) return <Spinner />;

  return (
    <div className="w-[90%]">
      <div class="relative flex flex-col w-full h-full text-gray-700 bg-white rounded-xl bg-clip-border">



        <div class="p-6 px-0 overflow-scroll">
          <div className="flex justify-end gap-5 h-[30px]">
            <input
            onInput={(e)=>{
              setStartDate(e.target.value)
            }}
             type="date"  max={ endDate || getYesterdayDateString()}   className="border-2 border-gray-500 rounded-md px-2 text-[0.8rem] w-[130px]" />
            <input
            onInput={(e)=>{
              setEndDate(e.target.value)
            }}
             type="date"  max={ getYesterdayDateString()} min={startDate} className="border-2 border-gray-500 rounded-md px-2s text-[0.8rem] w-[130px]" />
            <button
            onClick={async ()=>{
               filterSalesByDate({startDate,endDate})
            }}
             className="border-2 border-black px-5 rounded-lg bg-black text-[0.6rem] text-white">update</button>
          </div>
          <table class="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    SL NO
                  </p>
                </th>
                <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p class="block capitalize font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Hotel Name
                  </p>
                </th>
                <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Total Revenue
                  </p>
                </th>
                <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                   Total Bookings
                  </p>
                </th>
                <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                </th>
              </tr>
            </thead>
            <tbody>

              {sales?.current?.response?.map(({_id,totalRevenue,bookings,hotelDetails}, index) => {
           
                return (
                  <tr key={index}>
                    <td class="p-4 border-b border-blue-gray-50">
                      <div class="flex items-center gap-3">
                        <div class="flex flex-col">
                          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {index+1}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td class="p-4 border-b border-blue-gray-50">
                      <div class="flex flex-col">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {hotelDetails[0]?.hotelName}
                        </p>
                      </div>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <div class="w-max">
                        {totalRevenue}

                      </div>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {bookings?.length}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <button
                        class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            class="w-4 h-4"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                          </svg>
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
              
            </tbody>
          </table>
        </div>

        <div class="flex items-center justify-between p-4 border-t border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Page 1 of 10
          </p>
          <div class="flex gap-2">
            <button
              class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Previous
            </button>
            <button
              class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
