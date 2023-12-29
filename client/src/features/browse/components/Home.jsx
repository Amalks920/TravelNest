import Cards from "./Cards";

const Home=()=>{
    return (
        <div className="border-2 flex flex-wrap xl:justify-start justify-center items-center  mt-14  gap-16">
            {/* <div className="border-2"> */}
                <div className="border-2">
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
                </div>
                <div className="border-2">
                <Cards/>
                </div>
            {/* </div> */}
        </div>
        
    )
}

export default Home;