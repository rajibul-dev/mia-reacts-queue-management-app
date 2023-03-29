import { useState } from 'react'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext()

  const login = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    // Sign in with email and password
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: 'LOGIN', payload: result.user })
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { login, error, isPending };
}