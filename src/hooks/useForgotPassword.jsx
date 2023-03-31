import { useState } from 'react'
import { auth } from '../firebase/config'
import {
  sendPasswordResetEmail,
  confirmPasswordReset,
} from 'firebase/auth';

export const  useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(null);

  const forgotPassword = async (email) => {
    setSuccess(null);
    setError(null);
    setIsPending(true);
    
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Success: The password reset link is sent to your inpox!")
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };
  
  const resetPassword = async (oobCode, newPassword) => {
    setSuccess(null);
    setError(null);
    setIsPending(true);
    
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess('Password has been reset!')
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  }

  return { error, isPending, forgotPassword, resetPassword, success }
}
