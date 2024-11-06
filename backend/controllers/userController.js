const asyncHandler = require("express-async-handler");

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    register = asyncHandler(async (req, res) => {
        console.log("Register endpoint hit");

        const { email, fullname, username, password } = req.body;
        if (!email || !fullname || !username || !password) {
            return res.status(400).json("All fields are mandatory!");
        }

        const user = await this.userService.register({ email, fullname, username, password });
        res.status(201).json({ _id: user.id, email: user.email });
    });

    login = asyncHandler(async (req, res) => {
        console.log("Login endpoint hit");

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json("All fields are mandatory!");
        }

        const { accessToken, refreshToken } = await this.userService.login({ username, password });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ accessToken, refreshToken });
    });

    current = asyncHandler(async (req, res) => {
        res.json(this.userService.getCurrentUser(req.user));
    });

    refreshToken = asyncHandler(async (req, res) => {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json("Refresh Token is required");
        }

        const accessToken = await this.userService.refreshToken(refreshToken);
        res.status(200).json({ accessToken });
    });
}

module.exports = UserController;
