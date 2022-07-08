const express = require('express')
const app = express();

app.get("/", (req, res) => {
    res.send("HOMEPAGE")
})
app.get('/dogs', (req, res) => {
    console.log(req)
    console.log("you got dogs!")
    res.send("WOOOOF")
})




















app.listen(3000, () => {
    console.log('App on port 3000')
})

