import * as React from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "../../components/ui/button";
import FormInput from "./FormInput";

interface FormPhotographyStylesProps {
  styles: string[];
  setStyles: React.Dispatch<React.SetStateAction<string[]>>;
  label?: string;
  search?: boolean;
}

export default function FormPhotographyStyles({
  styles,
  setStyles,
  label,
  search,
}: FormPhotographyStylesProps) {
  const [style, setStyle] = React.useState("");

  const handleAdd = (tag: string) => {
    setStyles((tags) => [...tags, tag]);
    setStyle("");
  };

  const handleRemove = (tag: string) => {
    setStyles((tags) =>
      tags.filter((value) => value.toLowerCase() !== tag.toLowerCase())
    );
  };

  return (
    <div className="relative w-full">
      {label && (
        <h3 className="text-sm md:text-base font-semibold text-dark_blue">
          {label}
        </h3>
      )}
      <div className="flex gap-2 items-center">
        {search ? (
          <FormInput
            name="tags"
            description=""
            placeholder="Enter photography specialization"
            onChange={(e) => setStyle(e.target.value)}
            value={style}
            className="bg-cream  focus-visible:ring-0 focus:ring-offset-0 focus:outline-none focus:border-none text-lg text-dark_blue font-medium"
          />
        ) : (
          <FormInput
            name="tags"
            description=""
            placeholder="Enter photography specialization"
            onChange={(e) => setStyle(e.target.value)}
            value={style}
          />
        )}
        <Button
          className="w-fit h-fit rounded-md"
          type="button"
          onClick={() => handleAdd(style)}
          disabled={style === ""}
        >
          {search ? "Add" : "Add photography specialization"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 my-3">
        {styles.map((tag, i) => (
          <SelectedStyles tag={tag} key={i} handleRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}

interface SelectedStylesProps {
  tag: string;
  handleRemove: (tag: string) => void;
}

const SelectedStyles = ({ tag, handleRemove }: SelectedStylesProps) => {
  return (
    <div className="bg-dark_red top-0 left-0 flex h-full gap-1 p-1 px-2 text-xs text-cream transition-all duration-300 ease-in-out rounded-lg bg-dark w-fit">
      {tag}
      <IoClose
        className="text-base cursor-pointer"
        onClick={() => handleRemove(tag)}
      />
    </div>
  );
};
