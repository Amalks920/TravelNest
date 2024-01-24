import { IMAGE_BASE_URL } from "../../../data/constants";
import { useGetAllReviewsQuery } from "../services/getAllReviewsOfHotel";

const ReviewSection = ({ reviews }) => {
    console.log(reviews)
//   const {
//     data: reviews,
//     isError,
//     isFetching,
//     isLoading,
//     isSuccess,
//     isUninitialized,
//   } = useGetAllReviewsQuery({hotel_id}); 


  return (
    reviews.map(({userName,created_time,description,images},index)=>{
      return  <>
      <h2 className="font-bold text-[1.2rem] pt-2 ps-5 mb-9">Reviews & Ratings</h2>
      <div className="p-5 flex justify-between border-2">
        <h2 className="text-[1.2rem]">{userName}</h2>
        <h2 className="text-[0.8rem]">{created_time}</h2>
      </div>
      
      <div className="p-5  flex flex-col justify-between border-2" >
        <div className="flex gap-5 mb-5">
          {
            images.map((image,index)=>{
              return <img src={`${IMAGE_BASE_URL + image}`} className="rounded-md" alt="" width={150} />
            })
          }
         
        </div>
      <h2>{description}</h2>
      </div>
      
    </>
    })

  );
};

export default ReviewSection;
