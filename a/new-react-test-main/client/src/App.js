import {BrowserRouter, Routes, Route, Redirect} from 'react-router-dom';

import Home from './pages/homepage.js';
import Footer from './components/footer.js'

function App() {
    return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element= {<Home/>}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}



export default App;