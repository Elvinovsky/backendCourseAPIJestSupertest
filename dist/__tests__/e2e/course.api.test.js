"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../../src");
describe('/course', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).delete('/__test__/data');
    }));
    it('should return 200 and empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses')
            .expect(200, []);
    }));
    it('should return 404 for not existing course', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses/1')
            .expect(404);
    }));
    it(`should'nt create course with incorrect input data`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post('/courses')
            .send({ title: '' })
            .expect(400);
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses')
            .expect(200, []);
    }));
    let createdCourse1 = null;
    it(`should create course with correct input data`, () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(src_1.app)
            .post('/courses')
            .send({ title: 'it-incubator courses' })
            .expect(201);
        createdCourse1 = createResponse.body;
        expect(createdCourse1).toEqual({
            id: expect.any(Number),
            title: 'it-incubator courses'
        });
    }));
    let createdCourse2 = null;
    it(`create one more course`, () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(src_1.app)
            .post('/courses')
            .send({ title: 'it-incubator courses 2' })
            .expect(201);
        createdCourse2 = createResponse.body;
        expect(createdCourse2).toEqual({
            id: expect.any(Number),
            title: 'it-incubator courses 2'
        });
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses')
            .expect(200, [createdCourse1, createdCourse2]);
    }));
    it(`should'nt update course with incorrect input data`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/courses/' + createdCourse1.id)
            .send({ title: '' })
            .expect(400);
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses/' + createdCourse1.id)
            .expect(200, createdCourse1);
    }));
    it(`should'nt update course that exist`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/courses/' + -123)
            .send({ title: 'good title' })
            .expect(404);
    }));
    it(`should update course with correct input data`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/courses/' + createdCourse1.id)
            .send({ title: 'good new title' })
            .expect(204);
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses/' + createdCourse1.id)
            .expect(200, Object.assign(Object.assign({}, createdCourse1), { title: 'good new title' }));
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses/' + createdCourse2.id)
            .expect(200, createdCourse2);
    }));
    it('should return 404 for not existing course', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .delete('/courses/1')
            .expect(404);
    }));
    it(`should delete course both courses`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .delete('/courses/' + createdCourse1.id)
            .expect(204);
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses/' + createdCourse1.id)
            .expect(404);
        yield (0, supertest_1.default)(src_1.app)
            .delete('/courses/' + createdCourse2.id)
            .expect(204);
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses/')
            .expect(200, []);
    }));
});
