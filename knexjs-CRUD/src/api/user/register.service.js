import database from "../../comman/config/database";

export async function createUser(userData) {
  const [id] = await database("user").insert(userData);
  return await database("user").where("id", id).first();
  
}

export async function checkExistingUserByEmail(email) {
  return await database("user").where("email", email).first();
  
}

export async function getUserById(id) {
  return await database("user").where("id", id).first();
  
}
