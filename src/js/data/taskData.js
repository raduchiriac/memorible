'use strict';

var STORAGE_NAME = 'tasks';

exports.save = function (tasks) {
  localStorage.setItem(STORAGE_NAME, JSON.stringify(tasks));
};

exports.load = function () {
  var storedTasks = localStorage.getItem(STORAGE_NAME);
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  return [];
};

exports.clear = function () {
  localStorage.removeItem(STORAGE_NAME);

};
