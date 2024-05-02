import React, { useState } from "react";
import Dropzone from "react-dropzone"
import config from "../../config";

import ErrorList from "../layout/ErrorList";
import FormError from "../layout/FormError";
import translateServerErrors from "../../services/translateServerErrors";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    image: {}
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    setServerErrors({});
    const { email, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp.emailRegex;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
    return false;
  };

  const handleProfileImageUpload = (acceptedImage) => {
    setUserPayload({
      ...userPayload,
      image: acceptedImage[0]
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const newUserBody = new FormData()
    newUserBody.append("email", userPayload.email)
    newUserBody.append("password", userPayload.password)
    newUserBody.append("image", userPayload.image)
    try {
      if (validateInput(userPayload)) {
        const response = await fetch("/api/v1/users", {
          method: "POST",
          headers: new Headers({
            "Accept": "image/jpeg"
          }),
          body: newUserBody,
        });
        if (!response.ok) {
          if (response.status === 422) {
            const body = await response.json();
            const newServerErrors = translateServerErrors(body.errors);
            return setServerErrors(newServerErrors);
          }
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        return setShouldRedirect(true);
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="grid-container registration-div">
      <h1>Register</h1>
      <ErrorList errors={serverErrors} />
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Email
            <input type="text" className="form-input" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              className="form-input"
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <label>
            Password Confirmation
            <input
              className="form-input"
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <Dropzone onDrop={handleProfileImageUpload}>
          {({getRootProps, getInputProps}) => (
            <section className="drag-and-drop">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Upload Your Profile Image Here - drag and drop or click to upload</p>
              </div>
            </section>
          )}
        </Dropzone>
        <div>
          <input type="submit" className="button authentication-button" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
