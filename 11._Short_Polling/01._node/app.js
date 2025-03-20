import express from "express";

const app = express();

app.use(express.static("public"));

const randomNumbers = [1, 4, 53, 2]

app.get("/randomnumbers", (req, res) => {

    res.send({ data: randomNumbers });
});

app.get("/simulatenewnumbers", (req, res) => {

    const newNumber = getRandomInt(1, 100);
    randomNumbers.push(newNumber);
    res.send({ data: newNumber });
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)

}
const PORT = 8080;

app.listen(PORT, () => console.log("Server running on port: ", PORT));

