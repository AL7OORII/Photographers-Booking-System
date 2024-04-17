/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { InputProps } from "../../components/ui/input";
import { CloseCircle, DocumentText1 } from "iconsax-react";
type FormMultiImageSelectorProps<
  TFormValues extends FieldValues = FieldValues
> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  selectedImages: File[];
} & Omit<InputProps, "name">;

const FormMultiImageSelector = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  placeholder,
  errors,
  description,
  setSelectedImages,
  selectedImages,
  ...props
}: FormMultiImageSelectorProps<TFormValues>): JSX.Element => {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <p className="text-dark text-[14px]">{description}</p>
            <FormControl>
              <div className="w-full max-w-[300px] p-0 flex justify-center items-center bg-dark_blue py-3 rounded-2xl">
                <input
                  type="file"
                  className="hidden bg-dark_blue"
                  id="fileInputDoc"
                  onBlur={field.onBlur}
                  name={field.name}
                  multiple
                  ref={field.ref}
                  {...props}
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0]);
                    setSelectedImages((prev) => [
                      ...prev,
                      e.target.files[0] ?? null,
                    ]);
                    // setSelectedImage(e.target.files?.[0] ?? null);
                  }}
                  //   key={selectedImage ? selectedImage.name : "fileInput"}
                />
                <label
                  htmlFor="fileInputDoc"
                  className="flex gap-2 items-center justify-center cursor-pointer w-full h-full bg-dark_blue"
                >
                  <DocumentText1
                    variant="Bold"
                    size={30}
                    className="text-cream"
                  />
                  <span className="whitespace-nowrap capitalize text-cream">
                    Add Image
                  </span>
                </label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* DOC PREVIEW */}
      {selectedImages.length > 0 && (
        <>
          <p className="text-dark_blue font-medium">Image preview</p>
          <div className="flex justify-start items-center gap-3 flex-wrap">
            {selectedImages.map((doc, index) => (
              <div className="w-[200px] h-[200px] relative" key={index}>
                <img
                  src={URL.createObjectURL(doc)}
                  alt="Selected"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <CloseCircle
                  className="absolute top-1 right-0 text-primary p-0 h-fit w-fit cursor-pointer"
                  size={24}
                  onClick={() => {
                    setSelectedImages((prev) =>
                      prev.filter((img) => img.name !== doc.name)
                    );
                  }}
                  variant="Bold"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FormMultiImageSelector;
