'use strict';

var $ = require('jquery');
var taskTemplate = require('../../templates/task.hbs');

function _renderTask(theTaskToGenerate) {
  console.log(theTaskToGenerate);
  return $(taskTemplate(theTaskToGenerate));
}

exports.renderTasks = function (tasksFromLocalstorage) {
  var elementArray = $.map(tasksFromLocalstorage, _renderTask);

  $("#task-list")
    .empty()
    .append(elementArray);
};

exports.renderNew = function () {
  var $taskList = $("#task-list");
  $taskList.prepend(_renderTask({}));
};
