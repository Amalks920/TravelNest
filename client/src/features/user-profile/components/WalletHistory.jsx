import { useParams } from "react-router-dom";
import { useGetWalletHistoryQuery } from "../services/getUserInfoApiSlice";


const WalletHistory = () => {

const {wallet_id}=useParams()
console.log(wallet_id)

const {data:walletHistory,isError,isFetching,isLoading,isSuccess}=useGetWalletHistoryQuery({wallet_id})
console.log(walletHistory)

  return (
<div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl sm:w-1/2 lg:w-[60%]">
    <h1 className="text-center font-bold text-[1.2rem] pb-5 uppercase">Wallet History</h1>
  <table className="w-full text-left table-auto min-w-max">
    <thead>
      <tr>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
            SL NO
          </p>
        </th>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
            Transaction Type
          </p>
        </th>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
            Transaction Amount
          </p>
        </th>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">Date</p>
        </th>
      </tr>
    </thead>
    <tbody>

{  walletHistory?.response?.map(({wallet_id,transaction_type,amount,updatedAt},index)=>{
    return <tr className="even:bg-blue-gray-50/50">
    <td className="p-4">
      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
      {index+1}
      </p>
    </td>
    <td className="p-4">
      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
       {transaction_type}
      </p>
    </td>
    <td className="p-4">
      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
        {amount}
      </p>
    </td>
    <td className="p-4">
    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
        {updatedAt}
      </p>
    </td>
  </tr>
})
      }
     
    </tbody>
  </table>
</div>

  )
};

export default WalletHistory;