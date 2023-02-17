import Header from "./Components/Header/Header";
import "./Resetter.css";
import "./Vars.css";
import {
    createBrowserRouter,
    Route,
    BrowserRouter,
    RouterProvider,
    Routes,
} from "react-router-dom";
import Container from "./Components/Container/Container";
import ImageUpload from "./Components/ImageUpload/ImageUpload";
import Errors from "./Components/Errors/Errors";
import { ErrorsContext } from "./context";
import useErrors from "./hooks/useErrors";
import { useContext } from "react";

function App() {
    const navbar = [
        { title: "Главная", link: "./main" },
        { title: "Проверить", link: "./check" },
        { title: "API", link: "./api" },
    ];
    return (
        <ErrorsContext.Provider value={[]}>
            <BrowserRouter>
                <Header navbar={navbar} />
                <Container>
                    <Routes>
                        <Route path="/" element={<ImageUpload></ImageUpload>} />
                        <Route
                            path="/main"
                            element={<ImageUpload></ImageUpload>}
                        />
                        <Route path="/check" element={<div>check</div>} />
                        <Route path="/api" element={<div>api</div>} />
                    </Routes>
                    <Errors></Errors>
                    <button>asd</button>
                </Container>
            </BrowserRouter>
        </ErrorsContext.Provider>
    );
}

export default App;
