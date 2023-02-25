"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const port = 3000;
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
const db = {
    courses: [{ id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'automation qa' },
        { id: 4, title: 'devops' }]
};
exports.app.get('/', (req, res) => {
    res.send({ message: 'IT-INCUBATOR.RU' });
});
exports.app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) { // чтобы фильтрация при пустом title вернула весь массив кусов устанавливаем логическую функцию.
        foundCourses = foundCourses // выносим фильтрацию в отдельную переменную.
            .filter(c => c.title.indexOf(req.query.title) > -1); // фильтры всегда гибкие, поэтому используем query-параметры для фильтрации "?", "&"
    } // при этом учитываем "частичное вхождение"
    res.json(foundCourses);
});
exports.app.get('/courses/:id', (req, res) => {
    const foundCourses = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourses) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    else {
        res.json(foundCourses);
    }
});
exports.app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const createCourses = {
        id: +(new Date()),
        title: req.body.title
    };
    db.courses.push(createCourses);
    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(createCourses);
});
exports.app.delete('/courses/:id', (req, res) => {
    const foundCourses = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourses) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    db.courses = db.courses.filter(c => c.id !== +req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const foundCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    else {
        foundCourse.title = req.body.title;
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
});
exports.app.delete('/__test__/data', (req, res) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
