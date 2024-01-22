import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  MenuItem,
  Textarea,
  Input,
} from "@material-tailwind/react";

function ReviewModal({ openReviewModal: open, setOpenReviewModal: setOpen }) {
  
  const [rating,setRating]=useState(0)
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Write a Review
            </Typography>
            <Typography color="gray" variant="paragraph">
              write a review about us
            </Typography>
          </div>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="overflow-y-scroll !px-5">
          <div className="mb-6">
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="py-3 font-semibold uppercase opacity-70"
            >
              Review
            </Typography>
            <div className="flex flex-col gap-10">
              <Textarea label="Review"></Textarea>
              <Input label="upload images" type="file" accept="" />
            </div>
            {/* <ul className="mt-3 -ml-2 flex flex-col gap-1">
              <MenuItem className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md">
                <img
                  src="https://docs.material-tailwind.com/icons/metamask.svg"
                  alt="metamast"
                  className="h-6 w-6"
                />
                <Typography
                  className="uppercase"
                  color="blue-gray"
                  variant="h6"
                >
                  Connect with MetaMask
                </Typography>
              </MenuItem>
              <MenuItem className="mb-1 flex items-center justify-center gap-3 !py-4 shadow-md">
                <img
                  src="https://docs.material-tailwind.com/icons/coinbase.svg"
                  alt="metamast"
                  className="h-6 w-6 rounded-md"
                />
                <Typography
                  className="uppercase"
                  color="blue-gray"
                  variant="h6"
                >
                  Connect with Coinbase
                </Typography>
              </MenuItem>
            </ul> */}
          </div>
          <div>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="py-4 font-semibold uppercase opacity-70"
            >
              star rating
            </Typography>
            <div className="flex flex-grow justify-around p-5">
              <div>
                <svg
                  onClick={()=>{
                    rating<1?setRating(1):setRating(0)
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={rating>0?"yellow":'black'}
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke={rating>0?"yellow":'black'}
                  class="w-10 h-10 cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </div>
              <div>
              <svg
                                onClick={()=>{
                                    rating<2?setRating(2):setRating(1)
                                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={rating>1?"yellow":'black'}
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke={rating>1?"yellow":'black'}
                  className="w-10 h-10 cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </div>
              <div>
              <svg
                  onClick={()=>{
                    rating<3?setRating(3):setRating(2)
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={rating>2?"yellow":'black'}
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke={rating>2?"yellow":'black'}
                  class="w-10 h-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </div>
              <div>
              <svg
                                onClick={()=>{
                                    rating<4?setRating(4):setRating(3)
                                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={rating>3?"yellow":'black'}
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke={rating>3?"yellow":'black'}
                  className="w-10 h-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </div>
              <div>
              <svg
                              onClick={()=>{
                                rating<5?setRating(5):setRating(4)
                              }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={rating>4?"yellow":'black'}
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke={rating>4?"yellow":'black'}
                  className="w-10 h-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="justify-between gap-2">
          <Typography variant="small" color="gray" className="font-normal">
            {/* New to Ethereum wallets? */}
          </Typography>
          <Button variant="outlined" size="sm">
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default ReviewModal;
