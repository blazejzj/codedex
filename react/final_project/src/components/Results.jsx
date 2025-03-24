import React, { useContext } from "react";
import { UserContext } from "./UserContext.jsx";

export default function Results({ element, artwork }) {
    const { name } = useContext(UserContext);

    return (
        <div>
            <p>
                <strong>{name}</strong>, your element is: {element}
            </p>
            {artwork ? (
                <div className="artwork">
                    <img src={artwork} alt="Element artwork" />
                </div>
            ) : (
                <p>No artwork found.</p>
            )}
        </div>
    );
}
