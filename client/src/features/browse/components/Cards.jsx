import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
    Chip,
  } from "@material-tailwind/react";
  import { Link } from "react-router-dom";
import ToggleIcon from "../../../components/ToggleIcon";
import ToggleIconLeft from "../../../components/ToggleIconLeft";
import { IMAGE_BASE_URL } from "../../../data/constants";

const Cards=({hotel_id,hotelName,price,description,images})=>{

  console.log(images)
            return (
        <Link to={`/hotel-details/${hotel_id}`}>    
              {/* <Card className="w-96">
      <CardHeader shadow={false} floated={false} className="h-96 w-full m-0">

<div className="relative top-5 z-10 left-80">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6  h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>

</div>


<ToggleIcon className={'relative left-[330px] text-white top-40'}/>
<ToggleIconLeft className={'relative left-[330px] text-white '}/>


        <img
        src={IMAGE_BASE_URL+'/'+`${images[0]}`}
          alt="card-image"
          className="h-full w-full object-cover -mt-20"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {hotelName}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            {price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {description}
        </Typography>
      </CardBody>
 
    </Card> */}


<div class="relative flex flex-col text-gray-700 bg-white   bg-clip-border rounded-xl w-96  shadow-2xl">
  <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
    <img
     src={IMAGE_BASE_URL+'/'+`${images[1]}`}
     // src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
      alt="card-image" class="object-cover w-full h-full" />


<div class="p-6 relative -top-44 ">
    <div class="flex items-center justify-between mb-2">
      <p class="block font-sans text-base antialiased font-medium leading-relaxed text-white">
        {hotelName}
      </p>
      <p class="block font-sans text-base antialiased font-medium leading-relaxed text-white">
        {price}
      </p>
    </div>
    <p class="block font-sans text-sm antialiased font-normal leading-normal text-white opacity-75">
      {description.slice(0,200)}
    </p>
  </div>
  </div>
  <div class="p-3 ">
    <div class="flex items-center justify-between ">
      <div>
        star rating
      </div>
      {/* <p class="block font-sans text-base antialiased font-medium leading-relaxed text-white">
        {hotelName}
      </p>
      <p class="block font-sans text-base antialiased font-medium leading-relaxed text-white">
        {price}
      </p> */}
    </div>
    {/* <p class="block font-sans text-sm antialiased font-normal leading-normal text-white opacity-75">
      {description.slice(0,200)}
    </p> */}
  </div>
  {/* <div class="p-6 pt-0">
    <button
      class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
      type="button">
      View More
    </button>
  </div> */}
</div>
    </Link>  
            );
}


export default Cards