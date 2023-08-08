import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import bcrypt from 'bcrypt';
import { services } from '../services';
import UnauthorizedError from '../customErrors/unauthorizedError';
import constants from '../constants';

const localStrategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email: string, password: string, done) => {
    const user = services.userService.get(email);

    if (!user) {
      done(new UnauthorizedError('The email or password are incorrect'));
    } else {
      const comparedHash = await bcrypt.compare(password, user.hashPassword);

      if (email === user.email && comparedHash) {
        done(null, { email, sub: user.id });
      } else {
        done(new UnauthorizedError('The email or password are incorrect'));
      }
    }
  },
);

const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: constants.JWT_SECRET,
};
const jwtStrategy = new JwtStrategy(jwtStrategyOptions, (jwtPayload, done) => {
  const user = services.userService.get(jwtPayload.email);
  if (!user) {
    done(new UnauthorizedError('The email or password are incorrect'));
  } else {
    done(null, user);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

export default passport;
