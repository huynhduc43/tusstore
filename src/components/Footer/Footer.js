import React from "react";

import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";

export default function Footer() {
  return (
    <AppBar position='static' color="primary" style={{
      marginTop: 50,
    }}>
      <Container>
        <Toolbar>
          <Typography variant="body1" color="inherit">
            © {new Date().getFullYear()} TusStore
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}