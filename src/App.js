import './App.css';
import Head from './components/layouts/Head';
import Footer from './components/layouts/Footer';
import MenuLeft from './components/layouts/MenuLeft'; 
import { useLocation } from 'react-router-dom';
import MenuAccount from './components/layouts/MenuAccount';

function App(props) {
  const params = useLocation()

  return (
   <>
      <Head/>
         <section>
        <div className="container">
          <div className="row">
             {params.pathname.includes("account") ? <MenuAccount /> : <MenuLeft />}
             {props.children}
          </div>
        </div>
      </section>
      <Footer/>
   </>
  );
}

export default App;
