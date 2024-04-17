import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Router from "./pages/router";
import { Toaster } from "./components/ui/toaster";
import AuthProvider from "./providers/AuthProvider";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
