import React, { useEffect, useState } from "react";
import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import {
  updateCheckIn,
  updateCheckOut,
} from "../../features/browse/services/priceSlice";

export default function DatePicker({
  name,
  label,
  datePassed,
  className,
  min,
  max,
}) {
  const [date, setDate] = React.useState(datePassed);
  const [checkIn,setCheckIn]=useState('')
  const [checkOut,setCheckOut]=useState('')
  
  const dispatch = useDispatch();

  console.log("date", datePassed);
  useEffect(() => {
    console.log(date);
  }, [date]);
  return (
    <div className={`p-1`}>
      <Popover placement="bottom">
        <PopoverHandler>
          <Input
            className={className}
            // min={min}]
            label={label}
            onChange={(e) => {
              console.log('e.target.value')
              // name === "checkInDate"
              //   ? dispatch(updateCheckIn(e.target.value))
              //   : dispatch(updateCheckOut(e.target.value));
              name==='checkInDate'
              ?setCheckIn(e.target.value):setCheckOut(e.target.value)
            }}
            value={datePassed ? format(datePassed, "PPP") : ""}
          />
        </PopoverHandler>
        <PopoverContent>
          <DayPicker
            mode="single"
            selected={datePassed}
            onDayClick={(value)=>{
              name === "checkInDate"
              ? dispatch(updateCheckIn(value))
              : dispatch(updateCheckOut(value));
            }}
            
            onSelect={()=>{
            }}
            showOutsideDays
            className=" relative z-50 shadow-2xl bg-white"
            classNames={{
              caption: "flex justify-center py-2 mb-4 relative items-center",
              caption_label: "text-sm font-medium text-gray-900",
              nav: "flex items-center",
              nav_button:
                "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
              nav_button_previous: "absolute left-1.5",
              nav_button_next: "absolute right-1.5",
              table: "w-full border-collapse",
              head_row: "flex font-medium text-gray-900",
              head_cell: "m-0.5 w-9 font-normal text-sm",
              row: "flex w-full mt-2",
              cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal",
              day_range_end: "day-range-end",
              day_selected:
                "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
              day_today: "rounded-md bg-gray-200 text-gray-900",
              day_outside:
                "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
              day_disabled: "text-gray-500 opacity-50",
              day_hidden: "invisible",
            }}
            components={{
              IconLeft: ({ ...props }) => (
                <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
              ),
              IconRight: ({ ...props }) => (
                <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
              ),
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
