const postsRouter = require('./posts');
const categoriesRouter = require('./categories');
const tagsRouter = require('./tags');

const routes = [
    {
        path: "/posts",
        router: postsRouter
    },
    {
        path: "/categories",
        router: categoriesRouter
    },
    {
        path: "/tags",
        router: tagsRouter
    },
]

module.exports = routes;
