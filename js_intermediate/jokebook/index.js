const jokeContainer = document.getElementById("jokeContainer");
const getJokeBtn = document.getElementById("getJokeBtn");

function fetchJoke() {
    fetch("https://official-joke-api.appspot.com/random_joke")
        .then((response) => response.json())
        .then((data) => {
            let joke = data.setup;
            let punchline = data.punchline;

            jokeContainer.innerHTML = `<p>${joke}</p><p>${punchline}</p>`;
        })
        .catch((error) => console.error());
}

getJokeBtn.addEventListener("click", fetchJoke);
