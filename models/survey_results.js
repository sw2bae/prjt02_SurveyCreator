'use strict';
module.exports = (sequelize, DataTypes) => {
    const Survey_Results = sequelize.define(
        'Survey_Results', {
        survey_result: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }
    );
    Survey_Results.associate = function (models) {
        // associations can be defined here
        Survey_Results.belongsTo(models.Survey_Questions, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Survey_Results;
};
