import { useState } from "react";
import Router from "next/router";
import { Button, TextField } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../utils/auth/initFirebase";

initFirebase();

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = (e) => {
        e.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                Router.replace("/");
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <div>
            <p>Sign in</p>
            <form onSubmit={handleSignIn}>
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    Sign In
                </Button>
            </form>
        </div>
    );
};

export default Auth;
