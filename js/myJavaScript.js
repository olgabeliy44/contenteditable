var myDiv = document.getElementById('mydiv');
var p = 0, s = 0, d = 0;
var isContenteditable = false;
var id;

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
    var sel, range;

    if (window.getSelection) {
        sel = window.getSelection();

        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);

            if(isContenteditable){
                range.deleteContents();
                range.insertNode( tag );
                sel.removeAllRanges();
                sel.setPosition(tag, 1);
            }
            else {
                myDiv.appendChild(tag);
                sel.setPosition(tag, 1);
            }
        }
        else {
            myDiv.appendChild(tag);
            sel.setPosition(tag, 1);
        }
    } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().tag = tag;
    }
}

function getId(e) {
    id = e.target.className;

    var check = id.match(/[0psd]+/g);

    if(e.target.className !== "btn") {
       isContenteditable = check !== null;
       return;
    }
    else return;

    if(check) {
        isContenteditable = true; return;
    }

    if (isContenteditable && e.target.id === "")
    {
        isContenteditable = false;
    }
}