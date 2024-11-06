const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class UserService {
    async register({ email, fullname, username, password }) {
        const userExists = await User.findOne({ username });
        if (userExists) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return User.create({
            username,
            email,
            fullname,
            password: hashedPassword,
        });
    }

    async login({ username, password }) {
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

            return { accessToken, refreshToken };
        } else {
            throw new Error("Invalid credentials");
        }
    }

    getCurrentUser(user) {
        return user;
    }

    async refreshToken(refreshToken) {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return reject(new Error("Invalid or expired refresh token"));
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
                resolve(accessToken);
            });
        });
    }
}

module.exports = UserService;
