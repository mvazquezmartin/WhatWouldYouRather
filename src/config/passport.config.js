const passport = require("passport");
const jwt = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserDao = require("../dao/user.dao");
const cookieExtractor = require("../utils/cookieExtractor.util");
const { PRIVATEKEY } = require("../utils/jwt.util");
require("dotenv").config();

const JWTStrategy = jwt.Strategy;
const Users = new UserDao();

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATEKEY,
      },
      async (jwt_payload, done) => {
        try {
          done(null, jwt_payload);
        } catch (eerror) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3030/auth/googlecallback",
      },
      async (accesToken, refreshToken, profile, done) => {
        console.log(profile._json);
        try {
          const user = await Users.findUser(profile._json.email);
          if (!user) {
            const userInfo = {
              nick_name: profile._json.name,
              email: profile._json.email,
            };
            const newUser = await Users.createUser(userInfo);
            return done(null, newUser);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await Users.findUserById(id);
    done(null, user);
  });
};

module.exports = initializePassport;

// passport.use(
//   "register",
//   new LocalStrategy(
//     { passReqToCallback: true, usernameField: "email" },
//     async (req, username, password, done) => {
//       try {
//         const { nick_name, email, password } = req.body;
//         const user = await Users.findUser(username);
//         if (user) {
//           console.log("User already exists");
//           return done(null, false);
//         }
//         const newUserInfo = {
//           nick_name,
//           email,
//           password: createHash(password),
//         };
//         const newUser = await Users.createUser(newUserInfo);
//         done(null, newUser);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

// passport.use(
//   "login",
//   new LocalStrategy(
//     { usernameField: "email" },
//     async (username, password, done) => {
//       try {
//         const user = await Users.findUser(username);
//         if (!user) {
//           console.log("User doens't exist");
//           return done(null, false);
//         }
//         if (!pwValidate(password, user)) return done(null, false);
//         done(null, user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );
