(function() {
    const questions = [{
        question: "At party, do you?",
        choices: [["Interact with many, including strangers", 'e'], ["Interact with few, known to you", 'i']],
        correctAnswer: 1
    }, {
        question: "Are you more intrigued by?",
        choices: [["Facts", 's'], ["Possibilities", 'n']],
        correctAnswer: 1
    }, {
        question: "Are you more?",
        choices: [["Philosophical", 'n'], ["Realistic", 's']],
        correctAnswer: 0
    }, {
        question: "Are you usually?",
        choices: [["Fair minded", 't'], ["Soft hearted", 'f']],
        correctAnswer: 1
    },{
        question: "Do you want to be?",
        choices: [["Good to others", 'f'], ["Emotionless", 't']],
        correctAnswer: 1
    }, {
        question: "You prefer to work?",
        choices: [["With deadline",'j'], ["With Freewill", 'p']],
        correctAnswer: 1
    }, {
        question: "At parties, do you?",
        choices: [["Leave early", 'i'], ["Stay Late", 'e']],
        correctAnswer: 1
    }, {
        question: "Are you?",
        choices: [["Indecisive", 'p'], ["Quick decision maker", 'j']],
        correctAnswer: 1
    }, {
        question: "Are you more drawn to?",
        choices: [["Facts", 'j'], ["Theories", 'p']],
        correctAnswer: 1
    }, {
        question: "Which is important?",
        choices: [["Justice", 't'], ["Mercy", 'f']],
        correctAnswer: 1
    }, {
        question: "People will describe you as ",
        choices: [["Social Butterfly", 'e'], ["Loner", 'i']],
        correctAnswer: 1
    }, {
        question: "Are you?",
        choices: [["Punctual", 'j'], ["Disorganized", 'p']],
        correctAnswer: 1
    }, {
        question: "You tend to ",
        choices: [["Complete what you started", 'j'], ["Leave things in middle", 'p']],
        correctAnswer: 1
    }, {
        question: "Are you more interested in?",
        choices: [["Logic behind something", 't'], ["Traditional Values", 'f']],
        correctAnswer: 1
    }
    ];

    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
    const pref = []

    // Display initial question
    displayNext();

    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
        e.preventDefault();

        // Suspend click listener during fade animation
        if(quiz.is(':animated')) {
            return false;
        }
        choose();

        // If no user selection, progress is stopped
        if (isNaN(selections[questionCounter])) {
            alert('Please make a selection!');
        } else {
            questionCounter++;
            displayNext();
        }
    });

    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
        e.preventDefault();

        if(quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
        e.preventDefault();

        if(quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });

    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
        $(this).removeClass('active');
    });

    // Creates and returns the div that contains the questions and
    // the answer selections
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }

    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i][0];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // Reads the user selection and pushes the value to an array
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
        pref.push(questions[questionCounter].choices[$('input[name="answer"]:checked').val()][1])

    }

    // Displays next requested element
    function displayNext() {
        quiz.fadeOut(function() {
            $('#question').remove();

            if(questionCounter < questions.length){
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value='+selections[questionCounter]+']').prop('checked', true);
                }

                // Controls display of 'prev' button
                if(questionCounter === 1){
                    $('#prev').show();
                } else if(questionCounter === 0){

                    $('#prev').hide();
                    $('#next').show();
                }
            }else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }

    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
        let type = "";
        var score = $('<p>',{id: 'question'});
        let intro = 0, extro = 0, intu = 0, sens = 0, think = 0, feel = 0, judge = 0, perceive = 0;
        for (let i = 0; i < pref.length; i++){
            console.log(pref[i])
            switch (pref[i]){
                case 'i':
                    intro++;
                    break;
                case 'e':
                    extro++;
                    break;
                case 'n':
                    intu++;
                    break;
                case 's':
                    sens++;
                    break;
                case 't':
                    think++;
                    break;
                case 'f':
                    feel++;
                    break;
                case 'j':
                    judge++;
                    break;
                case 'p':
                    perceive++;
                    break;
            }
        }
        if (intro > extro){
            type += "I"
        }else{
            type += "E"
        }

        if (intu > sens){
            type += "N"
        }else{
            type += "S"
        }

        if (think > feel){
            type += "T"
        }else{
            type += "F"
        }

        if (judge > perceive){
            type += "J"
        }else{
            type += "P"
        }
        score.append("According to your response, you are most likely " + type);
        return score;
    }
})();