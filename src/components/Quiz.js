import React, { useState, useEffect } from "react";
import Center from './Center';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from "axios";

function Quiz() {
    const [quizData, setQuizData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);

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
        window.location.reload()
        // setTime(300);
    };

    const tick = () => {
        if (timeLeft === 0) {
            setCurrentIndex(currentIndex + quizData.length);
        } else {
            setTimeLeft(timeLeft - 1);
        }
    };

    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

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
                    </Box>
                    <div>
                        {quizData.length > 0 ? (
                            <div>
                                {currentIndex >= quizData.length ? (
                                    <div>
                                        <h1>Score: {score * 10}, From: {quizData.length}</h1>
                                        <h1>Benar: {score}, Salah: {quizData.length - score}</h1>
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
                                        <h1>{quizData[currentIndex].category}</h1>
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
                </CardContent>
            </Card>
            <Button
                variant="outlined"
                color="error"
                size='large'
                sx={{ width: '400px', mt: 1 }}
                onClick={() => window.location.href = '/'}>
                Logout
            </Button>
        </Center>
    );
}

export default Quiz;
