import React from "react";

//Material UI
import CssBaseline from '@material-ui/core/CssBaseline';

//My components

export default function Homepage() {
    return (
        <React.Fragment>
            <CssBaseline />
            <h1
                style={{
                    textAlign: "center",
                }}
            >
                Homepage
            </h1>
        </React.Fragment>
    );
}