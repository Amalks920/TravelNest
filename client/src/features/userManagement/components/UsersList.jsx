import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useGetAllUserQuery } from "../services/getAllUsersApiSlice";
import { Link } from "react-router-dom";
import { NotificationDialog } from "../../../components/modals/NotificationModal";
import { useEffect, useRef, useState } from "react";
import { useBlockOrUnblockUserMutation } from "../services/blockOrUnblockUserApiSlice";
import useBlockOrUnblockUser from "../hooks/useBlockOrUnblockUser";
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = [
  "SL NO",
  "ID",
  "USERNAME",
  "EMIAL",
  "PHONE",
  "STATUS",
  "ROLE", 
  "",
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
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "Executive",
    online: false,
    date: "04/10/21",
  },
];

export function UsersList() {
  
  const {
    data: users,
    isError,
    isFetching,
    isLoading,
    isSuccess
  } = useGetAllUserQuery();

  console.log(users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isBlockedRef=useRef(false)
  const userIdRef=useRef(null)

  const [
    blockOrUnblockUser,
    {
      isError:blockUserIsError,
      isLoading:blockUserIsLoading,
      isSuccess:blockUserIsSuccess,
      isFetching:blockUserIsFetching,
      reset:blockUserReset
    },
  ] = useBlockOrUnblockUserMutation();


  if(isLoading) return <h1>Loading...</h1>
  
  return (
    <>
      <NotificationDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        // isBlocked={!isBlockedRef.current}
        // user_id={userIdRef.current}
        args={{isBlocked:!isBlockedRef.current,user_id:userIdRef.current}}
        sendRequestHandler={blockOrUnblockUser}
         error = {blockUserIsError}
         loading = {blockUserIsLoading}
         success = {blockUserIsSuccess}
         reset={blockUserReset}
         heading={'Do you need to block this user ?'}
         description={'user will be blocked and they could not able to login to their account after blocking.'}
         buttonText={'block'}
      />
      <Card className="h-full w-full p-16">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Users list
              </Typography>
              {/* <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography> */}
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              {/* <Button variant="outlined" size="sm">
              view all
            </Button> */}
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
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users?.map(
                ({ _id, username, email, phone, role, isBlocked }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes + " " + "border-r-2"}>
                        <div className="flex items-center  gap-3">
                          <Avatar src={""} alt={""} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-thin text-left "
                            >
                              {index + 1}
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
                            {_id}
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
                            {console.log(_id)}
                            {username}
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
                            {email}
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
                            {phone}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes + " " + "border-r-2"}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={
                              isBlocked === true ? "Blocked" : "Not Blocked"
                            }
                            color={isBlocked === false ? "green" : "blue-gray"}
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
                            to={`/admin/user-details/${_id}`}
                            className="text-[0.56rem] text-center"
                          >
                            {role}
                          </Link>
                        </Typography>
                      </td>
                      <td className={classes}>
                        {/* <PencilIcon className="h-4 w-4" /> */}
                        <Button
                          onClick={() => {
                            console.log('hello====>===>')
                            setIsModalOpen(true);
                            isBlockedRef.current=isBlocked
                            userIdRef.current=_id
                          }}
                          size="sm"
                          variant="outlined"
                          className="text-[0.4rem] w-fit "
                        >
                          change status
                        </Button>
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
    </>
  );
}
