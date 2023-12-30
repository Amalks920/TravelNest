import { Button } from "@material-tailwind/react";
 
export function ButtonDefault(props) {
  return <Button   {...props} loading={true}  fullWidth>{props.value || 'submit'} </Button>;
}