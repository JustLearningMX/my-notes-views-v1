import { Header } from "./header/Header";
import { Main } from "./main/Main";
import { Footer } from "./footer/Footer";
import {BrowserRouter as Router} from 'react-router-dom';

export default function App(){
   return (
      <Router>
         <Header />
         <Main />         
         <Footer />
      </Router>
   );
};