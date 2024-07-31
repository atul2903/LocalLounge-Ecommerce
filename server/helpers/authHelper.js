import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (e) {
        console.log(e)
    }
}


export const comparePassword = async (pass, hashedPassword) => {
    try {
        return bcrypt.compare(pass, hashedPassword);
    } catch (e) {
        console.log(e)
    }
}