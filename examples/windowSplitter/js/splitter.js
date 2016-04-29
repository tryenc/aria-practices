var splitter = {
  currentElement: null,
  startPosition: null,
  windowSplitter: null,
  controlledPane: null,
  isVertical: function () {
    return document.getElementById("windowSplitter").getAttribute("aria-orientation") == "vertical";
  },
  splitterWidth: function () {
    return parseInt(window.getComputedStyle(document.getElementById("windowSplitter")).getPropertyValue("width"), 10);
  },
  splitterHeight: function () {
    return parseInt(window.getComputedStyle(document.getElementById("windowSplitter")).getPropertyValue("height"), 10);
  },
  init: function () {
    splitter.windowSplitter = document.getElementById("windowSplitter");
    splitter.controlledPane = document.getElementById(splitter.windowSplitter.getAttribute('aria-controls'));
    splitter.windowSplitter.addEventListener('click', function (event) {
      splitter.buttonClick.call(this, event);
    });
    splitter.windowSplitter.addEventListener('keydown', function (event) {
      splitter.buttonKey.call(this, event);
    });
    document.addEventListener('mousemove', function (event) {
      splitter.move.call(this, event);
    });
    document.addEventListener('mouseup', function (event) {
      splitter.up.call(this, event);
    });
    splitter.windowSplitter.addEventListener('mousedown', function (event) {
      splitter.down.call(this, event);
    });
    var initWidth = 250;
    var initHeight = 250;
    if (splitter.isVertical()) {
      splitter.setWidth(splitter.controlledPane, initWidth);
    } else {
      splitter.setHeight(splitter.controlledPane, initHeight);
    }

  },
  buttonClick: function (e) {

    if (splitter.isVertical()) {
      if (splitter.startXPosition === null || this.style.left == splitter.startXPosition) {
        if (splitter.getWidth(splitter.controlledPane) > 0) {
          splitter.controlledPane.setAttribute("data-oldwidth", parseInt(splitter.controlledPane.style.width, 10));
          splitter.setWidth(splitter.controlledPane, 0);
        } else {
          splitter.setWidth(splitter.controlledPane, splitter.controlledPane.getAttribute("data-oldwidth") ? parseInt(splitter.controlledPane.getAttribute("data-oldwidth"), 10) : "250");
        }
      }
    } else {
      if (splitter.startYPosition === null || this.style.top == splitter.startYPosition) {
        if (splitter.getHeight(splitter.controlledPane) > 0) {
          splitter.controlledPane.setAttribute("data-oldheight", parseInt(splitter.controlledPane.style.height, 10));
          splitter.setHeight(splitter.controlledPane, 0);
        } else {
          splitter.setHeight(splitter.controlledPane, splitter.controlledPane.getAttribute("data-oldheight") ? parseInt(splitter.controlledPane.getAttribute("data-oldheight"), 10) : "250");
        }
      }
    }
  },
  buttonKey: function (e) {
    splitter.startXPosition = null;
    splitter.startYPosition = null;
    if (splitter.isVertical()) {
      if (e.keyCode === 37) {
        splitter.setWidth(splitter.controlledPane, splitter.getWidth(splitter.controlledPane) < 10 ? 0 : splitter.getWidth(splitter.controlledPane) - 10);
      } else if (e.keyCode === 39) {
        splitter.setWidth(splitter.controlledPane, splitter.getWidth(splitter.controlledPane) > 490 ? 500 : splitter.getWidth(splitter.controlledPane) + 10);
      }
    } else {
      if (e.keyCode === 38) {
        splitter.setHeight(splitter.controlledPane, splitter.getHeight(splitter.controlledPane) < 10 ? 0 : splitter.getHeight(splitter.controlledPane) - 10);
      } else if (e.keyCode === 40) {
        splitter.setHeight(splitter.controlledPane, splitter.getHeight(splitter.controlledPane) > 490 ? 500 : splitter.getHeight(splitter.controlledPane) + 10);
      }
    }
    if (e.keyCode === 13) {
      splitter.buttonClick.apply(this);
    }
  },
  getWidth: function (target) {
    return parseInt(target.style.width, 10);
  },
  getHeight: function (target) {
    return parseInt(target.style.height, 10);
  },
  setWidth: function (target, newWidth) {
    target.style.width = newWidth + "px";
    splitter.windowSplitter.style.left = newWidth + "px";
    document.getElementById("main").style.left = newWidth + splitter.splitterWidth() + "px";
    if (newWidth === 0) {
      splitter.windowSplitter.setAttribute("aria-expanded", "false");
    } else {
      splitter.windowSplitter.setAttribute("aria-expanded", "true");
    }

  },
  setHeight: function (target, newHeight) {
    target.style.height = newHeight + "px";
    splitter.windowSplitter.style.top = newHeight + "px";
    document.getElementById("main").style.top = newHeight + splitter.splitterHeight() + "px";
    if (newHeight === 0) {
      splitter.windowSplitter.setAttribute("aria-expanded", "false");
    } else {
      splitter.windowSplitter.setAttribute("aria-expanded", "true");
    }

  },
  down: function (event) {
    splitter.currentElement = this;
    splitter.startXPosition = this.style.left;
    splitter.startYPosition = this.style.top;
    this.className = "dragging";
    if (event) event.preventDefault();
    return false;
  },
  move: function (event) {
    var newPos;
    if (splitter.currentElement) {
      if (splitter.isVertical()) {
        newPos = event.clientX < 0 ? 0 : event.clientX;
        splitter.setWidth(splitter.controlledPane, newPos);
      } else {
        newPos = event.clientY < 0 ? 0 : event.clientY;
        splitter.setHeight(splitter.controlledPane, newPos);

      }
      if (event) event.preventDefault();
      return false;
    }

  },
  up: function (event) {
    splitter.windowSplitter.className = "";
    splitter.currentElement = null;
    if (event) event.preventDefault();
    return false;

  }


};

window.onload = splitter.init;