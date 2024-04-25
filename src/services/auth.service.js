import { PrismaClient } from "@prisma/client";
import bcryptMiddleware from "../middleware/bycript.middleware.js";
import generateToken from "../middleware/Jwt.middleware.js";

const prisma = new PrismaClient();

const auth = async ({ email, password }) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcryptMiddleware.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Password is not valid");
    }

    return {
        id: user.id,
        email: user.email,
        token: generateToken()
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};


export default {
    auth
}
