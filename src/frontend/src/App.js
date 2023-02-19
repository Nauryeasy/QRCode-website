import Header from "./Components/Header/Header";
import "./Resetter.css";
import "./Vars.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Container from "./Components/Container/Container";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import QRChecker from "./Components/QRChecker/QRChecker";
import URLChecker from "./Components/URLChecker/URLChecker";
import Main from "./Components/Main/Main";
import URLResult from "./Components/URLResult/URLResult";
import Footer from "./Components/Footer/Footer";
import API from "./Components/API/API";

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
                        <Route path="/main" element={<Main />} />
                        <Route path="/checkQR" element={<QRChecker />} />
                        <Route path="/checkURL" element={<URLChecker />} />
                        <Route path="/api" element={<API />} />
                        <Route
                            path="*"
                            element={<Navigate to="/main" replace />}
                        />
                        <Route path="/URLResult" element={<URLResult/>} />
                    </Routes>
                <NotificationContainer></NotificationContainer>
            </Container>
            <Footer/>
            </BrowserRouter>
    );
}

export default App;
