const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, "thisIsMyUltraSecureSecretItsAlsoLong", {
    expiresIn: "90d",
  });
};


const createSendToken = (user,statusCode, res)=>{
  const token = signToken(user._id);
  const cookieOptions = {
    // 90 has to go to config.env as JWT_COOKIE_EXPIRES_IN
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true
  }
  if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
  res.cookie('jwt', token, cookieOptions )

  user.password = undefined;

  res.status(statusCode).json({
    status:"success",
    token,
    data:{
      user
    }
  })
}

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res)
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1) check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please Provide email and password', 400));
  }
  //2) check if user exists and if the password is correct
  const user = await User.findOne({
    email,
  }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //3) if everything ok send the token to the client
  createSendToken(user,201,res)
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) get token and check if exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get access!', 401)
    );
  }
  //2) validate token
  const decoded = await promisify(jwt.verify)(token, "thisIsMyUltraSecureSecretItsAlsoLong");
  //3) check if user still exists
  const currentUser = User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError('User does not exists', 401));
  }

  req.user = currentUser;

  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    
    const decoded = await promisify(jwt.verify)(req.cookies.jwt, "thisIsMyUltraSecureSecretItsAlsoLong");
    const currentUser = await User.findById(decoded.id);
    console.log(currentUser)
    if (!currentUser) {
      return next();
    }

    res.locals.user = currentUser;

    return next();
  }

  next();
});
