import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface IToggleRowProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleRow = (props: IToggleRowProps) => {
return (
  <div className="flex items-center justify-between">
    <Label
      className="text-muted-foreground text-sm font-normal"
      htmlFor={props.id}
    >
      {props.label}
    </Label>
    <Switch
      id={props.id}
      checked={props.checked}
      aria-checked={props.checked}
      onCheckedChange={props.onChange}
      className="cursor-pointer"
    />
  </div>
);
};

export default ToggleRow