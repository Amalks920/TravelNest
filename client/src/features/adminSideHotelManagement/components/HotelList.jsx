import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { useGetHotelsQuery } from "../services/getHotelsApiSlice";
import {
  ChevronUpDownIcon,
  HomeModernIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useGetHotelsForAdminQuery } from "../../hotelManagement/services/HotelListAdmin";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Approved",
    value: "Approved",
  },
  {
    label: "Not Approved",
    value: "notApproved",
  },
];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
];

const TABLE_HEAD = [
  "Id",
  "Hotel Name",
  "Location",
  "Description",
  "Registered At",
  "Status",
  "",

];

const HotelList = () => {
  // const {
  //   data: hotels,
  //   isError,
  //   isFetching,
  //   isLoading,
  //   isSuccess,
  // } = useGetHotelsQuery();

    const {
      data:hotels,
      isError,
      isFetching,
      isLoading,
      isSuccess,
    }=useGetHotelsForAdminQuery()
  

  if(isLoading) return <h1>Loading...</h1>

  if(!hotels) return <h1>Err</h1>
  return (
    <Card className="h-full w-full p-16">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray"></Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3" size="sm">
              <HomeModernIcon strokeWidth={2} className="h-4 w-4" /> Add Hotel
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max z-0">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab
                  key={value}
                  className="text-[0.8rem] w-[150px]  "
                  value={value}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hotels?.response?.map(
              (
                {
                  _id,
                  hotelName,
                  description,
                  phone,
                  location,
                  status,
                  created_at,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes + " " + "border-r-2"}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {_id}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes + " " + "border-r-2"}>
                      <div className="flex items-center  gap-3">
                        <Avatar src={""} alt={""} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-thin text-left "
                          >
                            {hotelName}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td className={classes + " " + "border-r-2"}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {location}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes + " " + "border-r-2"}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal max-w-[500px] break-words"
                        >
                          {description.slice(1,200)}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes + " " + "border-r-2"}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {created_at}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes + " " + "border-r-2"}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={
                            status === "delisted"
                              ? "Delisted"
                              : status === "listed"
                              ? "Listed"
                              : "Not Registered"
                          }
                          color={
                            status === "listed"
                              ? "green"
                              : status === "delisted"
                              ? "red"
                              : "blue-gray"
                          }
                        />
                      </div>
                    </td>

                    <td className="border-r-2 px-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <Link
                          to={`/admin/hotel-details/${_id}`}
                          className="text-[0.56rem] text-center"
                        >
                          View Details
                        </Link>
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default HotelList;
