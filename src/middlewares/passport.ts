import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { services } from '../services';
import UnauthorizedError from '../customErrors/unauthorizedError';

const LocalStrategy = passportLocal.Strategy;
const localStrategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email: string, password: string, done) => {
    const user = services.userService.getUser(email);

    if (!user) {
      done(new UnauthorizedError('The email or password are incorrect'));
    } else {
      const comparedHash = await bcrypt.compare(password, user.hashPassword);

      if (email === user.email && comparedHash) {
        done(null, { email, sub: user.id });
      } else {
        done(new Error('The email or password are incorrect'));
      }
    }
  },
);

passport.use(localStrategy);

export default passport;
