'use strict';
module.exports = (sequelize, DataTypes) => {
    const Surveys = sequelize.define(
        'Surveys',
        {
            // user_id: DataTypes.INTEGER,
            survey_title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            }
        }
    );
    Surveys.associate = function (models) {
        // associations can be defined here
        Surveys.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Surveys.hasMany(models.Survey_Questions, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Surveys;
};
