import { create } from 'zustand';
import spring from '../asset/image/spring.avif'
import summer from '../asset/image/summer.jpg'
import autumn from '../asset/image/autumn.avif'
import winter from '../asset/image/winter.avif'
import springLow from '../asset/image/spring_low.jpg'
import summerLow from '../asset/image/summer_low.jpg'
import autumnLow from '../asset/image/autumn_low.jpg'
import winterLow from '../asset/image/winter_low.jpg'


const useThemeStore = create(set => ({
    isDarkMode: false,
    isThemeMode: false,
    currentSeason: 'spring',
    setDarkMode: (isDarkMode) => set({ isDarkMode }),
    setThemeMode: (isThemeMode) => set({ isThemeMode }),
    setSeason: (season) => set({ currentSeason: season }),


    font: {
        shapeFont: "'Nanum Myeongjo', serif", //중요한 부분.섹시한 폰트
        nomalFont: "Averia Gruesa Libre, system-ui", //봄
        nomalFont2: "Indie Flower, cursive", //normalFont보다 장난기 있는 폰트
        popFont: "Permanent Marker, cursive", //팝송에서 자주 본 폰트
        rockFont: "Rock Salt, cursive",  //여름, -team NOST
        rockFont2: "Zeyada, cursive", //rockFont보다 필기체 느낌이 강함. 내용으로 하면 어울릴듯
        scaryFont: "Creepster, system-ui", //장난스러운 공포 부분
        thickFont: "Poetsen One, sans-serif", //재밋는 부분. 약간 두꺼움
        titanFont: "Titan One, sans-serif", //포스터 느낌 매우 두꺼움
    },


    themes: {
        spring: {
            default: '#FFFAF0',
            secondary: '#ffffff', // main 에 글자기입박스칼라
            textColor: '#DB7093',
            titleColor: '#FF69B4',
            subtitle: 'Experience the rebirth of nature with Novel Stella.Experience the rebirth of nature.',
            subtitle2: "Novel Stella",
            sidebarBg: '#FFD1DC',
            mainpageBackgroundColor: 'rgba(255, 255, 255)',
            additionalColors: ['#fff', '#FFB6C1', '#FF69B4', '#C71585', '#DB7093'],
            lowRes: springLow,
            highRes: spring,
            buttonBackgroundColor: '#FFEBEE',
            buttonTextColor: '#DB7093',
            teamColor: '#000',
            drinkColor: '#FF69B4',
            neonEffect: {
                color: '#DB7093',
                titleTextShadow: '0 0 5px #FFD1DC, 0 0 10px #FFD1DC, 0 0 20px #FFB6C1, 0 0 30px #FFB6C1, 0 0 40px #ff0080, 0 0 55px #FFEBEE, 0 0 75px #DB7093',
                buttonTextShadow: '',
            }

        },
        summer: {
            default: '#001f3f',
            secondary: '#ffffff',
            textColor: '#002d70',
            titleColor: '#00FFFF',
            subtitle: 'Find calmness in the summer rain with Novel Stella.Find calmness in the summer rain.',
            sidebarBg: '#B0C4DE',
            mainpageBackgroundColor: '#001f3f',
            additionalColors: ['#fff', '#2ECC40', '#3D9970', '#7FDBFF', '#001f3f'],
            lowRes: summerLow,
            highRes: summer,
            buttonBackgroundColor: '#b7e1ff',
            buttonTextColor: '#002d70',
            teamColor: '#fff',
            drinkColor: '#001f3f',
            neonEffect: {
                color: '#fff',
                titleTextShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #9400D3, 0 0 30px #9400D3, 0 0 40px #9400D3, 0 0 55px #9400D3, 0 0 75px #9400D3',
                buttonTextShadow: '0 0 5px #000, 0 0 10px #000, 0 0 20px #001f3f, 0 0 30px #000, 0 0 40px #000, 0 0 55px #000, 0 0 75px #000',
            }

        },
        autumn: {
            default: '#F5F5DC',
            secondary: '#ffffff',
            textColor: '#8B4513',
            titleColor: '#FF4500',
            subtitle: 'Embrace the vibrant autumn leaves with "Novel Stella.Embrace the vibrant autumn.',
            sidebarBg: '#FFE4B5',
            additionalColors: ['#fff', '#CD853F', '#8B4513', '#A0522D', '#FFE4B5'],
            lowRes: autumnLow,
            highRes: autumn,
            mainpageBackgroundColor: '#FFE4B5',
            buttonBackgroundColor: '#fdbe80',
            buttonTextColor: '#D2691E',
            teamColor: '#8B4513',
            drinkColor: '#FF4500',
            neonEffect: {
                color: '#D2691E',
                titleTextShadow: '0 0 5px #FFD1DC, 0 0 10px #D2691E, 0 0 20px #D2691E, 0 0 30px #D2691E, 0 0 40px #D2691E, 0 0 55px #D2691E, 0 0 75px #D2691E',
                buttonTextShadow: '',
            }
        },
        winter: {
            default: '#1C1C1C',
            secondary: '#FFFFFF',
            textColor: '#000000',
            titleColor: '#87CEEB',
            subtitle: 'Feel the warmth of winter with Novel Stella.Feel the warmth of winter.',
            sidebarBg: '#A9A9A9',
            additionalColors: ['#fff', '#B0C4DE', '#4682B4', '#708090', '#778899'],
            lowRes: winterLow,
            highRes: winter,
            mainpageBackgroundColor: '#000000',
            buttonBackgroundColor: '#696969',
            buttonTextColor: '#DCDCDC',
            teamColor: '#FFFFFF',
            drinkColor: '#87CEEB',
            neonEffect: {
                color: '#5F9EA0',
                titleTextShadow: '0 0 5px #00CED1, 0 0 10px #00CED1, 0 0 15px #00CED1',
                buttonTextShadow: '',
            }
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
