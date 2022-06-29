import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nivo from './Containers/Nivo';
import ReCharts from './Containers/recharts';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Nivo />} />
          <Route path="/recharts" element={<ReCharts />} />

          <Route path="*" element={<Nivo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
