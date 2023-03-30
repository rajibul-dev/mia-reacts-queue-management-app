import { useState } from 'react'
import { auth } from '../firebase/config'
import {
  sendPasswordResetEmail,
  confirmPasswordReset,
} from 'firebase/auth';

export const  useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const forgotPassword = async (email) => {
    setError(null);
    setIsPending(true);

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  const resetPassword = async (oobCode, newPassword) => {
    setError(null);
    setIsPending(true);

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setIsComplete(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  }

  return { error, isPending, forgotPassword, resetPassword }
}
