const { signupHelper, loginHelper } = require("../helpers/authHelper");
const userModel = require("../models/userModel");


const registerNewUser = async (req, res, next) => {
  try {
    const response = await signupHelper(req.body)
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ response: error });
  }
}

const login = async (req, res, next) => {
  try {
    const response = await loginHelper(req.body)
    const { foundUser, accessToken } = response;

    res.cookie('jwt', foundUser.refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })

    const {
      username,
      email,
      phone,
      isBlocked,
      role
    } = foundUser

    const data = {
      username,
      email,
      phone,
      isBlocked,
      role,
      accessToken
    }

    res.status(200).json({ data });

  } catch (error) {
    console.log(error)
  }
}

const handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies
  console.log(cookies)
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  try {
    const foundUser = await userModel.findOne({ refreshToken: refreshToken })
    if (!foundUser) return res.sendStatus(403); //Forbidden
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
        const accessToken = jwt.sign(
          { "username": decoded.username },
          process.env.ACCESS_TOKEN_PRIVATE_KEY,
          { expiresIn: '30d' }
        );

        const { username, email, phone, isBlocked, role } = foundUser


        res.status(200).json({ accessToken })
      }
    );
  } catch (error) {
    res.status(500).json(error)
  }
}

const verifyEmailOrPhone = async (req, res, next) => {
  res.status(200).json({ message: 'email/phone verification success' });
}

module.exports = {
  registerNewUser,
  login, handleRefreshToken,
  verifyEmailOrPhone
}