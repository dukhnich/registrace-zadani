import "./style.css";
import { useState } from "react";

interface RegistrationData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

type inputsNames = "username" | "email" | "password" | "passwordConfirm";

interface inputData {
  type: inputsNames;
  inputType: string;
  label: string;
}

const inputsArr: inputData[] = [
  {
    type: "email",
    inputType: "email",
    label: "Email Address",
  },
  {
    type: "username",
    inputType: "text",
    label: "User Name",
  },
  {
    type: "password",
    inputType: "password",
    label: "Password",
  },
  {
    type: "passwordConfirm",
    inputType: "password",
    label: "Confirm Password",
  },
];

export const Registration: React.FC = () => {
  const [user, setUser] = useState<RegistrationData>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(user);
  };
  const changeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = {
      ...user,
      [e.target.name]: e.target.value,
    };
    if (e.target.name === "email" && !updated.username) {
      const index = e.target.value.indexOf("@");
      if (index !== -1) {
        updated.username = e.target.value.slice(0, index);
      }
    }
    setUser(updated);
  };
  return (
    <form onSubmit={onSubmit} className="registration">
      {inputsArr.map((input) => (
        <input
          key={input.type}
          type={input.inputType}
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
