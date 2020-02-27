import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = props => {
  return (
    <div className="user-form">
      <Form>
        <label htmlFor="name">
          Name:
          <Field id="name" type="text" name="name" placeholder="Name" />
        </label>
        <label htmlFor="email">
          email:
          <Field id="email" type="text" name="email" placeholder="email" />
        </label>
        <label htmlFor="password">
          Password:
          <Field id="password" type="password" name="password" placeholder="Password" />
        </label>
        <label htmlFor="terms-of-service">
            Accept Terms of Service?
            <Field id="tos" type="checkbox" name="tos"/>
        </label>
        <button>Submit</button>
      </Form>
    </div>
  );
};

const FormikUserForm = withFormik({
    handleSubmit(values, {setStatus, resetForm}){
        console.log(values);
    }
})(UserForm);

export default FormikUserForm;