import React, { useState, useReducer } from "react";
import { TextField, Button, FormControl } from "@mui/material";
import "./Form.css";

const mailFormat =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phoneNumberFormat = /^(0|91)?[6-9][0-9]{9}$/;
const initialInputState = {
  name: "",
  age: "",
  email: "",
  phNumber: "",
};

const initialInputValidityState = {
  name: true,
  age: true,
  email: true,
  phNumber: true,
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case "EDIT_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "EDIT_AGE":
      return {
        ...state,
        age: action.payload,
      };
    case "EDIT_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "EDIT_PHONE_NUMBER":
      return {
        ...state,
        phNumber: action.payload,
      };
    case "RESET":
      console.log("tt");
      return {
        name: "",
        age: "",
        email: "",
        phNumber: "",
      };
    default:
      return state;
  }
};

const inputvalidityReducer = (state, action) => {
  switch (action.type) {
    case "EDIT_NAME":
      if (action.payload === "") {
        return {
          ...state,
          name: false,
        };
      } else {
        return {
          ...state,
          name: true,
        };
      }
    case "EDIT_AGE":
      if (+action.payload <= 0 && action.payload !== "") {
        return {
          ...state,
          age: false,
        };
      } else {
        return {
          ...state,
          age: true,
        };
      }
    case "EDIT_EMAIL":
      if (action.payload.match(mailFormat)) {
        return {
          ...state,
          email: true,
        };
      } else {
        return {
          ...state,
          email: false,
        };
      }
    case "EDIT_PHONE_NUMBER":
      if (action.payload.match(phoneNumberFormat) || action.payload === "") {
        return {
          ...state,
          phNumber: true,
        };
      } else {
        return {
          ...state,
          phNumber: false,
        };
      }
    case "RESET":
      return {
        ...state,
        name: true,
        age: true,
        email: true,
        phNumber: true,
      };
    default:
      return state;
  }
};

const Form = (props) => {
  const [inputState, inputDispatch] = useReducer(
    inputReducer,
    initialInputState
  );
  const [inputvalidityState, inputValidityDispatch] = useReducer(
    inputvalidityReducer,
    initialInputValidityState
  );
  const [isFormValid, setIsFormValid] = useState(true);

  const inputChangedHandler = (event) => {
    if (event.target.id === "name") {
      inputDispatch({ type: "EDIT_NAME", payload: event.target.value });
      inputValidityDispatch({ type: "EDIT_NAME", payload: event.target.value });
    } else if (event.target.id === "age") {
      inputDispatch({ type: "EDIT_AGE", payload: event.target.value });
      inputValidityDispatch({ type: "EDIT_AGE", payload: event.target.value });
    } else if (event.target.id === "email") {
      inputDispatch({ type: "EDIT_EMAIL", payload: event.target.value });
      inputValidityDispatch({
        type: "EDIT_EMAIL",
        payload: event.target.value,
      });
    } else if (event.target.id === "phone-number") {
      inputDispatch({ type: "EDIT_PHONE_NUMBER", payload: event.target.value });
      inputValidityDispatch({
        type: "EDIT_PHONE_NUMBER",
        payload: event.target.value,
      });
    }
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (
      inputState.name !== "" &&
      inputState.email !== null &&
      inputvalidityState.name &&
      inputvalidityState.age &&
      inputvalidityState.email &&
      inputvalidityState.phNumber
    ) {
      setIsFormValid(true);
      props.onSubmission(inputState);
    } else {
      setIsFormValid(false);
    }
  };

  const formResetHandler = () => {
    inputDispatch({ type: "RESET" });
    inputValidityDispatch({ type: "RESET" });
    setIsFormValid(true);
    props.onReset();
  };
  console.log(inputState);

  return (
    <div className="form">
      <FormControl margin="normal" fullWidth={true}>
        <TextField
          id="name"
          type="text"
          label="Name"
          value={inputState.name}
          onChange={inputChangedHandler}
          required
          variant="outlined"
          margin="normal"
          error={!inputvalidityState.name}
          helperText={!inputvalidityState.name ? "Incorrect Name" : ""}
        />
        <TextField
          id="age"
          type="number"
          label="Age"
          value={inputState.age}
          onChange={inputChangedHandler}
          variant="outlined"
          margin="normal"
          error={!inputvalidityState.age}
          helperText={!inputvalidityState.age ? "Incorrect Age" : ""}
        />
        <TextField
          id="email"
          type="email"
          label="Email"
          value={inputState.email}
          onChange={inputChangedHandler}
          required
          variant="outlined"
          margin="normal"
          error={!inputvalidityState.email}
          helperText={!inputvalidityState.email ? "Incorrect Email" : ""}
        />
        <TextField
          id="phone-number"
          type="number"
          label="Phone Number"
          value={inputState.phNumber}
          onChange={inputChangedHandler}
          variant="outlined"
          margin="normal"
          error={!inputvalidityState.phNumber}
          helperText={
            !inputvalidityState.phNumber ? "Incorrect Phone Number" : ""
          }
        />
        <p>
          <Button
            variant="contained"
            onClick={formSubmissionHandler}
            fullWidth={false}
            className="submit-button"
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            onClick={formResetHandler}
            fullWidth={false}
          >
            Reset
          </Button>
        </p>
        {!isFormValid && (
          <p className="error-message">
            Please provide correct values in the input fields
          </p>
        )}
      </FormControl>
    </div>
  );
};

export default Form;
