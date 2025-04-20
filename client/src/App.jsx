import { useState } from "react";
import AppLayout from "./layout/AppLayout";
// import MyProjectsPage from "./pages/MyProject";
import PageContainer from "./pages/PageContainer";
import { AppProvider, useAppContext } from "./context/AppContex";

function App() {
  return (
    <div className="h-screen bg-red-300 ">
      {
        // Wrapping the entire application with AppProvider to provide context

        // to all components
        <AppProvider>
          <AppLayout>{<PageContainer />}</AppLayout>
        </AppProvider>
      }
    </div>
  );
}

export default App;
