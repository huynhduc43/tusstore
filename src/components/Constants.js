export default Object.freeze({
  GREEN: "#4fbfa8",
  GRAY: "#f0f0f0",
  BUTTON_CONTAINED: {
    color: "#fff",
    backgroundColor: "#4fbfa8",
    '&:hover': {
      backgroundColor: "#03A685",
      color: "#fff"
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
  },
  PREV_ICON_IMG: 'https://res.cloudinary.com/dnbjep0mp/image/upload/v1629734722/icons/left-arrow_b66ti6.svg',
  NEXT_ICON_IMG: 'https://res.cloudinary.com/dnbjep0mp/image/upload/v1629734913/icons/right-arrow_n2esp6.svg',
});