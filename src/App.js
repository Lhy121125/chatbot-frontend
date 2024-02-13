import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadLink from "./components/UploadLink";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/upload-link" element={<UploadLink />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
