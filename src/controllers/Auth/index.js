const User = require("../../models/user/index");

const {
  PHONE_NOT_FOUND_ERR,

  PHONE_ALREADY_EXISTS_ERR,
  USER_NOT_FOUND_ERR,
  INCORRECT_OTP_ERR,
  ACCESS_DENIED_ERR,
} = require("../../errors");

// const { checkPassword, hashPassword } = require("../utils/password.util");
const { createJwtToken } = require("../../utils/token");

const { generateOTP, fast2sms } = require("../../utils/otp");

// --------------------- create new user ---------------------------------

exports.registerUser = async (req, res, next) => {
  try {
    const { mobile, password, name } = req.body;

    // check duplicate mobile Number
    const phoneExist = await User.findOne({ mobile });

    if (phoneExist) {
      next({ status: 400, message: PHONE_ALREADY_EXISTS_ERR });
      return;
    }

    // create new user
    const createUser = new User({
      mobile,
      name,
      password,
      //   role: mobile === process.env.ADMIN_PHONE ? "ADMIN" : "USER",
      role: "CONSUMER",
    });

    // save user

    const user = await createUser.save();

    res.status(200).json({
      type: "success",
      message: "Account created OTP sended to mobile number",
      data: {
        userId: user._id,
      },
    });

    // generate otp
    const otp = generateOTP(6);
    // save otp to user collection
    user.phoneOtp = otp;
    await user.save();
    // send otp to mobile number
    await fast2sms(
      {
        message: `Your OTP is ${otp}`,
        contactNumber: user.mobile,
      },
      next
    );
  } catch (error) {
    next(error);
  }
};

// ------------ login with mobile otp ----------------------------------
exports.loginUser = async (req, res, next) => {
  try {
    const { mobile, password } = req.body;
    const user = await User.findOne({ mobile });

    if (!user) {
      next({ status: 400, message: PHONE_NOT_FOUND_ERR });
      return;
    }
    if (user.password !== password) {
      next({ status: 400, message: "Invalid credentials" });
      return;
    }
    if (user.password === password) {
      const token = createJwtToken({ userId: user._id });
      res.status(201).json({
        type: "success",
        message: "Logged in",
        data: {
          token,
          user,
        }
      });
    }

    // generate otp
  } catch (error) {
    next(error);
  }
};
// ---------------------- verify mobile otp -------------------------
exports.verifyOtp = async (req, res, next) => {
  try {
    const { otp, userId, mobile } = req.body;
    const user = await User.findOne({
      mobile: mobile,
    });

    if (!user) {
      next({ status: 400, message: USER_NOT_FOUND_ERR });
      return;
    }

    if (user.phoneOtp !== otp) {
      next({ status: 400, message: INCORRECT_OTP_ERR });
      return;
    }
    const token = createJwtToken({ userId: user._id });

    user.phoneOtp = "";
    await user.save();

    res.status(201).json({
      type: "success",
      message: "OTP verified successfully",
      data: {
        token,
        userId: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

// --------------- fetch current user -------------------------

exports.fetchCurrentUser = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;

    return res.status(200).json({
      type: "success",
      message: "fetch current user",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

// --------------- admin access only -------------------------

// exports.handleAdmin = async (req, res, next) => {
//   try {
//     const currentUser = res.locals.user;

//     return res.status(200).json({
//       type: "success",
//       message: "Okay you are admin!!",
//       data: {
//         user: currentUser,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
