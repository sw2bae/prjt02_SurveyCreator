'use strict';
module.exports = (sequelize, DataTypes) => {
  const Survey_Questions = sequelize.define(
    'Survey_Questions',
    {
      // survey_id: DataTypes.INTERGER,
      survey_questions: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    }
  );
  Survey_Questions.associate = function (models) {
    // associations can be defined here
    Survey_Questions.belongsTo(models.Surveys, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: false
      }
    });
    Survey_Questions.hasMany(models.Survey_Results, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Survey_Questions;
};
