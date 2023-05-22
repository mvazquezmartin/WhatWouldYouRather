const Users = require("./model/user.model");

class UserDao {
  async findUser(username) {
    try {
      const user = await Users.findOne({ email: username });
      return user;
    } catch (error) {
      console.log("Error in UserDao findUser");
      throw error;
    }
  }

  async createUser(newUserInfo) {
    try {
      const newUser = await Users.create(newUserInfo);
      return newUser;
    } catch (error) {
      console.log("Error in UserDao createUser");
      throw error;
    }
  }

  async getAllUser() {
    try{
    const users = await Users.find();
    return users;
  }catch(error){
    console.log("Error in UserDao getAllUser")
  }
}

  async findUserById(id) {
    try {
      const user = await Users.findById(id);
      return user;
    } catch (error) {
      console.log("Error in UserDao findUser");
      throw error;
    }
  }

  async deleteAllUser() {
    try{
    const deleteUsers = await Users.deleteMany({ role: "user" });
    console.log("Every Users has gone (ಠ_ಠ)");
  }catch(error){
    console.log("Error in UserDao deelteAllUser")
    throw error
  }
  }
}

module.exports = UserDao;
