import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';
import { useState } from 'react';
import MindMap from './components/ELK/Elk';
import tr from './treeData.json';
import TreeComponent from './components/Tree/TreeComponent';

function App() {

  const [searchValue, setSearchValue] = useState(null)
  const [treeData, setTreeData] = useState(tr)
  const [loading, setLoading] = useState(true)

  return (
    // <MindMap/>
    <TreeComponent treeData={treeData}/>
    // <BrowserRouter>
    //   <Layout
    //     setSearchValue={setSearchValue}
    //     setTreeData={setTreeData}
    //     setLoading={setLoading}
    //     searchValue={searchValue}
    //   >
    //     <Routes>
    //       <Route path='/'>
    //         <Route index element={<Navigate to='/dashboard' replace />} />
    //         <Route path='dashboard' element={<Home
    //           treeData={treeData}
    //           loading={loading}
    //           searchValue={searchValue}
    //         />} />
    //         <Route path=':word' element={<Home
    //           treeData={treeData}
    //           loading={loading}
    //           searchValue={searchValue}
    //         />} />
    //       </Route>
    //     </Routes>
    //   </Layout>
    // </BrowserRouter>
  );
}

export default App;
