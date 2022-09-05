import { useEffect, useState } from 'react';
import { fetchRoster, User } from '../utils/api';

interface Character {
  nickname: string;
  ilvl: number;
  class: string;
}

const Roster = ({ user, setUser }: {
  user: User | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
 }) => {
  const [roster, setRoster] = useState<Character[]>();

  useEffect(() => {
    fetchRoster();
  }, []);

  return (
    <div className="">
      ROSTER

    </div>
  );
};

export default Roster;
