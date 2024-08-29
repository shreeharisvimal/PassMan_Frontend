import { Route, Routes } from 'react-router-dom'
import PrivateRouter from './Wrapper/PrivateRouter'
import SignInOrSignUp from './Pages/Login/UserLogin';
import OtpVerification from './Pages/Otp/OtpVerification';
import LandingPage from './Pages/User/UserPage';

function App() {

  return (
    <Routes>
            <Route path="/" element={<SignInOrSignUp />} />
            <Route path="otpVarify/" element={<OtpVerification />} />
            <Route path="LandingPage/" element={<PrivateRouter><LandingPage /></PrivateRouter>} />
    </Routes>
  );

}

export default App;
