import { User } from '../App';

export const login = async (code: string, setUser: (user: User) => void) => {
  const response = await fetch(`${process.env.SERVER_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
    credentials: 'include',
  });

  const user: User = await response.json();

  if (response.ok) setUser(user);

};

export const fetchUser = async (setUser: (user: User) => void) => {
  const response = await fetch(`${process.env.SERVER_URL}/api/user`, {
    method: 'GET',
    credentials: 'include',
  });

  const user: User = await response.json();

  if (response.ok) setUser(user);

  console.log('fetchUser', user);
};
