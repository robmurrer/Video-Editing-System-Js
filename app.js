"use strict";

var intervalId;
var start_time = 0.0;
var looping = false;

var delta = 0.1;
var duration = 3;
var vid;
 
var update_from_ui = function() {
  looping = document.getElementById("looping").checked;
  vid = document.getElementById("vid");
  duration = parseFloat(document.getElementById("duration_input").value);
  delta = parseFloat(document.getElementById("delta_input").value);
};

var update_from_internal = function() {
  document.getElementById("duration_input").value = duration;
  document.getElementById("delta_input").value = delta;
};

var toggle_loop = function() {
  update_from_ui();   
  console.log(looping);
  if (!looping) {
      stop_loop(); 
      return;
  }

  start_time = vid.currentTime;
  vid.currentTime = start_time;
  vid.play();
  intervalId = window.setInterval(function() {
      update_from_ui();
      if (vid.currentTime < start_time + duration) return;
      else
      {
        console.log("looping..");
        vid.currentTime = start_time;
      }
  
    }, 30);

};

var spin_delta_down = function() {
    update_from_ui();
    delta -= .1;
    update_from_internal();
};

var spin_delta_up = function() {
    update_from_ui();
    delta += .1;
    update_from_internal();
};

var spin_duration_down = function() {
    update_from_ui();
    duration -= delta; 
    update_from_internal();
};

var spin_duration_up = function() {
    console.log("1:" + duration);
    update_from_ui();
    console.log("2:" + duration);
    duration += delta;  
    console.log("3:" + duration);
    update_from_internal();
    console.log("4:" + duration);
};

var scrub_loop_back = function() {
  update_from_ui();   
  start_time -= delta;
  vid.currentTime = start_time;
};

var scrub_loop_forward = function() {
  update_from_ui();   
  start_time += delta;
  vid.currentTime = start_time;
};


var stop_loop = function() {
  window.clearInterval(intervalId);
};

