const express = require('express')
const ExpressError = require("./expressError")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/mean', (req, res, next) => {
    const numsStr = req.query.nums;
    if (!numsStr) {
        try {
            throw new ExpressError(`Numbers are required!`, 400)
        } catch (error) {
            return next(error)
        }
    }
    const numsStrArr = numsStr.split(",")
    const numsArr = numsStrArr.map(item => {
        const number = parseInt(item)
        try {
            if (Number.isNaN(number)) {
                throw new ExpressError(`Oops. ${item} is not a number!`, 403)
            }
        } catch (error) {
            console.log('catching error')
            return next(error)
        }
        return number
    })
    let total = 0
    for (let num of numsArr) {
        total += num;
    }
    const result = total / numsArr.length
    const resultObj = {
        response: {
            operation: "mean",
            value: `${result}`
        }
    }
    return res.json(resultObj)
})
app.get('/median', (req, res, next) => {
    const numsStr = req.query.nums;
    if (!numsStr) {
        try {
            throw new ExpressError(`Numbers are required!`, 400)
        } catch (error) {
            return next(error)
        }
    }
    const numsStrArr = numsStr.split(",");
    const numsArr = numsStrArr.map(item => {
        const number = parseInt(item)
        try {
            if (Number.isNaN(number)) {
                throw new ExpressError(`Oops. ${item} is not a number!`, 403)
            }
        } catch (error) {
            console.log('catching error')
            return next(error)
        }
        return number
    });
    let median;
    if (numsArr.length % 2 === 0) {
        const larger = Math.floor(numsArr.length / 2)
        const smaller = Math.floor(numsArr.length / 2) - 1
        median = (numsArr[larger] + numsArr[smaller]) / 2
    } else {
        const halfIndex = Math.floor(numsArr.length / 2)
        median = numsArr[halfIndex]
    }

    const resultObj = {
        response: {
            operation: "median",
            value: `${median}`
        }
    }
    return res.json(resultObj)

})
app.get('/mode', (req, res, next) => {
    const numsStr = req.query.nums;
    if (!numsStr) {
        try {
            throw new ExpressError(`Numbers are required!`, 400)
        } catch (error) {
            return next(error)
        }
    }
    const numsStrArr = numsStr.split(",")
    let counter = {}
    for (let num of numsStrArr) {
        if (counter[num]) {
            counter[num] += parseInt(counter[num])
        } else {
            counter[num] = 1
        }
    }

    const keys = Object.keys(counter);
    let numKeys = [];
    //before we move on to find the most common number, lets make sure they are all number
    for (let key of keys) {
        const numKey = parseInt(key)
        try {
            if (Number.isNaN(numKey)) {
                throw new ExpressError(`Oops. ${counter[numKey]} is not a number!`, 403)
            }
        } catch (error) {
            console.log('catching error')
            return next(error)
        }
        numKeys.push(key)
    }

    let most = counter[keys[0]];
    keys.forEach((key) => {
        const number = parseInt(counter[key])
        if (number > most) {
            most = number
        }
    })
    let mode;
    keys.forEach((key) => {
        if (counter[key] === most) {
            mode = key
        } return
    })

    const resultObj = {
        response: {
            operation: "mode",
            value: `${mode}`
        }
    }
    return res.json(resultObj)
})

app.use(function (err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;
    return res.status(status).json({
        error: { message, status }
    });
})

















app.listen(3000, () => {
    console.log('App on port 3000')
})

