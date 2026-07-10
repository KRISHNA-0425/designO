import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const genToken = (userId) => {
    try {
        const token = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )
        return token;
    } catch (error) {
        console.error('Error in token generation:', error);
    }
}

export default genToken