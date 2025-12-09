import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { useTranslation } from "react-i18next";

interface ISliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

const AccessibleSlider = (props: ISliderProps) => {
  const { t } = useTranslation();
  return (  
    <div>
      <Label
        className="text-muted-foreground font-normal text-sm"
        htmlFor={props.id}
      >
        {props.label}
      </Label>
      <Slider
        id={props.id}
        aria-labelledby={props.id}
        aria-valuetext={`${props.value} ${t("settings.minutes", "minutes")}`}
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
