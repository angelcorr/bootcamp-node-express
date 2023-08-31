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
    try {
      const user = await services.userService.getOne(email);
      const comparedHash = await bcrypt.compare(password, user.hashPassword);

      if (email === user.email && comparedHash) {
        done(null, { email, sub: user.id });
      } else {
        done(new UnauthorizedError('The email or password are incorrect'));
      }
    } catch (error) {
      done(new UnauthorizedError('The email or password are incorrect'));
    }
  },
);

const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: constants.JWT_SECRET,
};
const jwtStrategy = new JwtStrategy(jwtStrategyOptions, async (jwtPayload, done) => {
  const user = await services.userService.getOne(jwtPayload.email);

  if (!user) {
    done(new UnauthorizedError('Invalid token'));
  } else {
    done(null, user);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

export default passport;
