import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './cartItem/CartItem';
import { Link } from 'react-router-dom';


const Cart = ({ cart, updateCartQuantity, removeFromCart, manageEmptyCart }) => {
    const classes = useStyles();

    const CartEmpty = () => (
        <Typography variant="subtitle1">No items yet, 
            <Link to="/" className={classes.link}> start adding some</Link>!
        </Typography>
    );

    if (!cart.line_items) return 'Loading';

    const CartFilled = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQuantity={updateCartQuantity} onRemoveFromCart={removeFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cartDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={manageEmptyCart}>
                        Empty Cart
                    </Button>
                    <Button component={Link} to="/placeorder" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">
                        Place Order
                    </Button>
                </div>
            </div>
        </>
    );

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>My Cart</Typography>
            { !cart.line_items.length ? <CartEmpty /> : <CartFilled />}
        </Container>
    );
};
export default Cart;