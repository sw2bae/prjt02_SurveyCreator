const $ = window.$;
const $takeBtn = $('.take-Btn');
const $createBtn = $('.create-Btn');
const $deleteBtn = $('.delete-Btn');
const $resultBtn = $('.result-Btn');
const $createSurveyBtn = $('#createSurvey-Btn');
const $questionId = $('#question_Id').attr("value");
const $takeSurveyBtn = $('.takeSurveyBtn');

// The API object contains methods for each kind of request we'll make
const API = {
    getUser: function () {
        return $.ajax({
            url: '/api/user_data',
            type: 'GET'
        });
    },
    getSurvey: function (surveyId) {
        return $.ajax({
            url: '/api/surveys/take/' + surveyId,
            type: 'GET'
        });
    },

    deleteSurvey: function (id) {
        return $.ajax({
            url: '/api/surveys/delete/' + id,
            type: 'DELETE'
        });
    },
    saveSurvey: function (title, question) {
        return $.ajax({
            url: '/api/surveys/create',
            type: 'POST',
            data: {
                survey_title: title,
                survey_questions: question
            },
            success: function () {
                window.location.href = '/surveys';
            }
        });
    },
    saveResult: function (result) {
        return $.ajax({
            url: '/api/surveys/result',
            type: 'POST',
            data: {
                survey_result: result,
                SurveyQuestionId: $questionId
            },
        });
    },
    getResult: function (surveyId) {
        return $.ajax({
            url: '/api/surveys/result' + surveyId,
            type: 'GET',
        });
    }
};
// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
const handleUserControl = function () {
    API.getUser().then(function (data) {
        const userEmail = data.email;
        if (!userEmail) {
            $(".user-control").hide();
        } else {
            $(".user-control").show();
        }
        $(".member-name").text(userEmail);
    });
};
// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
const handleDeleteBtnClick = function () {
    const idToDelete = $(this).attr('data-surveyid');
    API.deleteSurvey(idToDelete).then(function () {
        location.reload();
    });
};



const handleCreatingSurvey = function () {
    const titleInput = $("#surveyTitle").val().trim();
    const questionInput = $("#question1").val().trim();
    if (!(titleInput && questionInput)) {
        window.alert('You must enter your survey information!');
        return;
    }
    API.saveSurvey(titleInput, questionInput);
};

const handleGetSurvey = function () {
    const idToTake = $(this).attr('data-surveyid');
    API.getSurvey(idToTake).then(function () {
        window.location.href = '/surveys/take/' + idToTake;
    });
};

const handleSaveResult = function () {
    const questionId = $questionId;
    let resultToSave = $(`input[name="question${questionId}"]:checked`).val();
    if (!resultToSave) {
        alert("Choose at least one option");
    }
    API.saveResult(resultToSave).then(function () {
        window.location.href = '/thankYou';
    });
};

const handleGetResult = function () {
    const idToGet = $(this).attr('data-surveyid');
    API.getResult(idToGet).then(function () {
        window.location.href = '/surveys/result/' + idToGet;
    });
};


handleUserControl();
// Button to take us from login page to create survey
$createBtn.on("click", function () {
    window.location.href = "/surveys/create"
});
// Add event listeners to the submit and delete buttons
$deleteBtn.on("click", handleDeleteBtnClick);

$createSurveyBtn.on("click", handleCreatingSurvey);

$takeBtn.on("click", handleGetSurvey);

$takeSurveyBtn.on("click", handleSaveResult);

$('.survey-Url').text(window.location.href);

$resultBtn.on("click", handleGetResult);