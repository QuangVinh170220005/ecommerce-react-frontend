import './App.css';
import Head from './components/layouts/Head';
import Footer from './components/layouts/Footer';
import MenuLeft from './components/layouts/MenuLeft'; 

function App(props) {
  return (
   <>
      <Head/>
         <section>
        <div className="container">
          <div className="row">
             <MenuLeft />
             {props.children}
          </div>
        </div>
      </section>
      <Footer/>
   </>
  );
}

export default App;
