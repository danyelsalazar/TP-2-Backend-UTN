// Punto de composicion: envolvemos el router con el proveedor de auth
import { AuthProvider } from "./controllers/AuthContext";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
