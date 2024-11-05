const asyncHandler =  require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
    console.log("Register endpoint hit");

    const { email, fullname, username, password } = req.body;

    if (!email || !fullname || !username || !password) {
        return res.status(400).json("All fields are mandatory!");
    }

    const userAvailable = await User.findOne({ username });
    if (userAvailable) {
        return res.status(400).json("All fields are mandatory!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    
    const user = await User.create({
        username,
        email,
        fullname,
        password: hashedPassword,
    });

    console.log(`User created ${user}`);
    
    if (user) {
        return res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

const login = asyncHandler(async (req, res) => {
    console.log("Login endpoint hit");

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json("All fields are mandatory!");
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {

        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" } 
        );

        const refreshToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" } 
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

        res.status(200).json({ accessToken , refreshToken});
    } else {
        res.status(401);
        throw new Error("Username or password is incorrect");
    }
});


const current = asyncHandler(async(req, res) => {
    res.json(req.user);
});

const refreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json("Refresh Token is required");
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json("Invalid or expired refresh token");
        }
        const accessToken = jwt.sign(
            {
                user: {
                    username: decoded.user.username,
                    email: decoded.user.email,
                    id: decoded.user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        res.status(200).json({ accessToken });
    });
});


module.exports = { refreshToken,current,register, login };
