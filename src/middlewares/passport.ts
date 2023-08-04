import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { services } from '../services';
import NotFoundError from '../customErrors/notFoundError';

const LocalStrategy = passportLocal.Strategy;
const localStrategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email: string, password: string, done) => {
    const user = services.userService.getUser(email);

    if (!user) {
      done(new NotFoundError('User not found'));
    } else {
      const comparedHash = await bcrypt.compare(password, user.hashPassword);

      if (email === user.email && comparedHash) {
        done(null, { email, sub: user.id });
      } else {
        done(new Error('Invalid login'));
      }
    }
  },
);

passport.use(localStrategy);

export default passport;
