import { Route, Routes } from 'react-router-dom'
import PrivateRouter from './Wrapper/PrivateRouter'
import SignInOrSignUp from './Pages/Login/UserLogin';
import OtpVerification from './Pages/Otp/OtpVerification';
import LandingPage from './Pages/User/UserPage';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <Routes>
    <ToastContainer />
            <Route path="/" element={<SignInOrSignUp />} />
            <Route path="otpVarify/" element={<OtpVerification />} />
            <Route path="LandingPage/" element={<PrivateRouter><LandingPage /></PrivateRouter>} />
    </Routes>
  );

}

export default App;
