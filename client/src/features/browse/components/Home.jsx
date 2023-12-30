import XXLDialog from "../../../components/modals/XXLDialog";
import useGetAllHotels from "../hooks/useGetAllHotels";
import Cards from "./Cards";

const Home=()=>{

    const {
        hotels,
        isError,
        isFetching,
        isLoading,
        isUninitialized,
        error
    }=useGetAllHotels();
    console.log(hotels)
    return (
        <div className="border-2 flex flex-wrap xl:justify-start justify-center items-center xl:ml-20 border-black mt-14  gap-16">
            {/* <div className="border-2"> */}
        
        {
            hotels?.map(({_id,hotelName,price,description,images},index)=> (
                <div key={_id} className="">
                    <Cards hotel_id={_id} hotelName={hotelName} price={price} description={description} images={images}/>
                </div>
            ))
        }

                {/* <div className="border-2">
                <Cards/>
                </div>
                <div className="border-2">
                <Cards/>
                </div>
                <div className="border-2">
                <Cards/>
                </div>
                <div className="border-2">
                <Cards/>
                </div> */}
            {/* </div> */}
        </div>
        
    )
}

export default Home;