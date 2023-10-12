// import { useSelector, useDispatch } from "react-redux/es/hooks/useSelector";
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './Routes';
import Layout from './Layout';
import "~/GlobalStyle/GlobalStyle.css"
import "~/GlobalStyle/AntDesignCustom.scss"
import "~/GlobalStyle/SlickCustom.css"
import { useEffect } from 'react';
import * as actions from '~/store/actions'
import { useDispatch } from 'react-redux';
import AuthDetails from './components/auth/AuthDetails';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getDiscover())
        dispatch(actions.getChart())
        dispatch(actions.getTop100())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />;
                })}
            </Routes>
            <AuthDetails/>
        </div>
    );
}

export default App;
