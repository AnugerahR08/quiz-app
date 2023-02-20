import React, { useState, useEffect } from "react";
import Center from './Center';
import { Button, Card, CardContent, Typography, Alert, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import axios from "axios";
import Swal from 'sweetalert2'

const Quiz = () => {
    const name = localStorage.getItem("name");
    const [quizData, setQuizData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        axios.get(
            "https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean"
        )
            .then(response => {
                setQuizData(response.data.results);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const handleAnswer = (answer) => {
        const correctAnswer = quizData[currentIndex].correct_answer;
        if (answer === correctAnswer) {
            setScore(score + 1);
        }
        setCurrentIndex(currentIndex + 1);
    };

    const restartQuiz = () => {
        window.location.reload();
        setOpen(true);
        // setTimeLeft(300);
    };

    const tick = () => {
        if (timeLeft === 0) {
            setCurrentIndex(currentIndex + quizData.length);
        } else {
            setTimeLeft(timeLeft - 1);
        }
    };

    const logOut = () => {
        Swal.fire({
            title: 'Are you sure you want to logout?',
            text: 'You will be logged out of this account',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/';
            }
        })
    };

    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    useEffect(() => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                color: 'white',
                background: '#000000',
                title: 'Welcome ' + name + ', Have a great time doing it!',
                showConfirmButton: false,
                timer: 2000
            })
    }, []);

    return (
        <Center>
            {/* <Collapse in={open}>
                <Alert action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}>
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}>
                    Welcome {name}, Selamat Mengerjakan!
                </Alert>
            </Collapse> */}
            <Card sx={{ width: '400px', mt: 2 }}>
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
                        <div>
                            {quizData.length > 0 ? (
                                <div>
                                    {currentIndex >= quizData.length ? (
                                        <div>
                                            <h1>Score: {score * 10}, From: {quizData.length}</h1>
                                            <h1>Correct: {score}, Wrong: {quizData.length - score}</h1>
                                            <Button
                                                type='submit'
                                                variant='contained'
                                                size='large'
                                                sx={{ width: '90%', m: 1 }}
                                                onClick={restartQuiz}>
                                                Play Again
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <h1>Category: {quizData[currentIndex].category}</h1>
                                            <h2>Question:</h2>
                                            <h2 dangerouslySetInnerHTML={{ __html: quizData[currentIndex].question }} />
                                            <Button
                                                type='submit'
                                                variant='contained'
                                                size='large'
                                                sx={{ width: '90%', m: 1 }}
                                                onClick={() => handleAnswer("True")}>
                                                True
                                            </Button>
                                            <Button
                                                type='submit'
                                                variant='contained'
                                                size='large'
                                                sx={{ width: '90%', m: 1 }}
                                                onClick={() => handleAnswer("False")}>
                                                False
                                            </Button>
                                            <p>Time left: {timeLeft} seconds</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <h1>Loading...</h1>
                            )}
                        </div>
                    </Box>
                </CardContent>
            </Card>
            <Button
                variant="outlined"
                color="error"
                size='large'
                sx={{ width: '400px', mt: 1, mb: 2}}
                onClick={logOut}>
                Logout
            </Button>
        </Center>
    );
}

export default Quiz;