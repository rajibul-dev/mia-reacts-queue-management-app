import { useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  // const [isCancelled, setIsCancelled] = useState(false)
  // const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName) => {
    setError(null)

    // signup
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        res.user.updateProfile({
          displayName: displayName
        }).then(() => {
          // TODO dispatch signup
          console.log(`User signed up`, res.user);
        }).catch((err) => {
          setError(err.message)
        });
      })
      .catch((err) => {
        setError(err.message)
      })
    }

  return { signup, error, isPending }
}
