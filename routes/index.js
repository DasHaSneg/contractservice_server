const {isError, SERVER_ERROR} = require('../helpers/error')
const router = require('express').Router()
const passport = require('passport')

const handleError = (res, error) => {
    res.status(error.status || SERVER_ERROR).json({
        ok: false,
        result: {
            error:error.message,
        },
    })
}

function addRouter({routes, route}) {
    const router = require('express').Router();

    for (const key in routes) {
        const { method, route: subRoute, fn, auth, middlewares = [] } = routes[key];
        const isAuth = auth !== undefined;
        
        console.log(`${method} ${route}${subRoute}`);

        if (isAuth) {
            middlewares.unshift(passport.authenticate('jwt', { session: false }));
        }
        
        router[method](subRoute, ...middlewares, async (req, res, next) => {
            try {
                const result = await fn({ body: req.body, user: req.user, params: req.params, query: req.query, token: req.token, files: req.files });
                
                if (isError(result)) {
					handleError(res, result);
				} else {
					res.json({
						ok: true,
						result: result === undefined ? null : result,
					});
				}
            } catch (error) {
                console.error(`${method} ${route}${subRoute} error: `, error);
				if (isError(error)) return handleError(res, error);
                return res.status(SERVER_ERROR).json({
					ok: false,
					result: {
						error: 'Unknown error',
					},
				});
            }
        });
    }

    return { router, route }
}

router.get('/', (req, res) => {
	res.json(true)
})

const routes = [
    require('./auth'),
    require('./profile'),
    require('./contract')
];

routes.map(addRouter).forEach(({ router: subRouter, route }) => router.use(route, subRouter));

module.exports = router;

