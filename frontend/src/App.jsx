

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CareerChoice from "./pages/CareerChoice";
import CareerForm from "./pages/CareerForm";
import Recommendation from "./pages/Recommendation";
import Courses from "./pages/Courses";
// import MentorChat from "./pages/MentorChat";
// import VoiceAssistant from "./pages/VoiceAssistant";
import CareerCourses from "./pages/CareerCourses";
import ExploreCourseDetails from "./pages/ExploreCourseDetails";
import CareerAfter10th from "./pages/CareerAfter10th";
import Career10thDetails from "./pages/Career10thDetails";
import Career10thCourses from "./pages/Career10thCourses";
import Career10thRecommend from "./pages/Career10thRecommend";
import Career10thResults from "./pages/Career10thResults";
import Career10thStream from "./pages/Career10thStream";
import CareerAfterInter from "./pages/CareerAfterInter";
import CareerInterRecommend from "./pages/CareerInterRecommend";
import CareerAfterInterStream from "./pages/CareerAfterInterStream";
import CareerInterResults from "./pages/CareerInterResults";
import Profile from "./pages/Profile";
import History from "./pages/History";
import SmartAssistant from "./components/SmartAssistant";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Main */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        {/* Career Flow */}
        
        <Route path="/career" element={<CareerChoice />} />
        <Route path="/career-form" element={<CareerForm />} />
        <Route path="/recommendation" element={<Recommendation />} />

        {/* Explore Flow */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/career/:career" element={<CareerCourses />} />
        <Route path="/career/:career/:course" element={<ExploreCourseDetails />} />

        {/* AI */}
        {/* <Route path="/mentor" element={<MentorChat />} />
        <Route path="/voice" element={<VoiceAssistant />} /> */}
        {/* AI Assistant */}
        <Route path="/assistant" element={<SmartAssistant />} />


       
        <Route path="/career-10th" element={<CareerAfter10th />} />
        <Route path="/career-10th/:stream" element={<Career10thCourses />} />
        <Route path="/career-10th/:stream/:course" element={<Career10thDetails />} />

        <Route path="/career-after-10th/recommend" element={<Career10thRecommend />} />

        <Route path="/career-after-10th/results" element={<Career10thResults />} />
        <Route path="/career-after-10th/:stream" element={<Career10thStream />} />
        <Route path="/career-after-inter" element={<CareerAfterInter />} />

        <Route path="/career-after-inter/recommend" element={<CareerInterRecommend />} />
        <Route path="/career-after-inter/:stream" element={<CareerAfterInterStream />} />
        <Route path="/career-after-inter/results" element={<CareerInterResults />} />
        <Route path="/history" element={<History />} />

        
      </Routes>
    </Router>
  );
}



