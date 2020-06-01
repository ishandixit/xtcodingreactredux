function disableDeveloperToolAccess(e) {
    //document.onkeydown = function(e) {
    // "I" key
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
    }
    // "J" key
    if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
    }
    // "S" key + macOS
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
    }
    // "U" key
    if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
    }
    
    // "F12" key
    if (event.keyCode == 123) {
        disabledEvent(e);
    }
}
function preventDefaults(e) {
    e.preventDefault();
}

function disabledEvent(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else if (window.event) {
        window.event.cancelBubble = true;
    }
    e.preventDefault();
    return false;
}

export const enableLimitedAccess = () => {
    document.addEventListener("contextmenu", e=>preventDefaults(e));
    document.addEventListener("keydown", e=>disableDeveloperToolAccess(e));
    
    // window.addEventListener("beforeunload", function () {
    //     window.onbeforeunload = null;
    // });
}

export const disableLimitedAccess = () => {
    document.removeEventListener("contextmenu", e => preventDefaults(e));
    document.removeEventListener("keydown", e => disableDeveloperToolAccess(e));
}

export function LimitedAccess(value) {
    // console.log("called:", value)
    value == 1 ? enableLimitedAccess() : disableLimitedAccess();
}
