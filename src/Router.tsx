import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {
    toggleTheme: () => void;
    isDark: boolean;
}

function Router({toggleTheme,isDark}:IRouterProps) {

 return (
  <BrowserRouter>
   <Routes>
    <Route path="/:coinId/*" element={<Coin isDark={isDark}/>} />
    <Route  path={process.env.PUBLIC_URL + "/"}  element={<Coins toggleTheme={toggleTheme} isDark={isDark}/>}></Route>
   </Routes>
  </BrowserRouter>
 );
}

export default Router;