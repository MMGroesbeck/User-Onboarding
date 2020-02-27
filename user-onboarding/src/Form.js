import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Form.css"

const UserForm = ({values, touched, errors, status}) => {
    const [user, setUser] = useState({});
    useEffect (() => {
        console.log("status has changed", status)
        status && setUser(user => status)
    },[status])
  return (
    <div className="user-form-box">
      <Form class="user-form">
        <label htmlFor="name">
          Name:
          <Field id="name" type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && (<p className="errors">{errors.name}</p>)}
        </label>
        <label htmlFor="email">
          email:
          <Field id="email" type="text" name="email" placeholder="email" />
          {touched.email && errors.email && (<p className="errors">{errors.email}</p>)}
        </label>
        <label htmlFor="password">
          Password:
          <Field id="password" type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && (<p className="errors">{errors.password}</p>)}
        </label>
        <label htmlFor="terms-of-service">
            Accept Terms of Service?
            <Field id="tos" type="checkbox" name="tos"/>
            {touched.tos && errors.tos && (<p className="errors">{errors.tos}</p>)}
        </label>
        <button type="submit">Submit</button>
      </Form>
      {user.id && <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>email: {user.email}</li>
          <li>Password: {user.password}</li>
          <li>ToS accepted? {user.tos.toString()}</li>
      </ul>}
    </div>
  );
};

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, tos}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3, "Please enter a longer name.").required("Please enter a name."),
        email: Yup.string().email("Please enter a valid email.").required("Email required."),
        password: Yup.string().min(8, "Password must be at least 8 characters.").required("Please enter a password."),
        tos: Yup.mixed().notOneOf([false],"Please accept Terms of Service.")
    }),
    handleSubmit(values, {setStatus, resetForm}){
        axios.post("https://reqres.in/api/users/", values)
        .then( response => {
            console.log("Post successful, ", response);
            setStatus(response.data);
            resetForm();
        })
    }
})(UserForm);

export default FormikUserForm;