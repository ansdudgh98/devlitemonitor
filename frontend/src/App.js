import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./page/public/Home";
import {NotFound} from "./page/public/NotFound";
import {PrivateRoute} from "./page/private/PrivateRoute";
import GrafanaOrgAccountCreatePage from "./page/private/GrafanaOrgAccountCreatePage";
import GrafanaAccountCreatePage from "./page/private/GrafanaAccountCreatePage";
import GrafanaGuidePage from "./page/private/GrafanaGuidePage";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/guide" element={<GrafanaGuidePage/>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path="/grafanaOrgAccountCreate" element={<GrafanaOrgAccountCreatePage/>}/>
                    <Route path="/grafanaAccountCreate" element={<GrafanaAccountCreatePage/>}/>
                    <Route path="/guide" element={<GrafanaGuidePage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
