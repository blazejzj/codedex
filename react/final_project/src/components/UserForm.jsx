import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function UserForm({ onReset }) {
    // Accept onReset as a prop
    const [inputName, setInputName] = useState("");
    const { setName } = useContext(UserContext);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setName(inputName);
        onReset(); // Call reset function before navigating
        navigate("/quiz");
    }

    function handleNameChange(e) {
        setInputName(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="userName">
                <input
                    type="text"
                    id="userName"
                    value={inputName}
                    onChange={handleNameChange}
                />
                Name:
            </label>
            <button type="submit">Submit name</button>
        </form>
    );
}
