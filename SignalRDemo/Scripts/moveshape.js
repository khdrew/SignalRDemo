(function () {

    var shape = document.getElementById("shape");

    // initialise default position
    var shapeModel = {
        left: 10,
        top: 10
    };

    // make shape dragable
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(shape.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(shape.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        shape.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        shape.style.top = (shape.offsetTop - pos2) + "px";
        shape.style.left = (shape.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        shapeModel = {
            top: parseInt(shape.style.top),
            left: parseInt(shape.style.left)
        };
        console.log({ shapeModel });
        // UPDATE SERVER OF NEW POSITION
        moveShapeHub.server.updateModel(shapeModel);
    }

    function updateShapePos() {
        shape.style.top = shapeModel.top + "px";
        shape.style.left = shapeModel.left + "px";
    }

    // set position based on server broad casted position
    var moveShapeHub = $.connection.moveShapeHub
    moveShapeHub.client.updateShape = function (model) {
        shapeModel = model;
        updateShapePos();
    };

    // reset to default position when new client joins
    $.connection.hub.start().done(function () {
        moveShapeHub.server.updateModel(shapeModel);
    });
})();
