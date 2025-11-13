import { Outlet } from "react-router-dom";
import {Provider} from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import appStore from "./store/appStore";

function App() {
  return (
    <Provider store={appStore}> 
      <div className="">
        <Header />
        {/* Nested pages will render here */}
        <Outlet />
        <Footer/>
      </div>
    </Provider>
  );
}

export default App;
