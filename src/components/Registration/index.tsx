import "./style.css";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

interface RegistrationData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

type inputsNames = keyof RegistrationData;

type Validator<T> = (value: T, allValues: RegistrationData) => string | boolean;

type ValidatorVariants = Validator<string> | Validator<boolean>;

interface inputData {
  type: inputsNames;
  inputType: string;
  label: string;
  validation: ValidatorVariants;
}

const inputsArr: inputData[] = [
  {
    type: "email",
    inputType: "email",
    label: "Email Address",
    validation: (str: string) => {
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
    validation: (str: string) => {
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
    validation: (str: string) => {
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
    validation: (str: string, values: RegistrationData) => {
      if (!str) {
        return "Povinné pole";
      }
      return str !== values.password ? "Heslo musí být stejné" : true;
    },
  },
];

export const Registration: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<Omit<
    RegistrationData,
    "passwordConfirm"
  > | null>(null);
  const onSubmit = (data: RegistrationData) => {
    const copy = { ...data } as Partial<RegistrationData>;
    delete copy.passwordConfirm;
    setCurrentUser(copy as Omit<RegistrationData, "passwordConfirm">);
  };
  const validate = (values: RegistrationData) => {
    const errors: Record<string, string> = {};
    Object.entries(values).forEach(([key, value]) => {
      const validator: ValidatorVariants | undefined = inputsArr.find((i) => i.type === key)?.validation;
      if (validator === undefined) {
        return;
      }
      const result = validator(value as never, values);
      if (typeof result === "string") {
        errors[key] = result;
      }
    });
    return errors;
  };
  return (
    <>
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
      {currentUser ? (
        <div className="account">
          <h2 className="account__title">Your Profile</h2>
          {Object.entries(currentUser).map(([key, value]) => (
            <p className="account__field" key={key}>
              <span className="account__key">{key}</span>
              <span className="account__value">{value}</span>
            </p>
          ))}
        </div>
      ) : null}
    </>
  );
};
