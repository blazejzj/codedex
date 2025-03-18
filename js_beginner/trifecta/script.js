const captions = [
    "Some doors only open from the inside. Breath is a way of accessing that door.",
    "What has to be taught first, is the breath.",
    "Remember the blue sky. It may at times be obscured by clouds, but it is always there.",
    "In the midst of movement and chaos, keep stillness inside of you.",
    "We can't control the sea, but we can learn how to surf the waves.",
    "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
    "To understand the immeasurable, the mind must be extraordinarily quiet, still.",
];

const memeArray = [
    "https://i.imgur.com/bSi4xLb.png",
    "https://i.imgur.com/6y0G7N0.png",
    "https://i.imgur.com/LXnRao1.png",
    "https://i.imgur.com/Qqoxh1N.png",
];

let randomMeme = document.getElementById("random-meme");
let randomCaption = document.getElementById("random-caption");
let button = document.getElementById("generator-button");

button.addEventListener("click", () => {
    let randomIndex1 = Math.floor(Math.random() * captions.length);
    let randomIndex2 = Math.floor(Math.random() * memeArray.length);

    randomCaption.textContent = captions[randomIndex1];
    randomMeme.src = memeArray[randomIndex2];
});
