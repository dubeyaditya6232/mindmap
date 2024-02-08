import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';

function App() {


  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/'>
            <Route index element={<Navigate to='/dashboard' replace />} />
            <Route path='dashboard' element={<Home />} />
            <Route path=':word' element={<Home />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
