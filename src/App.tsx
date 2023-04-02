import "./styles/global.scss"
import LogIn from './pages/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/list';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route  path="/" element={<LogIn/>} />
          <Route  path="/Home" element={<Home/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
