import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nivo from './Containers/Nivo';
import ReCharts from './Containers/recharts';
import Visx from './Containers/Visx';

import Layout from './components/Layout';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <div className="App">
          <Routes>
            <Route path="/" element={<Nivo />} />
            <Route path="/recharts" element={<ReCharts />} />
            <Route path="/visx" element={<Visx />} />

            <Route path="*" element={<Nivo />} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
