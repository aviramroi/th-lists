import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import { i18n } from "../../lib/labels";
import { Button } from "../Button";

export const QtyInput = ({
  value,
  setValue,
}: {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}) => {
  const handleButton = (type: "add" | "substract") => () => {
    setValue((prev) => prev + (type === "add" ? 1 : -1));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > 50) {
      alert(i18n.limitError);
    } else {
      setValue(Number(e.target.value));
    }
  };

  return (
    <div className="flex items-center relative w-16 justify-between">
      <Button onClick={handleButton("substract")} disabled={value === 0}>
        <MdRemove />
      </Button>
      <input
        type="number"
        value={value.toString()}
        onChange={handleChange}
        className=" appearance-none w-12 outline-none bg-gray-200 text-gray-500 text-center rounded absolute z-0 left-1/2 transform -translate-x-1/2"
      />
      <Button onClick={handleButton("add")} disabled={value >= 50}>
        <MdAdd />
      </Button>
    </div>
  );
};
