import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import Header from "./components/Header";
import UserForm from "./components/UserForm";
import Question from "./components/Question";
import Results from "./components/Results";

export default function App() {
    const questions = [
        {
            question: "What's your favorite color?",
            options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
        },
        {
            question: "Pick a vacation spot:",
            options: ["Volcano 🌋", "Ocean 🌊", "Forest 🌲", "Mountain ⛰️"],
        },
        {
            question: "Choose a hobby:",
            options: [
                "Dancing 💃",
                "Swimming 🏊",
                "Gardening 🌻",
                "Reading 📚",
            ],
        },
        {
            question: "What drives you most?",
            options: ["Passion 🔥", "Calm 🌧️", "Stability 🪨", "Freedom 🌬️"],
        },
        {
            question: "Pick a time of day:",
            options: ["Noon ☀️", "Evening 🌆", "Morning 🌄", "Night 🌌"],
        },
    ];

    const keywords = {
        Fire: "fire",
        Water: "water",
        Earth: "earth",
        Air: "air",
    };

    const elements = {
        "Red 🔴": "Fire",
        "Blue 🔵": "Water",
        "Green 🟢": "Earth",
        "Yellow 🟡": "Air",
        "Volcano 🌋": "Fire",
        "Ocean 🌊": "Water",
        "Forest 🌲": "Earth",
        "Mountain ⛰️": "Air",
        "Dancing 💃": "Fire",
        "Swimming 🏊": "Water",
        "Gardening 🌻": "Earth",
        "Reading 📚": "Air",
        "Passion 🔥": "Fire",
        "Calm 🌧️": "Water",
        "Stability 🪨": "Earth",
        "Freedom 🌬️": "Air",
        "Noon ☀️": "Fire",
        "Evening 🌆": "Water",
        "Morning 🌄": "Earth",
        "Night 🌌": "Air",
    };

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [element, setElement] = useState("");
    const [artwork, setArtwork] = useState(null);
    const [isLoadingArtwork, setIsLoadingArtwork] = useState(false);

    function handleAnswer(answer) {
        setAnswers([...answers, answer]);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    function determineElement(answers) {
        const counts = {};
        answers.forEach(function (answer) {
            const element = elements[answer];
            counts[element] = (counts[element] || 0) + 1;
        });
        return Object.keys(counts).reduce(function (a, b) {
            return counts[a] > counts[b] ? a : b;
        });
    }

    async function fetchArtwork() {
        const api = "https://dog.ceo/api/breeds/image/random";
        try {
            const response = await fetch(api);
            if (!response.ok) {
                throw new Error("Couldn't fetch data!");
            }
            const data = await response.json();
            setArtwork(data.message);
        } catch (err) {
            console.log("Something went wrong", err.message);
            setArtwork(null);
        }
    }

    function resetQuiz() {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setElement("");
        setArtwork(null);
        setIsLoadingArtwork(false);
    }

    useEffect(
        function () {
            if (currentQuestionIndex === questions.length) {
                const selectedElement = determineElement(answers);
                setElement(selectedElement);
                setIsLoadingArtwork(true);
                fetchArtwork().then(() => setIsLoadingArtwork(false));
            }
        },
        [currentQuestionIndex, answers]
    );

    return (
        <UserProvider>
            <Header />
            <Routes>
                <Route path="/" element={<UserForm onReset={resetQuiz} />} />
                <Route
                    path="/quiz"
                    element={
                        currentQuestionIndex < questions.length ? (
                            <Question
                                question={
                                    questions[currentQuestionIndex].question
                                }
                                options={
                                    questions[currentQuestionIndex].options
                                }
                                onAnswer={handleAnswer}
                            />
                        ) : (
                            <Results element={element} artwork={artwork} />
                        )
                    }
                />
            </Routes>
        </UserProvider>
    );
}
