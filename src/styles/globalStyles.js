import { createGlobalStyle } from "styled-components";
import logoType from '../Assets/icons/LogoMakr.png';
import logoType2 from '../Assets/icons/LogoMakr2.png';

export const GlobalStyle = createGlobalStyle`
 body{
     background: ${({ theme}) => theme.body};
     color: ${({ theme}) => theme.text};
     transition: all 2s linear;
     color: ${({ theme}) => theme.h2};
     
 }

::-webkit-scrollbar-thumb{
    background: ${({ theme}) => theme.scrollbarthumb};
    border-radius: 8px;
    
}
::-webkit-scrollbar-track {
    background: ${({ theme}) => theme.scrollbar};
    border-radius: 8px;
}
p {
    color: ${({ theme}) => theme.text};

}
span {
    color: ${({ theme}) => theme.text};
    margin: auto;
}
Containered {
    background: ${({ theme}) => theme.backgroundcolor};
}
button {
    border-radius: 35px;
    font-size: 20px;
}
h3 {
    color: ${({ theme}) => theme.h3};
}
.btnbtn-primary {
 background: ${({ theme}) => theme.primary};
 color: ${({ theme}) => theme.color};
 margin-left: 60px;
 border-radius: 15px;
 font-size: 20px;
 padding: 4px;
}
.CodeClear {
    marginTop: 400px;
}
.logoType {
 color: ${({ theme}) => theme.logo};
}
.SecondStars {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: auto:
}
`;

export const lightTheme = {
    body: 'linear-gradient( #261447d9, black)',
    text: '#fff',
    textshadow: '3px 5px 2px #177a87, 4px 6px 2px #2ed2e6',
    backgroundcolor: 'gray',
    background: "black",
    h2: 'red',
    boxshadow: 'inset 0 0 5px grey',
    backgroundtext: 'red',
    h3: 'white',
   scrollbar: '#c7c3c38c',
   scrollbarthumb: ' #35020285',
   primary: 'white',
   color: 'black',
   logo: {logoType},
   
}

export const darkTheme = {
    body: 'linear-gradient( #c7c3c3, #975fff)',
    text: '#121212',
    textshadow: '3px 5px 2px #177a87, 4px 6px 2px #2ed2e6',
    h2: 'blue',
    boxshadow: 'inset 0 0 5px blue',
    backgroundtext: 'blue',
    backgroundcolor: '#2ed2e6',
    background: "black",
    h3: 'black',
    scrollbar: '#3131312c',
    scrollbarthumb: '#2ed2e6',
    primary: '#1e1e1e',
    color: 'white',
    logo: {logoType2},
}