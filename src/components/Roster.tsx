import { SyntheticEvent, useEffect, useState } from 'react';
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
  const [newCharacterForm, setNewCharacterForm] = useState<Character>({
    nickname: '',
    ilvl: 0,
    class: '',
  });

  useEffect(() => {
    fetchRoster();
  }, []);

  const addCharacter = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(event);
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/roster/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(newCharacterForm),
    });

    if (response.ok) {
      console.log(response);
    }
  };

  return (
    <div className="mx-auto">
      <h1 className="font-medium text-3xl">Roster</h1>

      <form className="w-128" onSubmit={addCharacter}>
        <div className="flex">

          <div className="pt-4 pl-2 grow">
            <label className="block mb-1 text-xs font-bold uppercase text-gray-300" htmlFor="characterClass">Class</label>
            <select className="input" id="characterClass" required>
              <option value="Gunslinger">Gunslinger</option>
            </select>
          </div>

          <div className="pt-4 pl-4 basis-32">
            <label className="block mb-1 text-xs font-bold uppercase text-gray-300" htmlFor="characterIlvl">Item Level</label>
            <input id="characterIlvl" type="number" className="input" min={0} max={1650} value={newCharacterForm.ilvl} onChange={(event) => setNewCharacterForm(form => ({ ...form, ilvl: parseFloat(event.target.value) }))} required />
          </div>

        </div>
        <div className="pt-4 pl-2">
          <label className="block mb-1 text-xs font-bold uppercase text-gray-300" htmlFor="characterName">Name</label>
          <input id="characterName" type="text" className="input" value={newCharacterForm.nickname} onChange={(event) => setNewCharacterForm(form => ({ ...form, nickname: event.target.value }))} required />
        </div>

        <div className="pt-4 pl-2 text-right">
          <button className="btn btn-transparent mr-4" type="button">Back</button>
          <button className="btn btn-primary" type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Roster;
