import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Center from './Center';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        if (username === "admin" && password === "123") {
            window.location.href = "/quiz";
        } else {
            alert("Username atau password salah");
        }
    };

    return (
        <Center>
            <Card sx={{ width: '400px' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant='h3' sx={{ my: 3 }}>
                        Quiz App
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form onSubmit={handleLogin}>
                            <TextField
                                label="Username"
                                variant='outlined'
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                variant='outlined'
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <Button 
                                type="submit" 
                                variant="contained"
                                size='large'
                                sx={{ width: '90%', m: 1 }}>
                                Login
                            </Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    );
};

export default Login;


