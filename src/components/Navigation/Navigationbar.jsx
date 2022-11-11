import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/lets-shop.jpg';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';



const Navigationbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={ logo } alt="Shopping.js" height="24px" className={classes.image} />
                        Let's SHOP
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary"></Badge>
                                <ShoppingCart />
                        </IconButton>
                    </div>
                    )}
                </Toolbar>
            </AppBar>  
        </>
    )
}

export default Navigationbar;
