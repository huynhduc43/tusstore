export default Object.freeze({
    GREEN: "#4fbfa8",
    GRAY: "#f0f0f0",
    BUTTON_CONTAINED: {
        color: "#fff",
        backgroundColor: "#4fbfa8",
        '&:hover': {
            backgroundColor: "#03A685",
        },
        '&:active': {
            backgroundColor: "#01755D",
        }
    },
    BUTTON_OUTLINED: {
        color: "#4fbfa8",
        '&:hover': {
            color: "#fff",
            backgroundColor: "#4fbfa8",
        },
        '&:active': {
            backgroundColor: "#01755D",
        }
    },
    RADIO_GROUP: {
        '& .MuiRadio-colorSecondary.Mui-checked': {
            color: "#4fbfa8",
        },
        '& .MuiRadio-colorSecondary:hover': {
            backgroundColor: "#4FBFA811",
        },
    }
});