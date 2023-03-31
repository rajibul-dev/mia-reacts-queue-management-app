import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'
import { useState } from 'react'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false)

  const logout = () => {
    setError(null);
    setIsPending(true);

    signOut(auth)
      .then(() => {
        dispatch({ type: 'LOGOUT' })
        setIsPending(false)
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false)
      })
  }

  return {logout, error, isPending}
}