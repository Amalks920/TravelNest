


import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";

   
   function ChatList({username,text}) {

  
    return (
      <Card className="w-[100%]">
        <List>
          <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular"  src="" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {username}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {text}
              </Typography>
            </div>
          </ListItem>
          {/* <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="alexander" src="https://docs.material-tailwind.com/img/face-2.jpg" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                Alexander
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Backend Developer @ Material Tailwind
              </Typography>
            </div>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="emma" src="https://docs.material-tailwind.com/img/face-3.jpg" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                Emma Willever
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                UI/UX Designer @ Material Tailwind
              </Typography>
            </div>
          </ListItem> */}
        </List>
      </Card>
    );
  }


  export default ChatList;