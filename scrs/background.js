// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

/*
var min = 1;
var max = 2;
var current = min;

function updateIcon() {
  chrome.browserAction.setIcon({path:"icon" + current + ".png"});
  current++;

  if (current > max)
    current = min;
}

chrome.browserAction.onClicked.addListener(updateIcon);
updateIcon();
*/
/*
function alerttimer() {
var audio = document.getElementsByTagName("audio")[0];
audio.play();
		}
*/
		
function show() {
  var time = /(..)(:..)/.exec(new Date());
  var hour = time[1];
  new Notification(hour + time[2] , {
    icon: 'icon2.png',
    body: 'GET OUT',
	audio: 'wscream.wav'
  });
}

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.frequency = 1;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.
}

// Test for notification support.
if (window.Notification) {
  // While activated, show notifications at the display frequency.
  if (JSON.parse(localStorage.isActivated)) { show(); }

  var interval = 0; // The display interval, in minutes.

  setInterval(function() {
    interval++;

    if (
      JSON.parse(localStorage.isActivated) &&
        localStorage.frequency <= interval
    ) {
      show();
      interval = 0;
    }
  }, 60000);
}
