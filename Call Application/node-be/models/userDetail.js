module.exports = (sequelize, Sequelize) => {
    const userDetail = sequelize.define("userDetail", {
        userName: {
            type: Sequelize.STRING,
        },
        userContact: {
            type: Sequelize.STRING(15),
            allowNull: false,
            primaryKey: true
        }
    });
    return userDetail;
  };