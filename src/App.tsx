
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../frontend/src/pages/AuthPage";
import Overview from "../frontend/src/pages/Overview";
import Profile from "../frontend/src/pages/Profile";
import InterviewQA from "../frontend/src/pages/InterviewQA";
import InterviewQuiz from "../frontend/src/pages/InterviewQuiz";
import Quiz from "../frontend/src/pages/Quiz";
import Results from "../frontend/src/pages/Results";
import Room from "../frontend/src/pages/Room";
import VideoCall from "../frontend/src/pages/VideoCall";
import Page404 from "../frontend/src/pages/Page404";
import CallNavbar from "../frontend/src/components/CallNavbar";
import Login from "./pages/Login";
import { useStore } from "../frontend/src/store/store";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../frontend/src/App.scss";
import 'react-tooltip/dist/react-tooltip.css';

const queryClient = new QueryClient();
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const { user, checkingAuth, getAuth } = useStore();
  const [serverStatus, setServerStatus] = useState('connecting');

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          setServerStatus('connected');
          clearInterval(intervalId);
        } else {
          setServerStatus('error');
        }
      } catch (error) {
        setServerStatus('error');
      }
    };

    const intervalId = setInterval(checkServerStatus, 5000);
    checkServerStatus();

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log('App: Getting auth status');
    getAuth();
  }, [getAuth]);

  useEffect(() => {
    console.log('App: User state changed:', user ? 'logged in' : 'not logged in');
    console.log('App: Checking auth:', checkingAuth);
  }, [user, checkingAuth]);

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center bg-black h-screen">
        <span className='loader-qs invert absolute'></span>
      </div>
    );
  }

  const Loader = () => {
    return (
      <div className="flex justify-center relative items-center bg-black h-screen">
        <p className='text-white text-2xl font-semibold absolute top-3/4'>Server not responding, please hold on or try again after sometime...</p>
        <span className='loader-eye absolute'></span>
      </div>
    );
  };

  if (serverStatus === 'error') {
    return <Loader />;
  }

  if (serverStatus === 'connected') {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ToastContainer 
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={user ? <Overview /> : <Navigate to="/login" replace />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
              <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" replace />} />
              <Route path="/qa" element={user ? <InterviewQA /> : <Navigate to="/login" replace />} />
              <Route path="/quiz" element={user ? <InterviewQuiz /> : <Navigate to="/login" replace />} />
              <Route path="/quiz/:id" element={user ? <Quiz /> : <Navigate to="/login" replace />} />
              <Route path="/results/:id" element={user ? <Results /> : <Navigate to="/login" replace />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
              <Route path="/createroom" element={<Room />} />
              <Route path="/createroom/:id" element={
                <>
                  <CallNavbar />
                  <VideoCall />
                </>
              } />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return null;
};

export default App;
