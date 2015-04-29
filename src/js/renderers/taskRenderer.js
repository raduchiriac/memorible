'use strict';

var $ = require('jquery');
var taskTemplate = require('../../templates/task.hbs');

function _renderTask(theTaskToGenerate) {
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
  var theNewTask = $taskList.prepend(_renderTask({}));
  var elem = document.querySelector('.js-switch');
  var init = new Switchery(elem);
};
