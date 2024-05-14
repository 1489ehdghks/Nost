
import './App.scss';
import AppRouter from '../utils/router/Approuter';
import { BrowserRouter } from 'react-router-dom';
import useThemeStore from '../shared/store/Themestore';

function App() {
  const { toggleDarkMode, toggleThemeMode } = useThemeStore();
  return (
    <div className="App">
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <button onClick={toggleThemeMode}>Toggle Theme Mode</button>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
