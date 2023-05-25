const BaseRepository = require("./base.repository");
const { user: User } = require("../models");
const { Op } = require("sequelize");

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  getByEmail(email) {
    return this.findOne({ where: { email } });
  }

  getByUsername(username) {
    return this.findOne({ where: { username } });
  }

  getByUsernameOrEmail(username, email) {
    return this.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
  }
}

module.exports = new UserRepository();
