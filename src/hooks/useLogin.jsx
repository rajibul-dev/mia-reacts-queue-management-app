import { useState } from 'react'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const login = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    // Sign in with email and password
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(`User logged in`, result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { login, error, isPending };
}