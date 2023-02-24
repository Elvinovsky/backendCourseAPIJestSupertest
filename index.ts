import express from 'express'
const app = express()
const port = 3000

const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

const db = {
    courses: [
        {id: 1, title: "front-end"},
        {id: 2, title: "back-end"},
        {id: 3, title: "automation qa"},
        {id: 4, title: "devops"}
    ]
}
app.get('/', (req, res) => {
    res.json('IT-INCUBATOR')
})

app.get('/courses', (req, res) => {
   let foundCourses = db.courses
    if (req.query.title) {
        foundCourses = foundCourses
            .filter(c =>c.title.indexOf(req.query.title as string) > -1)
    }
    res.json(foundCourses)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})