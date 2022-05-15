const jwt = require('jsonwebtoken');
const {TOKEN_SECRET, TOKEN_LIFESPAN} = require('../config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const Password = require('./password');
const {connection} = require('../db');

const signUser = user => ({user, token: jwt.sign(user, TOKEN_SECRET)});

const allowedFields = ['id', 'email', 'profile_id', 'date_updated'];

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            const user = await connection('user')
                .select([...allowedFields, 'password'])
                .where({ email })
                .first()
            
            if (!user) {
                return done(null, false);
            } 
            
            const authorized = await Password.check(password, user.password);
            if (!authorized) {
                return done(null, false);
            }

            delete user.password;
            done(null, user);
        }   
    )
);

const extractToken = ExtractJwt.fromAuthHeaderAsBearerToken();

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: extractToken,
            secretOrKey: TOKEN_SECRET,
            passReqToCallback: true,
        },
        async (req, user, done) => {
            req.token = extractToken(req);
            if (!user) {
                done(null, null);
            } else {
                done(null, user);
            }
        }
    )
)

module.exports = {
    signUser,
    allowedFields,
    extractToken
}