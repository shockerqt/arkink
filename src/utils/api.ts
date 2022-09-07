export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  banner: string;
  locale: string;
}

export interface IGuild {
  id: string;
  name: string;
  icon: string | null;
}
// DEPRECATED
// export const login = async (code: string, setUser: (user: User) => void) => {
//   const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ code }),
//     credentials: 'include',
//   });

//   const user: User = await response.json();

//   if (response.ok) setUser(user);
// };


export const fetchApi = async (endpoint: string, callback?: (response: Response) => void) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}${endpoint}`, {
    credentials: 'include',
  });

  console.log(`LLAMADA AL ${endpoint}`);
  if (callback) callback(response);
};

export const fetchUser = (callback: (response: Response) => void) => fetchApi('/user', callback);


export const fetchRoster = async () => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/roster`, {
    credentials: 'include',
  });

  console.log(await response.json());
};

export const registerGuild = async (guildId: string, callback: () => void) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/guild/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ guildId }),
  });

  if (response.ok) {
    callback();
  }
};

export const fetchGuild = async (guildId: string, callback: (response: Response) => void) => {
  console.log('FETCH GUILD')
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/guild/${guildId}`, {
      credentials: 'include',
    });

    if (callback) callback(response);
  } catch (error) {
    console.log(error);
  }
};

export const fetchMyGuilds = async (callback?: (response: Response) => void) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/guilds`, {
    credentials: 'include',
  });

  console.log('LLAMADA A MY GUILDS');

  if (callback) callback(response);
};

export const fetchMyUnregisteredGuilds = async (callback?: (response: Response) => void) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/guilds/unregistered`, {
    credentials: 'include',
  });

  console.log('LLAMADA A MY UNREG GUILDS');

  if (callback) callback(response);
};
