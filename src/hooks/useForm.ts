import React, { ChangeEvent } from "react";

interface InputValues {
  [key: string]: string;
}

interface IForm {
  values: InputValues;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: React.Dispatch<React.SetStateAction<InputValues>>;
}

export function useForm(inputValues: InputValues = {}): IForm {
  const [values, setValues] = React.useState<InputValues>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}