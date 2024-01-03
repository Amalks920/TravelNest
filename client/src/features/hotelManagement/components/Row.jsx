import { PencilIcon } from "@heroicons/react/24/solid"


const Row=({heading,text})=>{

    return (
        <div className="flex flex-col items-center border-2 mt-5">
        <h1 className=" font-bold text-xl border-2 w-full text-center py-3">
         {heading}
        </h1>

        <div className="m-8 flex gap-4 flex-grow justify-between w-[90%] ">

            <div className="border-2 ">
   
            <p className="text-left  py-3">{text}</p>
       
          </div>

          <div className="border-2 ">
          <PencilIcon
            // onClick={() => {
            //   setInputModalOpen(true);
            //   setInputDetails({
            //     name: "location",
            //     label: "location",
            //     type: "text",
            //     value: hotel?.location,
            //   });
            // }}
            width={15}
            className="cursor-pointer me-6 mt-5"
          />
        </div>

        </div>
      </div>
    )
}

export default Row