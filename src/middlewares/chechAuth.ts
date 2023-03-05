import User from "../models/user";
import {
  AUTH_TOKEN_MISSING,
  AUTH_HEADER_MISSING,
  INCORRECT_JWT,
  USER_NOT_FOUND,
} from "../errors";
import { verifyJwtToken } from "../utils/token";

const checkAuth = async (req, res, next) => {
  try {
    // check for auth header from client
    const header = req.headers.authorization;

    if (!header) {
      next({ status: 403, message: AUTH_HEADER_MISSING });
      return;
    }

    // verify  auth token
    const token = header.split("Bearer ")[1];

    if (!token) {
      next({ status: 403, message: AUTH_TOKEN_MISSING });
      return;
    }

    const userId = verifyJwtToken(token, next);

    if (!userId) {
      next({ status: 403, message: INCORRECT_JWT });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      next({ status: 404, message: USER_NOT_FOUND });
      return;
    }
    res.locals.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default checkAuth;
