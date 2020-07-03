const Router = require('express').Router;
const db = require('../models');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { sequelize } = require('../models');

const htmlRoutes = new Router();

htmlRoutes.get('/', async (req, res) => {
  // console.log(req.user) can use req.user to pull matching surveys from db;
  res.render('logIn', {});
});

htmlRoutes.get('/signUp', async (req, res) => {
  res.render('signUp', {});
});

// connect to survey handlebars
htmlRoutes.get('/surveys/create', isAuthenticated, async (req, res) => {
  //if user is logged in let them access otherwise send them to login page
  res.render('createSurvey');
});

//for all user surveys.
htmlRoutes.get('/surveys', isAuthenticated, async (req, res) => {
  const surveys = await db.Surveys.findAll({
    attributes: ['id', 'survey_title'],
    where: {
      UserId: req.user.id
    }
  });
  // console.log(surveys);
  res.render('surveys', { Surveys: surveys });
});

//for each created survey
htmlRoutes.get('/surveys/take/:id', async (req, res) => {
  const options = {
    where: {
      id: req.params.id
    },
    include: [db.Survey_Questions]
  };
  const surveysdb = await db.Surveys.findOne(options);
  // console.log(surveysdb);
  res.render('takeSurvey', { Surveys: surveysdb });
});

htmlRoutes.get('/surveys/result/:id', async (req, res) => {
  const surveys = await db.Surveys.findOne({
    where: {
      id: req.params.id
    },
    include: [db.Survey_Questions]
  });

  const survey_questions = await db.Survey_Questions.findAll({
    where: {
      SurveyId: req.params.id
    },
    include: [db.Survey_Results]
  });

  console.log(survey_questions[0]);
  console.log(survey_questions[0].Survey_Results);

  const dbdata = {
    survey_title: surveys.survey_title,
    survey_questions: survey_questions[0].survey_questions,
    resultCount: survey_questions[0].Survey_Results.length,
    trueConunt: survey_questions[0].Survey_Results.filter(Survey_Results => {
      return Survey_Results.survey_result == true;
    }).length,
    falseConunt: survey_questions[0].Survey_Results.filter(Survey_Results => {
      return Survey_Results.survey_result == false;
    }).length
  };
  console.log(dbdata)

  res.render('surveyResults', { Survey_Results: dbdata })
});

htmlRoutes.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

htmlRoutes.get('/thankYou', function (req, res) {
  res.render('thankYou');
});

// Render 404 page for any unmatched routes
htmlRoutes.get('*', async (req, res) => {
  res.render('404');
});

module.exports = htmlRoutes;
