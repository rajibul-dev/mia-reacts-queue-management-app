import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    // Signup with email and password
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Set the display name
      await updateProfile(result.user, { displayName });

      dispatch({ type: 'LOGIN', payload: result.user })
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { signup, error, isPending };
};
