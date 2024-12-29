import express from "express";
import { rateLimit } from "express-rate-limit";
const app = express();
const PORT = 3000;

app.use(express.json());

const otpStore: Record<string, string> = {};

const otpRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes max: 3,Limit each IP to 3 OTP requests per windowMs message: 'Too many requests, please try again after 5 minutes',`
  standardHeaders: true, // Return rate limit info in the RateLimit-*`
  legacyHeaders: false, // Disable the X-RateLimit-* headers`
  message: "Too many reset otp request, Try after some time ",
  headers: true,
});
const resetPasswordLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 5 minutes max: 3,Limit each IP to 3 OTP requests per windowMs message: 'Too many requests, please try again after 5 minutes',`
  standardHeaders: true, // Return rate limit info in the RateLimit-*`
  legacyHeaders: false, // Disable the X-RateLimit-* headers`
  message: "Too many reset password request, Try after some time ",
  headers: true,
});
app.post("/generate-otp", otpRateLimiter, (req, res) => {
  const email = req.body.email;

  if (!email) {
    res.status(400).json({ message: "Email is required" });
  }

  const otp: string = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;
  if (!otpStore[email]) {
    res.status(400).json({ message: "error in generating otp" });
  } else {
    console.log(`otp created for ${email} : ${otp}`);
    res.status(200).json({ message: "otp has been generated and stored" });
  }
});

app.post("/reset-password", resetPasswordLimiter, (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    ``;
    res.status(400).json({ message: "invalid request details " });
  }
  if (otpStore[email] === otp) {
    console.log(`password has been resetted to ${newPassword} for ${email}`);
    delete otpStore[email];
    res
      .status(200)
      .json({ message: `password has been resetted to: ${newPassword}` });
  } else {
    res.status(400).json({ message: "wrong otp" });
  }
});

app.listen(PORT, () => {
  console.log(`app is working on link http://localhost:${PORT}`);
});
