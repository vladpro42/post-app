import { add, multiply, multiplyAsync } from "./fun.js";
import assert from "assert";


import supertest from "supertest";

import app from "../index.js"
import { request } from "express";

it('should return Hello test', (done) => {
    supertest(app).get('/').expect('Hello world!').end(done)
})


const exprect = [
    {
        "id": 3,
        "title": "This is my third arcticle",
        "text": "some text....",
        "tags": [],
        "avatar_url": "",
        "user_id": 12
    },
    {
        "id": 4,
        "title": "This is my third arcticle",
        "text": "some text....",
        "tags": [],
        "avatar_url": "",
        "user_id": 12
    },
    {
        "id": 1,
        "title": "Это моя первая статья",
        "text": "Это мой текст",
        "tags": null,
        "avatar_url": null,
        "user_id": 12
    },
    {
        "id": 2,
        "title": "Это моя первая статья",
        "text": "Это мой текст",
        "tags": null,
        "avatar_url": null,
        "user_id": 12
    },
    {
        "id": 5,
        "title": "Это моя первая статья",
        "text": "Это мой текст",
        "tags": [],
        "avatar_url": null,
        "user_id": 13
    }
]

describe('GET /posts', () => {
    it('should return posts', (done) => {
        supertest(app).get('/posts').expect(exprect).end(done)
    })
})
