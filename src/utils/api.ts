export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  banner: string;
  locale: string;
}

export interface IGuild {
  id: number;
  guildname: string;
}

export const login = async (code: string, setUser: (user: User) => void) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
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

export const fetchUser = async (setUser: (user: User) => void, callback: () => void) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
      credentials: 'include',
    });

    const user: User = await response.json();

    if (response.ok) setUser(user);

    console.log('fetchUser', user);
  } catch (error) {
    console.log(error);
  }

  callback();
};

export const fetchRoster = async () => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/roster`, {
    credentials: 'include',
  });

  console.log(await response.json());
};

export const fetchGuilds = async (callback: (guilds: IGuild[]) => void) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/guild/all`, {
    credentials: 'include',
  });

  const guilds = await response.json();
  callback(guilds);
};

export const createGuild = async (guildname: string, callback: (guild: IGuild) => void) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/guild/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ guildname }),
  });

  if (response.ok) {
    const guild = await response.json();
    callback(guild);
  }
};

export const fetchGuild = async (guildId: number, callback: (guild: IGuild) => void) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/guild/${guildId}`, {
    credentials: 'include',
  });

  console.log('FETCH GUILD ');
  if (response.ok) {
    const guild = await response.json();
    console.log('FETCH GUILD ', guild);
    callback(guild);
  }
};
