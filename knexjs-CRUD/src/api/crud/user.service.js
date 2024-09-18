import database from "../../comman/config/database";

export async function createUser(userData) {
    const [id] = await database("students").insert(userData);
    const newUser = await database("students").where({ id }).first();
    return newUser;
}

export async function getAllUsers() {
    const allStudents = await database("students").select("*");
    return allStudents;
}

export async function getSingleUser(id) {
    const singleUser = await database("students").where("id", id);
    return singleUser;
}

export async function updateUser(id, userData) {
    const updateUser = await database("students")
        .where("id", id)
        .update(userData);

    const upatedUser = await database("students").where("id", id).first();
    return upatedUser;
}

export async function deleteUser(id) {
    const deleteStudent = await database("students").where({id}).del();
    return deleteStudent;
}


export async function existingUser(email){
    const existingUser = await database("students").where("email",email)
    return existingUser;
}