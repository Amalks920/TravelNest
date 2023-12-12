import { Button } from "@material-tailwind/react";
 
export function ButtonDefault(props) {
  return <Button type={props.type} onSubmit={props.handleSubmit} disabled={props.isSubmitting} fullWidth>Button</Button>;
}