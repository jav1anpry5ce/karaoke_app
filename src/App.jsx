import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Room, Join } from "./pages";
import { ToastContainer } from "react-toastify";
import { Provider } from "./context/AppContext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Provider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="room/:id" element={<Room />} />
          <Route path="join" element={<Join />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
