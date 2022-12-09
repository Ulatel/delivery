import { grey } from '@mui/material/colors';
import $ from 'jquery';

export default function(prefersDarkMode){
    let mode = window.SuperGlobal.darkMode[0];
    
    if (mode){
        $('html').css({
            'background': '#333333',
        });
    } else {
        $('html').css({
            'background': '#fff',
        });
    }
    
    return {
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            light: "#abffbb",
            main: "#00ffbb",
            dark: "#ffffbb",
            primary: {
                main: "#00AA00",
            },
            text: {
                primary: mode ? '#eee' : '#fff',
            },
            
            pages: {
                main: {
                    Main: {
                        bg: {
                            height: '100%',
                            backgroundColor: mode ? '#333333' : '#f8f9fa',
                        },
                        
                        img: {
                            position: 'fixed',
                            bottom: 0,
                            left: 0,

                            height: { xs: '13em', md: '15em', lg: '18em', xl: '25em' }
                        },
                    },
                    
                    H3: {
                        color:  mode ? '#eee' : '#fff',
                        fontSize: 24,
                        marginBottom: 2
                    },

                    Hamburger:{
                        icon: {
                            mr: 2,
                            display: { xs: 'block', md: 'none' },
                        },
                        
                        shading: {
                            width: '100%',
                            height: '100%',
                            position: 'fixed',
                            left: 0,
                            top: 0,
                            opacity: 0,
                            transition: 'opacity 0.25s ease',
                            backgroundColor: prefersDarkMode ? '#000000f0' : '#00000080',
                            zIndex: 5,
                        },
                        
                        menu: {
                            width: '60%',
                            height: '100%',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            transform: 'translateX(-100%);',
                            transition: 'transform 0.25s ease',
                            zIndex: 10,
                        },
                        
                        header: {
                            backgroundColor: mode ? '#c175009e' : '#ff8301',
                        },
                        
                        title: {
                            width: '100%',
                            display: 'block',
                            boxSizing: 'border-box',
                            textAlign: 'center',
                            fontWeight: 'bolder',
                            fontSize: 30,
                            p: 1,
                        },
                        
                        buttons: {
                            fontSize: 24,
                            marginBottom: '0.25em',
                        },
                    },
                    
                    Header: {
                        bg: {
                            
                        },

                        buttons: {
                            
                        },
                    },
                    
                    Movie: {
                        bg: {
                            background: mode ? '#333' : '#ffffff',
                            border: '1px solid ' + (mode ? '#555' : 'grey'),
                            marginBottom: '0.25em',
                            
                            cursor: 'pointer',
                            boxSizing: 'border-box',
                            transition: '0.15s ease background',
                            
                            '&:hover': {
                                background: mode ? '#404040' : '#efefef',
                            }
                        },
                        
                        text: {
                            color: mode ? '#eee' : '#000',
                        },
                        
                        tag: {
                            backgroundColor: 'rgb(0 0 0 / 10%)',
                            padding: '0 0.25em',
                            borderRadius: '0.25em',
                            marginRight: '0.5em',
                        },
                        
                        rating: {
                            '.MuiRating-iconEmpty': {
                                color: mode ? 'rgb(200 200 200 / 30%)' : 'rgb(0 0 0 / 30%)',
                            },
                        },
                        
                        tagDot: {
                            fill: 'rgb(0 0 0 / 30%)',
                        },
                        
                        fixWidth: {
                            // '.MuiGrid-root': {
                            flexFlow: 'nowrap',
                            minWidth: 0,
                            // },
                        },
                        
                        fixTextLen: {
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            width: '100%',
                            fontSize: { xs: 20, md: 32},
                        },
                        
                        ageLimit: {
                            background: mode ? grey[900] : grey[300],
                            padding: '0 0.25em',
                            borderRadius: '0.25em',
                        },
                    },
                    
                    MovieCatalog: {
                        bg: {
                            background: mode ? '#333' : '#ffffff',
                            minWidth: '100%',
                            overflow: 'hidden',
                        },
                        
                        text: {
                            color: 'black !important',
                        },
                        
                        '.MuiPaginationItem-root': {
                            color: mode ? '#eee' : 'black',
                        },
                        
                        '.MuiPaginationItem-root:hover': {
                            backgroundColor: 'rgb(30 30 30 / 10%)',
                        },
                        
                        '.Mui-selected': {
                            backgroundColor: 'rgb(30 30 30 / 20%) !important',
                        },
                    },
                    
                    Comment: {
                        bg: {
                            borderRadius: '0.25em',
                            marginBottom: '1em',
                        },
                        
                        header: {
                            background: mode ? '#353535' : '#eee',
                            padding: '0.5em 1em',
                            color: 'text.primary',
                        },
                        
                        like: {
                            border: '0.125em solid ' + (mode ? '#006600' : 'green'),

                        },
                        
                        unlike: {
                            border: '0.125em solid ' + (mode ? '#660000' : 'red'),

                        },
                        
                        text: {
                            padding: '1em',
                        },
                        
                        footer: {
                            background: mode ? '#353535' : '#eee',
                            padding: '0.5em 1em',
                            color: 'text.primary',
                        },
                        
                        buttons: {
                            edit: {
                                background: 'Orange',
                                color: 'black',
                                
                                '&:hover': {
                                    background: 'Orange',
                                },
                            },
                            
                            delete: {
                                background: 'Crimson',
                                color: 'white',
                                
                                '&:hover': {
                                    background: 'Crimson',
                                },
                            },
                        },
                    },
                    
                    // Rating: {
                    //     bg: {
                            
                    //     },
                    // },
                },
            },
            
            background: {
                paper: prefersDarkMode ? '#121212' : '#fff',
            },
        },
    };
}