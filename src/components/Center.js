import React from "react";
import { Grid } from '@mui/material';
import reactWrap from '../utils/react_children_wrap';

export default class extends React.Component{
    render(){
        return <>
            <Grid
                container
                justifyContent={'center'}
                position={ this.props.absolute ? 'absolute' : 'none' }
                sx={{ height: '100%', overflowX: this.props.scroll ? 'auto' : undefined }}
            >
                <Grid container item direction={'column'}
                    xs={this.props.xs ?? 11}
                    sm={this.props.sm ?? 11.5}
                    md={this.props.md ?? 8}
                    lg={this.props.lg ?? 6}
                    xl={this.props.xl ?? 5}
                    flexWrap={ this.props.nowrap ? 'nowrap' : undefined }>
                        {reactWrap(this.props.children, (e, i) => { return React.cloneElement(e, { key: i }); })}
                </Grid>
            </Grid>
        </>;
    }
}