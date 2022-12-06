import $ from 'jquery';
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import reactWrap from '../utils/react_children_wrap';
import { IconButton, Box, Paper, Stack } from '@mui/material';

class Hamburger extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            opened: false,
            render: false,
        }

        this.mTheme = {
            typography: {
                fontSize: 96,
            },

            shape: {
                borderRadius: 12,
            },
        };

        this.menuBox = React.createRef();
        this.menuBoxBg = React.createRef();
    }

    componentDidUpdate(){
        if (this.menuBox.current){
            this.menuBox.current.ontransitionend = (e) => {
                if (e.propertyName === 'transform'){
                    this.setState((state) => {
                        return { render: state.opened };
                    })
                }
            };
            
            if (this.state.opened){ // MenuOpen
                $(this.menuBox.current).delay(0).qcss({ transform: 'translateX(-0%)' });
                $(this.menuBoxBg.current).delay(0).qcss({ opacity: 1 });
            }
        }
    }

    MenuOpen = () => {
        this.setState(() => {
            return { opened: true, render: true };
        });
    }

    MenuClose = () => {
        this.setState(() => {
            $(this.menuBox.current).css('transform', 'translateX(-100%)');
            $(this.menuBoxBg.current).css({ opacity: 0 });

            return { opened: false, render: true };
        });
    }

    render(){
        return <>
            <IconButton edge='start' sx={(theme) => theme.palette.pages.main.Hamburger.icon} onClick={this.MenuOpen}>
                <MenuIcon />
            </IconButton>

            {
                this.state.render &&
                <>
                    <Box ref={this.menuBoxBg} sx={(theme) =>  theme.palette.pages.main.Hamburger.shading} onClick={this.MenuClose} />
                    <Paper ref={this.menuBox} sx={(theme) =>  theme.palette.pages.main.Hamburger.menu}>
                        <Stack>
                            <Paper elevation={1} sx={(theme) =>  theme.palette.pages.main.Hamburger.header}>
                                {React.cloneElement(this.props.title, { sx: (theme) =>  theme.palette.pages.main.Hamburger.title })}
                            </Paper>
                            <Box sx={{ mt: 2 }} />
                            {reactWrap(this.props.children, (e, i) => {
                                return React.cloneElement(e, { onClick: this.MenuClose, sx: (theme) =>  theme.palette.pages.main.Hamburger.buttons, variant: 'normal', key: i });
                            })}
                        </Stack>
                    </Paper>
                </>
            }
        </>;
    }
}

export default Hamburger;