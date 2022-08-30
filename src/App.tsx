import { lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';

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
