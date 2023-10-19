import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (
    firstName,
    lastName,
    cellNumber,
    gender,
    barangay,
    municipality,
    province,
    region,
    username,
    email,
    password,
    confirmPassword
  ) => {
    const response = await fetch('http://localhost:3000/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        cellNumber,
        gender,
        barangay,
        municipality,
        province,
        region,
        username,
        email,
        password,
        confirmPassword,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      console.log('Im Here');

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the AuthContext
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
