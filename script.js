let hangman = {

    question: "",

    answer: "",

    wrong: 0,

    streak: 0,

    language: ["PYTHON", "JAVASCRIPT", "JAVA", "CPP", "RUBY",
        "SQL", "PHP", "CSS", "HTML", "GOLANG", "SWIFT",
        "KOTLIN", "PASCAL", "PERL", "COBOL", "RUST",
        "SOLIDITY", "DELPHI", "REACTJS", "BOOTSTRAP"],

    generateKeyboard: function () {
        for (let i = 0; i < 26; i++) {
            let btn = document.createElement("button");
            btn.className = "btn btn-md btn-primary m-2"
            let currAlpha = String.fromCharCode(65 + i);
            btn.innerHTML = currAlpha;
            btn.id = currAlpha;
            btn.addEventListener("click", () => {
                this.checkStatus(btn.innerHTML);
            });
            document.querySelector(".keyboard").appendChild(btn);
        }
    },

    setQuestion: function () {
        let random = Math.floor(Math.random() * this.language.length);
        this.answer = this.language[random];
        this.question = "_ ".repeat(this.answer.length);
        console.log(this.question, this.answer);
        document.querySelector(".word").innerHTML = this.question;
    },

    replaceCharAt: function (str, char, ind) {
        let prev = str.substr(0, ind);
        let next = str.substr(ind + 1);
        let newStr = prev + char + next;
        return newStr;
    },

    checkStatus: function (guess) {
        let ind = this.answer.indexOf(guess);
        if (ind > -1 && this.answer.lastIndexOf(guess) != ind) {
            while (ind > -1) {
                this.question = this.replaceCharAt(this.question, guess, ind * 2);
                ind = this.answer.indexOf(guess, ind + 1);
            }
        }
        else if (ind > -1) {
            this.question = this.replaceCharAt(this.question, guess, ind * 2);
            console.log("key pressed: ", guess);
        }
        else {
            this.wrong++;
            this.updateWrong(this.wrong);
        }
        document.getElementById(guess).setAttribute("disabled", true);
        document.querySelector(".word").innerHTML = this.question;

        if (this.answer === this.question.replaceAll(' ', '')) {
            this.updateStreak(++this.streak);
            this.isWon(true);
        }
    },

    updateWrong: function (wrong) {
        this.wrong = wrong;
        if (wrong <= 6) {
            document.querySelector(".mistake-count").innerHTML = wrong;
            document.querySelector(".hang-image").src = "asset/hangman" + wrong + ".png"
            if (wrong == 6) {
                this.updateStreak(0);
                this.isWon(false);
            }
        }
    },

    updateStreak: function (streak) {
        this.streak = streak;
        document.querySelector(".streak").innerHTML = streak;
    },

    isWon: function (status) {
        popupWindow.updatePopup(status, this.answer);
        popupWindow.openPopup();
    },

    resetGame: function () {
        hangman.setQuestion();
        document.querySelector(".keyboard").innerHTML = null;
        hangman.generateKeyboard();
        hangman.updateWrong(0);
    }

};

let popupWindow = {
    closePopup: function () {
        document.querySelector(".overlay").style.display = "none";
    },
    openPopup: function () {
        document.querySelector(".overlay").style.display = "block";
    },

    updatePopup: function (status, answer) {
        if (status) {
            document.querySelector(".status").innerHTML = "You Won!!"
        }
        else {
            document.querySelector(".status").innerHTML = "You Lost!!"
        }
        document.querySelector(".answer").innerHTML = answer;
    }
};

hangman.generateKeyboard();
hangman.setQuestion();


document.body.addEventListener("keyup", (event) => {
    if (event.key >= String.fromCharCode(65) && event.key <= String.fromCharCode(90)) {
        hangman.checkStatus(event.key);
    }
    else if (event.key >= String.fromCharCode(97) && event.key <= String.fromCharCode(122)) {
        hangman.checkStatus(event.key.toUpperCase());
    }
});

document.querySelector(".reset").addEventListener("click", () => {
    hangman.resetGame();
});

document.querySelector(".close-btn").addEventListener("click", () => {
    popupWindow.closePopup();
    hangman.resetGame();
});

document.querySelector(".reset-btn").addEventListener("click", () => {
    popupWindow.closePopup();
    hangman.resetGame();
});
