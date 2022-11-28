import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";

function App() {
    return (
        <div className="wrapper">
            {/* забираeмо 100 пропсів за допомогою контексту */}
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                    {/* сторінка з динамічним ід (ід просто змінна яку можна назвати як завгодно і вона буде як ключ який має значення) */}
                    <Route path="/pizza/:id" element={<FullPizza />} />
                    <Route path="cart" element={<Cart />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
