import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/component/HomePage";
import WelcomePage from "../src/pages/WelcomePage";
import RoutinePage from "../src/pages/RoutinePage";
import { SignedIn, SignedOut, SignIn, SignUp, RedirectToSignIn } from "@clerk/clerk-react";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn routing="path" path="/signin" />} />
        <Route path="/signup" element={<SignUp routing="path" path="/signup" />} />

        {/* Protected Routes */}
        <Route
          path="/welcome"
          element={
            <SignedIn>
              <WelcomePage />
            </SignedIn>
          }
        />
        <Route
          path="/routine"
          element={
            <SignedIn>
              <RoutinePage />
            </SignedIn>
          }
        />

        {/* Redirect Unauthenticated Users */}
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;