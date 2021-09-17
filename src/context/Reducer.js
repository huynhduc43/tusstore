export const cartReduccer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const index = state.cart.findIndex(product => product._id === action.payload._id)
            if (index !== -1) {
                return {
                    ...state,
                    cart: state.cart.map((product) => {
                        if (product._id === action.payload._id) {
                            return { ...product, qty: product.qty + 1 }
                        } else return product;
                    })
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, qty: 1 }],
                }
            }

        case "ADD_TO_CART_WITH_QTY":
            const index2 = state.cart.findIndex(product => product._id === action.payload.product._id)
            if (index2 !== -1) {
                return {
                    ...state,
                    cart: state.cart.map((product) => {
                        if (product._id === action.payload.product._id) {
                            return { ...product, qty: product.qty + action.payload.quantity}
                        } else return product;
                    })
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload.product, qty: action.payload.quantity}],
                }
            }

        case "INCREASE_QTY":
            return {
                ...state,
                cart: state.cart.map((product) => {
                    if (product._id === action.payload._id) {
                        return { ...product, qty: product.qty + 1 }
                    } else return product;
                })
            }

        case "DECREASE_QTY":
            return {
                ...state,
                cart: state.cart.map((product) => {
                    if (product._id === action.payload._id && product.qty > 1) {
                        return { ...product, qty: product.qty - 1 }
                    } else return product;
                })
            }

        case "REMOVE_PRODUCT":
            const i = state.cart.findIndex(product => product._id === action.payload._id);
            state.cart.splice(i, 1);
            return {
                ...state,
                cart: state.cart,
            }

        case "SYNC_CART":
            let currentCart = [...state.cart];
            
            action.payload.userCart.forEach(element => {   
                const index3 = state.cart.findIndex(product => product._id === element._id);

                if (index3 !== -1) {
                    currentCart[index3].qty += element.qty;
                } else {
                    currentCart = [...currentCart, element];
                }
            });

            return {
                ...state,
                cart: [...currentCart],
            }

        case "DELETE_CART":
            return {
                ...state,
                cart: [],
            }

        default:
            return state;
    }
}