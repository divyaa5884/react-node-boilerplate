module.exports = (sequelize, Sequelize) => {
    const callLog = sequelize.define("callLog", {
        callerId: {
            type: Sequelize.STRING,
            allowNull: false,
            // references: 'userDetails', //its table's name, not object name
            // referencesKey: 'userId' //its a column name
            model: sequelize.userDetails,
            key: 'userId'
        },
        receiverId: {
            type: Sequelize.STRING,
            allowNull: false,
            model: sequelize.userDetails,
            key: 'userId'
        },
        callDuration: {
            type: Sequelize.INTEGER(11),
        }
    });
    return callLog;
};