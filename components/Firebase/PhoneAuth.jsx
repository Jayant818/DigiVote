"use client"
// PhoneAuth.jsx
import React, { useState } from 'react';
import app from './firebase';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const handleSendCode = () => {
    // Initialize Firebase Auth object
    const auth = app.auth();
    
    // Create a RecaptchaVerifier instance
    const recaptchaVerifier = new auth.RecaptchaVerifier('send-code-button', {
      size: 'invisible',
    });

    // Request to send verification code to the provided phone number
    auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleVerifyCode = () => {
    const credential = app.auth.PhoneAuthProvider.credential(verificationId, verificationCode);

    app.auth().signInWithCredential(credential)
      .then((userCredential) => {
        // User signed in successfully
        console.log('User signed in:', userCredential.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button id="send-code-button" onClick={handleSendCode}>Send Code</button>
      <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
      <button onClick={handleVerifyCode}>Verify Code</button>
    </>
  );
};

export default PhoneAuth;
