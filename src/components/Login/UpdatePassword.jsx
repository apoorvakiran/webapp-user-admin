import React from 'react';
import './loginForm.css';
import { FormHeader } from '../formComponents/FormHeader';
import { FormInput } from '../formComponents/FormInput';
import { FormButton } from '../formComponents/FormButton';

const UpdatePassword = () => {
    return (
        <div className="loginform">
            <FormHeader id="formHeaderId" title="Mentore" />
            <h4 className="emailTitle">colin.oguro@mentor.ai</h4>
            <FormInput id="password" type="password" description="Password" placeholder="Password" />
            <FormInput id="confirmPassword" description="Confirm Password" placeholder="Password confirmation" type="password" />
            <FormButton id="buttonLogin" title="Save" changeStyleClass="" />
        </div >
    );
};

export default UpdatePassword;