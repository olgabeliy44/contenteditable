var myDiv = document.getElementById('mydiv');
myDiv.onclick = function() { keyChange("onclick")};
myDiv.onkeypress = function() { keyChange("onchange")};
var p = 0, s = 0, d = 0;
var preCaretRange, preSel;

function btn1() {
    var paragraph = document.createElement('p');
    paragraph.className = p +"p";
    paragraph.innerHTML = "upload";
    insertTextAtCaret(paragraph);
}

function btn2() {
    var span = document.createElement('span');
    span.className = s+"s";
    span.innerHTML = "download";
    insertTextAtCaret(span);
}

function btn3() {
    var div = document.createElement('div');
    div.className = d +"d";
    div.innerHTML = "none";
    insertTextAtCaret(div);
}

function insertTextAtCaret(tag) {

    var tempSel, tempRange;

    if (window.getSelection) {
        tempSel = window.getSelection();

        if (tempSel.getRangeAt && tempSel.rangeCount) {
            tempRange = tempSel.getRangeAt(0);

            if(tempRange.intersectsNode(myDiv)){
                tempRange.deleteContents();
                tempRange.insertNode( tag );
                tempSel.removeAllRanges();
                tempSel.setPosition(tag, 1);

                preCaretRange = tempRange;
                preSel = tempSel;
            }
            else {
                if(preSel !== null && preCaretRange !== null) {
                    try {
                        tempRange = preCaretRange.cloneRange();
                        tempRange.insertNode( tag );
                        tempSel.removeAllRanges();
                        tempSel.setPosition(tag, 1);
                        preSel = tempSel;
                        preCaretRange = tempSel;
                    }
                    catch (e) {
                        console.log(e);
                        myDiv.appendChild(tag);
                        tempSel.setPosition(tag, 1);
                    }
                }
                else {
                    myDiv.appendChild(tag);
                    tempSel.setPosition(tag, 1);
                }
            }
        }
        else {
            myDiv.appendChild(tag);
            tempSel.setPosition(tag, 1);
        }
    } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().tag = tag;
    }
}

function keyChange(state) {

    console.log(state);

    var tempSel, tempRange;

    if (window.getSelection) {
        tempSel = window.getSelection();

        if (tempSel.getRangeAt && tempSel.rangeCount) {
            tempRange = tempSel.getRangeAt(0);
            preCaretRange = tempRange;
            preSel = tempSel;
        }
    }
}