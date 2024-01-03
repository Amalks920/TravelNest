import ImageContainer from "./ImageContainer";
import Row from "./Row";

const RoomDetailsAccordian=({room})=>{
    const {roomType,images,description}=room;
return (
<>
<div className="flex flex-col">
<div className=" mt-3 h-[60px] flex items-center justify-between  shadow-xl border-2"> 
<h1>2{roomType}</h1>




</div>

<Row room={room}/> 
<ImageContainer images={images}/>
</div>


</>
)

}

export default RoomDetailsAccordian;