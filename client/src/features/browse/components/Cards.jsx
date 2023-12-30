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
              <Card className="w-96">
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
          // src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
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
      {/* <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter> */}
    </Card>
    </Link>  
            );
}


export default Cards