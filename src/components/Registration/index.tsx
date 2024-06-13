import "./style.css";
import { Formik, Field, Form, ErrorMessage } from "formik";

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
  validation: (str: string, allValues: RegistrationData) => string | boolean;
}

const inputsArr: inputData[] = [
  {
    type: "email",
    inputType: "email",
    label: "Email Address",
    validation: (str) => {
      if (!str) {
        return "Povinné pole";
      }
      return str.indexOf("@") === -1 ? "Musí mít @" : true;
    },
  },
  {
    type: "username",
    inputType: "text",
    label: "User Name",
    validation: (str) => {
      if (!str) {
        return "Povinné pole";
      }
      return str.length > 15 ? "Musí být dlouhé maximálně 15 znaků" : true;
    },
  },
  {
    type: "password",
    inputType: "password",
    label: "Password",
    validation: (str) => {
      if (!str) {
        return "Povinné pole";
      }
      return str.length < 6 || str.length > 15
        ? "Musí být dlouhé mezi 6 a 15 znaků"
        : true;
    },
  },
  {
    type: "passwordConfirm",
    inputType: "password",
    label: "Confirm Password",
    validation: (str, values) => {
      if (!str) {
        return "Povinné pole";
      }
      return str !== values.password ? "Heslo musí být stejné" : true;
    },
  },
];

export const Registration: React.FC = () => {
  const onSubmit = (data: RegistrationData) => {
    console.log(data);
  };
  const validate = (values: RegistrationData) => {
    const errors: Record<string, string> = {};
    Object.entries(values).forEach(([key, value]) => {
      const validator = inputsArr.find((i) => i.type === key)?.validation;
      if (!validator) {
        return;
      }
      const result = validator(value, values);
      if (typeof result === "string") {
        errors[key] = result;
      }
    });
    return errors;
  };
  return (
    <Formik
      className="registration"
      initialValues={{
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      }}
      validate={validate}
      onSubmit={onSubmit}
    >
      <Form>
        {inputsArr.map((input) => (
          <div key={input.type}>
            <label htmlFor={input.type}>{input.label}</label>
            <Field
              type={input.inputType}
              className={`registration__input registration__input--${input.type}`}
              name={input.type}
            />
            <ErrorMessage name={input.type} />
          </div>
        ))}
        <button type="submit" className="registration__btn">
          Register
        </button>
      </Form>
    </Formik>
  );
};
