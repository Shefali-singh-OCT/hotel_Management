import passport from "passport";
import LocalStrategy from "passport-local";
import person from "./Models/personModel.js";

passport.use(
  new LocalStrategy(async (username, password, next) => {
    try {
      const user = await person.findOne({ username });
      if (!user) return next(null, false, { message: "Incorrect username" });

      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return next(null, user);
      } else {
        return next(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return next(error);
    }
  })
);

export default passport;
