import "./style.css";
import { useState } from "react";

export interface RegistrationData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

type inputsNames = "username" | "email" | "password" | "passwordConfirm";

interface inputData {
  type: inputsNames;
  label: string;
}

export const Registration: React.FC = () => {
  const [user, setUser] = useState<RegistrationData>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const inputsArr: inputData[] = [
    {
      type: "email",
      label: "Email Address",
    },
    {
      type: "username",
      label: "User Name",
    },
    {
      type: "password",
      label: "Password",
    },
    {
      type: "passwordConfirm",
      label: "Confirm Password",
    },
  ];
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(user);
  };
  const changeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form onSubmit={onSubmit} className="registration">
      {inputsArr.map((input) => (
        <input
          key={input.type}
          type="text"
          className={`registration__input registration__input--${input.type}`}
          name={input.type}
          value={user[input.type]}
          placeholder={input.label}
          onChange={changeField}
        />
      ))}
      <button type="submit" className="registration__btn">
        Register
      </button>
    </form>
  );
};
