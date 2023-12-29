const { signupHelper, loginHelper } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const MailGen = require("mailgen");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const { findUserHelper } = require("../helpers/userHelper");

const registerNewUser = async (req, res, next) => {
  try {
    const response = await signupHelper(req.body);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ response: error });
  }
};

const login = async (req, res, next) => {
  try {
    const response = await loginHelper(req.body);
    const { foundUser, accessToken } = response;

    res.cookie("jwt", foundUser.refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { _id, username, email, phone, isBlocked, role } = foundUser;

    const data = {
      user_id: _id,
      username,
      email,
      phone,
      isBlocked,
      role,
      accessToken,
    };

    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error });
  }
};

const handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  try {
    const foundUser = await userModel.findOne({ refreshToken: refreshToken });
    if (!foundUser) return res.sendStatus(403); //Forbidden
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username)
          return res.sendStatus(403);
        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_PRIVATE_KEY,
          { expiresIn: "30d" }
        );

        const { username, email, phone, isBlocked, role } = foundUser;

        res.status(200).json({ accessToken });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

const verifyEmail = async (req, res, next) => {
  let email = req.body.email;
  try {
    const user = await findUserHelper(email);

    if (true) {
      userEmail = req.body.email;
      const EMAIL = process.env.MAILGEN_EMAIL;
      const PASSWORD = process.env.MAILGEN_PASSWORD;

      let config = {
        service: "gmail",
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      };

      let transporter = nodemailer.createTransport(config);

      let MailGenerator = new MailGen({
        theme: "default",
        product: {
          name: "Mailgen",
          link: "https://mailgen.js/",
        },
      });

      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
        digits: true,
      });
      let response = {
        body: {
          Email: userEmail,
          intro: `Your OTP ${otp})}`,

          outro: "Expires within 10 minuites",
        },
      };

      let mail = MailGenerator.generate(response);

      let message = {
        from: EMAIL,
        to: userEmail,
        subject: "Your OTP",
        html: mail,
      };

      transporter.sendMail(message).then(async () => {
         req.session.otp = otp;
         req.session.email=email
         req.session.isUserOtpSend=true
         console.log(req.session)

        res.status(200).json({ isOtpSend: true });
      });

    } else {

      res.status(404).json({message:'user not found'})

    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

module.exports = {
  registerNewUser,
  login,
  handleRefreshToken,
  verifyEmail,
};
