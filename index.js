let textBoxInput = document.querySelector("input[type=text]");
let wrongMsgLine = document.querySelector(".wrongMsgLine");
let spanMessageContainer = document.querySelector('.spanMessage');
const letsPlayBtn = document.querySelector('button');

const letters = /^[ a-zA-Z\-\']+$/;
let isNameCorrect = false;


function pattenMatch(text, pattern) {
    if (text.match(pattern))
        return true
    return false;
}

let oneword = false;

/* a */ //validate the user input
textBoxInput.addEventListener("keyup", function (e) {

    if (e.keyCode == 32 && oneword == false) {
        oneword = true;
    }
    else if (e.keyCode == 32 && oneword == true) {
        spanMessageContainer.textContent = 'You must Enter just TWO Names !!'
        wrongMsgLine.style = "display:block"
        isNameCorrect = false;
        return 0;
    }

    let inputValue = textBoxInput.value;
    console.log(inputValue);
    // Not Empty & Not Spaces Only
    if (inputValue.length == 0) {
        spanMessageContainer.textContent = 'Name cannot be Empty!'
        wrongMsgLine.style = "display:block"
        isNameCorrect = false;
        oneword = false;
        return 0;
    } else {
        if (inputValue.trim().length == 0) {
            spanMessageContainer.textContent = 'Name cannot be Spaces only!'
            wrongMsgLine.style = "display:block"
            isNameCorrect = false;
            oneword = false;
            return 0;
        }
    }

    // Characters Only
    if (!pattenMatch(inputValue, letters)) {
        spanMessageContainer.textContent = 'Only Charachters are allowed!'
        wrongMsgLine.style = "display:block"
        isNameCorrect = false;
        return 0;
    }

    wrongMsgLine.style = "display:none";
    isNameCorrect = true;
});

// Everything is OK
letsPlayBtn.addEventListener('click', function (e) {
    if (!isNameCorrect) {
        e.preventDefault();
    }
});

