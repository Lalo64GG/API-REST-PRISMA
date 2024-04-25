import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from 'uuid'
import bcryptMiddleware from "../middleware/bycript.middleware.js";

const prisma = new PrismaClient();

const create = async({ email, password, name, last_name }) => {
    try {
        const userId = uuid();

        const user = await prisma.users.create({
            data: {
                id: userId,
                email,
                password: await bcryptMiddleware.hashedPassword(password),
                name,
                last_name
            }
        })

        if (!user) {
            throw new Error("User not created")
        }

        return user;
        
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

const getAll = async() => {
    try {
        const users = await prisma.users.findMany();

        if(!users){
            throw new Error("No users found");
        }

        return users;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

const getId = async(id) => {
    try {
        const user = await prisma.users.findFirst({
            where: {
                id : id
            }
        })

        if (!user) {
            throw new Error('User no found')
        }

        return user;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

const update = async(id, { name, last_name, email, password }) => {
    try {
        const userUpdate = await prisma.users.update({
            where: {
                id: id
            },
            data: {
                name: name,
                last_name: last_name,
                email: email,
                password: password
            }
        })

        if (!userUpdate) {
            throw new Error('User not updated')
        }

        return userUpdate;

    } catch (error) {
        console.log(error.message);
    }
}

const deleteId = async(id) => {
    try {
        const userDelete = await prisma.users.delete({
            where: {
                id: id
            }
        })

        return userDelete
    }catch( error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

export default {
    create,
    getAll,
    getId,
    update,
    deleteId
}