import bcrypt from 'bcrypt';

const hashedPassword = async( password ) =>{

    return await bcrypt.hash(password, 10); 
}
const comparePassword = async( plainPassword, hashPassword) => {
    return await bcrypt.compare(plainPassword, hashPassword);
}

export default {
    hashedPassword,
    comparePassword
}