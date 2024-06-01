import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { AuthContextProvider } from "./context/auth/authContext.tsx";
import { UserContextProvider } from "./context/auth/userContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <React.Fragment>
    <AuthContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AuthContextProvider>
  </React.Fragment>
);
