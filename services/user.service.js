const bcryptjs = require("bcryptjs");

const UserRepository = require("../repositories/user.repository");
const BaseService = require("./base.service");

class UserService extends BaseService {
  constructor() {
    super(UserRepository);
    this.repository = UserRepository;
  }

  getByUsernameOrEmail(username, email) {
    return this.repository.getByUsernameOrEmail(username, email);
  }

  getByUsername(username) {
    return this.repository.getByUsername(username);
  }

  getByEmail(email) {
    return this.repository.getByEmail(email);
  }

  async hashUserPassword(password) {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
  }

  compareUserPassword(password, hash) {
    return bcryptjs.compare(password, hash);
  }
}

module.exports = new UserService();
