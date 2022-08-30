import { lazy, useEffect, useState } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';

import Layout from './components/Layout';
import { fetchUser, login } from './utils/api';

const Home = lazy(() => import(/* webpackChunkName: "home" */ './routes/Home'));

export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  banner: string;
  locale: string;
}

const App = () => {
  const [user, setUser] = useState<User>();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('code');
      setSearchParams(newSearchParams);

      login(code, (userData) => setUser(userData));
    } else if (!user) {
      fetchUser((userData) => setUser(userData));
    }

  }, [searchParams]);


  return (
    <Routes>
      <Route path="/" element={<Layout user={user} setUser={setUser} />}>

        <Route index element={<Home />} />

        {/* <Route path="remedios" element={
          <React.Suspense fallback={<>...</>}>
            <Products section="remedies" constraints={constraints} />
          </React.Suspense>
        }/> */}

      </Route>
    </Routes>
  );
};

export default App;
