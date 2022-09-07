import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import { fetchUser, User } from './utils/api';

const Roster = lazy(() => import('./components/Roster'));
const Guild = lazy(() => import('./components/Guild'));
const GuildSummary = lazy(() => import('./components/GuildSummary'));
const GuildRaids = lazy(() => import('./components/GuildRaids'));
const GuildTournaments = lazy(() => import('./components/GuildTournaments'));
const GuildMembers = lazy(() => import('./components/GuildMembers'));
const GuildSettings = lazy(() => import('./components/GuildSettings'));

const App = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchUser(async (response) => {
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    });
  }, []);


  return (
    <Routes>
      <Route path="/" element={<Layout user={user} />}>

        <Route index element={<></>} />

        <Route path="roster" element={
          <Suspense fallback={<>...</>}>
            <Roster user={user} setUser={setUser} />
          </Suspense>
        }/>

        <Route path="guild/:guildId" element={
          <Suspense fallback={<>...</>}>
            <Guild />
          </Suspense>
        }>
          <Route path="raids" element={
            <Suspense fallback={<>...</>}>
              <GuildRaids />
            </Suspense>
          } />
          <Route path="tournaments" element={
            <Suspense fallback={<>...</>}>
              <GuildTournaments />
            </Suspense>
          } />
          <Route path="members" element={
            <Suspense fallback={<>...</>}>
              <GuildMembers />
            </Suspense>
          } />
          <Route path="settings" element={
            <Suspense fallback={<>...</>}>
              <GuildSettings />
            </Suspense>
          } />
          <Route index element={
            <Suspense fallback={<>...</>}>
              <GuildSummary />
            </Suspense>
          } />
        </Route>

      </Route>
    </Routes>
  );
};

export default App;
