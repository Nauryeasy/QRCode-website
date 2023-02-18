import Header from "./Components/Header/Header";
import "./Resetter.css";
import "./Vars.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Container from "./Components/Container/Container";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import QRChecker from "./Components/QRChecker/QRChecker";
import URLChecker from "./Components/URLChecker/URLChecker";

function App() {
    const navbar = [
        { title: "Главная", link: "./main" },
        { title: "Проверить QR-код", link: "./checkQR" },
        { title: "Проверить URL", link: "./checkURL" },
        { title: "API", link: "./api" },
    ];

    return (
        <BrowserRouter>
            <Header navbar={navbar} />
            <Container>
                <Routes>
                    {/* <Route
                        path="/"
                        element={
                            
                        }
                    /> */}
                    {/* <Route
                        path="/main"
                        element={
                            <ImageUpload
                                image={image}
                                setImage={setImage}></ImageUpload>
                        }
                    /> */}
                    <Route path="/checkQR" element={<QRChecker />} />
                    <Route path="/checkURL" element={<URLChecker />} />
                    <Route path="/api" element={<div>api</div>} />
                </Routes>
            </Container>
            {/* NotificationManager.success(
                            "Success message",
                            "Title here",
                        ); */}
            <NotificationContainer></NotificationContainer>
        </BrowserRouter>
    );
}

export default App;
