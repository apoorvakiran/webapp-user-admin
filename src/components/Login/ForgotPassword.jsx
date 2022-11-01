import React from 'react';
import './loginForm.css';
import { FormHeader } from '../formComponents/FormHeader';
import { FormInput } from '../formComponents/FormInput';
import { FormButton } from '../formComponents/FormButton';

const ForgotPassword = () => {
    return (
        <div className="loginform">
            <FormHeader id="formHeaderId" title="Password Recovery" />
            <FormInput id="email" description="Email" placeholder="Enter E-mail" type="text" />
            <FormButton id="buttonLogin" title="Send Password Update Link" changeStyleClass="" />
        </div>
    );
};

export default ForgotPassword;