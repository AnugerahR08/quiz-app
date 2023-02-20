import React, { useState } from "react";
import { Card, CardContent, Typography } from '@mui/material';
import { Button, TextField } from "@mui/material";
import { Box } from '@mui/system';
import Center from './Center';
import Swal from 'sweetalert2'

const Login = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !name){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        } else {
            localStorage.setItem("email", email);
            localStorage.setItem("name", name);
            window.location.href = "/quiz";
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
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Email"
                                type="email"
                                variant='outlined'
                                value={email}
                                onChange={handleEmail}
                            />
                            <TextField
                                label="Name"
                                type="text"
                                variant='outlined'
                                value={name}
                                onChange={handleName}
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



