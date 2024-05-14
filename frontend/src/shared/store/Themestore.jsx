import create from 'zustand';

const useThemeStore = create(set => ({
    isDarkMode: false,
    isThemeMode: false,
    toggleDarkMode: () => set(state => ({ isDarkMode: !state.isDarkMode })),
    toggleThemeMode: () => set(state => ({ isThemeMode: !state.isThemeMode })),
    themes: {
        spring: {
            primary: '#ff7f7f',
            secondary: '#ffeef8',
            textColor: '#305030',
            fontFamily: 'Georgia',
            sidebarBg: '#f8b7d0',
            additionalColors: ['#ffcad4', '#f4acb7', '#9d8189', '#d8e2dc', '#8d99ae']
        },
        summer: {
            primary: '#0af',
            secondary: '#a1c4fd',
            textColor: '#001f3f',
            fontFamily: 'Verdana',
            sidebarBg: '#7ec8e3',
            additionalColors: ['#3bceac', '#5cdb95', '#379683', '#8ee4af', '#05386b']
        },
        autumn: {
            primary: '#fa8231',
            secondary: '#f7c978',
            textColor: '#561212',
            fontFamily: 'Times New Roman',
            sidebarBg: '#d49a6a',
            additionalColors: ['#ed6663', '#ffa372', '#b27749', '#f7b32b', '#eae8e1']
        },
        winter: {
            primary: '#80d0c7',
            secondary: '#91d1e3',
            textColor: '#164e63',
            fontFamily: 'Courier New',
            sidebarBg: '#5eaaa8',
            additionalColors: ['#bcf8ec', '#a9def9', '#e4bad4', '#f1e3f3', '#ceb5b7']
        }
    }
}));

export default useThemeStore;
