import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

interface ISliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

const AccessibleSlider = (props: ISliderProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label
          className="text-muted-foreground font-normal text-sm"
          htmlFor={props.id}
        >
          {props.label}
        </Label>
        <span className="text-sm font-medium tabular-nums text-primary">
          {props.value}
          {props.unit ? ` ${props.unit}` : ""}
        </span>
      </div>
      <Slider
        id={props.id}
        aria-labelledby={props.id}
        aria-valuetext={`${props.value} ${props.unit ? props.unit : ""}`}
        value={[props.value]}
        min={props.min}
        max={props.max}
        step={props.step ? props.step : 1}
        onValueChange={(v) => props.onChange(v[0])}
        className="mt-3 cursor-pointer"
      />
    </div>
  );
};
export default AccessibleSlider;
