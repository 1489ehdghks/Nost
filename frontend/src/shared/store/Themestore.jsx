import { create } from 'zustand';
import spring from '../../shared/asset/image/spring.avif'
import summer from '../../shared/asset/image/summer.jpg'
import autumn from '../../shared/asset/image/autumn.avif'
import winter from '../../shared/asset/image/winter.avif'

const useThemeStore = create(set => ({
    isDarkMode: false,
    isThemeMode: false,
    setDarkMode: (isDark) => set({ isDarkMode: isDark }),
    setThemeMode: (isTheme) => set({ isThemeMode: isTheme }),

    themes: {
        spring: {
            default: '#ff7f7f',
            secondary: '#ffeef8',
            textColor: '#305030',
            fontFamily: 'Georgia',
            sidebarBg: '#f8b7d0',
            additionalColors: ['#ffcad4', '#f4acb7', '#9d8189', '#d8e2dc', '#8d99ae'],
            backgroundImage: `url(${spring})`,
            buttonBackgroundColor: '#ff7f7f',
            buttonTextColor: '#ffeef8'

        },
        summer: {
            default: '#0af',
            secondary: '#a1c4fd',
            textColor: '#001f3f',
            fontFamily: 'Verdana',
            sidebarBg: '#7ec8e3',
            additionalColors: ['#3bceac', '#5cdb95', '#379683', '#8ee4af', '#05386b'],
            backgroundImage: `url(${summer})`,
            buttonBackgroundColor: '#0af',
            buttonTextColor: '#a1c4fd'

        },
        autumn: {
            default: '#fa8231',
            secondary: '#f7c978',
            textColor: '#561212',
            fontFamily: 'Times New Roman',
            sidebarBg: '#d49a6a',
            additionalColors: ['#ed6663', '#ffa372', '#b27749', '#f7b32b', '#eae8e1'],
            backgroundImage: `url(${autumn})`,
            buttonBackgroundColor: '#fa8231',
            buttonTextColor: '#f7c978'
        },
        winter: {
            default: '#80d0c7',
            secondary: '#91d1e3',
            textColor: '#f5f5f5',
            fontFamily: 'Courier New',
            sidebarBg: '#5eaaa8',
            additionalColors: ['#bcf8ec', '#a9def9', '#e4bad4', '#f1e3f3', '#ceb5b7'],
            backgroundImage: `url(${winter})`,
            buttonBackgroundColor: '#80d0c7',
            buttonTextColor: '#f5f5f5'
        }
    }
}));

export default useThemeStore;


//봄
//여름
//가을
//겨울
//https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
//https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
//https://www.pixel4k.com/wp-content/uploads/2018/11/mountains-starry-sky-snow-ice-floes-night-4k_1541117417.jpg.webp
