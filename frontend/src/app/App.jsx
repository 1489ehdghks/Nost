
import './styles/App.scss';
import AppRouter from './Approuter';
import { BrowserRouter } from 'react-router-dom';
import useThemeStore from '../features/theme/store/Themestore';
import DarkModeToggle from '../widgets/button/DarkModeToggle';
import ThemeModeToggle from '../widgets/button/ThemeModeToggle';
import useAuthStore from '../features/auth/store/AuthStore';

function App() {
  const { toggleDarkMode, toggleThemeMode, themes, isDarkMode, isThemeMode } = useThemeStore();
  const { token } = useAuthStore();
  const currentTheme = isThemeMode ? themes.winter : themes.spring;

  return (
    <div className="App" style={{ backgroundColor: currentTheme.primary, color: currentTheme.textColor }}>
      <div className="theme-toggles">
        <DarkModeToggle className="toggle-button" />
      </div>
      <div className="theme-toggles2">
        <ThemeModeToggle className="toggle-button" />
      </div>


      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
