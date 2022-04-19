window.addEventListener('load', () => {

    var emptyBoard;
    var player1 = "X";
    var player2 = "O";
    var curPlayer = player1;
    const displayPlayer = document.getElementsByClassName('display_player')[0];
    displayPlayer.innerHTML = curPlayer;
    var winner = false;
    
    var timeSec = 3;
    var time = document.getElementById('timer');

    var ai = false;
    var possible_moves = [];
    var numMap = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' ];

    var score = [0,0];
    const scoreX = document.getElementById('score_x');
    const scoreO = document.getElementById('score_o');

    scoreX.innerHTML = score[0].toString();
    scoreO.innerHTML = score[1].toString();

    var board = [
        ["1","4","7"],
        ["2","5","8"],
        ["3","6","9"]
    ];

    const resetBtn = document.getElementsByClassName('reset')[0];
    const newGameBtn = document.getElementsByClassName('new_game')[0];
    const aiBtn = document.getElementsByClassName('vs_ai')[0];
    const humanBtn = document.getElementsByClassName('vs_human')[0];

    const box1 = document.getElementsByClassName('one')[0];
    const box2 = document.getElementsByClassName('two')[0];
    const box3 = document.getElementsByClassName('three')[0];
    const box4 = document.getElementsByClassName('four')[0];
    const box5 = document.getElementsByClassName('five')[0];
    const box6 = document.getElementsByClassName('six')[0];
    const box7 = document.getElementsByClassName('seven')[0];
    const box8 = document.getElementsByClassName('eight')[0];
    const box9 = document.getElementsByClassName('nine')[0];

    const boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9];
    var tunrs = 0;

    newGameBtn.addEventListener('click', function() {
        newGame();
    });
    resetBtn.addEventListener('click', function() {
        reset();
    });
    aiBtn.addEventListener('click', function(){
        ai = true;
        humanBtn.classList.remove('active');
        this.classList.add('active');
        timeSec = 3;
        curPlayer = player1;
        displayPlayer.innerHTML = curPlayer;
    });
    humanBtn.addEventListener('click', function(){
        ai = false;
        aiBtn.classList.remove('active');
        this.classList.add('active');
        timeSec = 3;
        curPlayer = player1;
        displayPlayer.innerHTML = curPlayer;
    });


    for (var i = 0 ; i < boxes.length; i++) {
        boxes[i].addEventListener('click' , function(event){

            if(winner) {
                alert("The game is over, play new game")
                return;
            }
            
            if(event.target.innerHTML == "X" || event.target.innerHTML == "O") {
                alert("This square has already been picked, choose another one.")
                return;
            }

            const id = event.target.className; // distinguish the square clicked
            //console.log(event.target);


            //event.target.innerHTML = curPlayer; // change the html
            //console.log(curPlayer);
            clickedBox(id, curPlayer); // update the array and check for winner
            
            displayPlayer.innerHTML = curPlayer;
        }) ; 
    }

    function clickedBox(id, player) {


        if(tunrs == 10) {
            return;
        }
        tunrs++;
        if(winner) {
            return;
        }

        console.log(`player ${player}`, id);

        document.querySelectorAll(`.${id} .xo`)[0].innerHTML = curPlayer;
        document.querySelectorAll(`.${id} .xo`)[0].classList.add(curPlayer);

        possible_moves.push(id);

        switch (id) {
            case "one":
                board[0][0] = player;
                // possible_moves.splice(0,1);
                // console.log(possible_moves);
                break;
            case "two":
                board[1][0] = player;
                // possible_moves.splice(1,1);
                // console.log(possible_moves);
                break;
            case "three":
                board[2][0] = player;
                // possible_moves.splice(2,1);
                // console.log(possible_moves);
                break;
            case "four":
                board[0][1] = player;
                // possible_moves.splice(3,1);
                // console.log(possible_moves);
                break;
            case "five":
                board[1][1] = player;
                // possible_moves.splice(4,1);
                // console.log(possible_moves);
                break;
            case "six":
                board[2][1] = player;
                // possible_moves.splice(5,1);
                // console.log(possible_moves);
                break;
            case "seven":
                board[0][2] = player;
                // possible_moves.splice(6,1);
                // console.log(possible_moves);
                break;
            case "eight":
                board[1][2] = player;
                // possible_moves.splice(7,1);
                // console.log(possible_moves);
                break;
            case "nine":
                board[2][2] = player;
                // possible_moves.splice(8,1);
                // console.log(possible_moves);
                break;
            default:
                //console.log("undefined value")
                break;
        }

        checkWin(board);
        console.log(`turn: ${tunrs}`);


        curPlayer = (curPlayer == player1) ? player2 : player1; // swap the player
        displayPlayer.innerHTML = curPlayer;

        // if the last turn was played, stop
        if(tunrs == 9){
            return;
        }

        if (curPlayer == player2 && ai == true) {

            var randId =  Math.floor(Math.random() * 9) + 1;
            var idName = numMap[randId - 1];

            // if the move has been played, pick another one
            while (possible_moves.indexOf(idName) > -1) {
                randId = Math.floor(Math.random() * 9) + 1;
                idName = numMap[randId - 1]
            }

            clickedBox(idName, player2);
        }
    }

    function checkWin(boardCheck) {
        //console.log(board);
            // [ "X", "X", "X"]
            // [ "*", "*", "*"]
            // [ "*", "*", "*"]
            if(boardCheck[0][0] == boardCheck[0][1] && boardCheck[0][0] == boardCheck[0][2]) {
                win(boardCheck[0][0]);
            }
            // [ "*", "*", "*"]
            // [ "X", "X", "X"]
            // [ "*", "*", "*"]
            else if(boardCheck[1][0] == boardCheck[1][1] && boardCheck[1][0] == boardCheck[1][2]) {
                win(boardCheck[1][0]);
            }
            // [ "X", "*", "*"]
            // [ "*", "X", "*"]
            // [ "*", "*", "X"]
            else if(boardCheck[0][0] == boardCheck[1][1] && boardCheck[0][0] == boardCheck[2][2]) {
                win(boardCheck[0][0]);
            }
            // [ "*", "*", "X"]
            // [ "*", "X", "*"]
            // [ "X", "*", "*"]
            else if(boardCheck[2][0] == boardCheck[1][1] && boardCheck[2][0] == boardCheck[0][2]) {
                win(boardCheck[2][0]);
            }
            // [ "X", "*", "*"]
            // [ "X", "*", "*"]
            // [ "X", "*", "*"]
            else if(boardCheck[0][0] == boardCheck[1][0] && boardCheck[0][0] == boardCheck[2][0]) {
                win(boardCheck[0][0]);
            }
            // [ "*", "*", "*"]
            // [ "*", "*", "*"]
            // [ "X", "X", "X"]
            else if(boardCheck[2][0] == boardCheck[2][1] && boardCheck[2][0] == boardCheck[2][2]) {
                win(boardCheck[2][0]);
            }
            // [ "*", "*", "X"]
            // [ "*", "*", "X"]
            // [ "*", "*", "X"]
            else if(boardCheck[0][2] == boardCheck[1][2] && boardCheck[0][2] == boardCheck[2][2]) {
                win(boardCheck[0][2]);
            }
            // [ "*", "X", "*"]
            // [ "*", "X", "*"]
            // [ "*", "X", "*"]
            else if(boardCheck[0][1] == boardCheck[1][1] && boardCheck[0][1] == boardCheck[2][1]) {
                win(boardCheck[0][1]);
            }
            timeSec = 3;
    }

    function reset() {
        score = [0, 0];
        scoreX.innerHTML = score[0].toString();
        scoreO.innerHTML = score[1].toString();
        newGame();
    }

    function newGame() {

        const xo = document.querySelectorAll(`.xo`);
        xo.forEach(thisXO => {
            thisXO.innerHTML = "";
            thisXO.classList.remove('X');
        });
        
        curPlayer = "X";
        displayPlayer.innerHTML = curPlayer;
        document.getElementById("winner").innerHTML = "";
        winner = false;
        board = [
            ["1","4","7"],
            ["2","5","8"],
            ["3","6","9"]
        ];
        tunrs = 0;
        possible_moves = [];
        timeSec = 3;
        clearInterval(timer);
        timer = setInterval(timerCheck, 1000);
    }

    function win(player) {
        winner = true;
        if(player == "X") {
            score[0]++;
        } else if (player == "O") {
            score[1]++;
        }
        scoreX.innerHTML = score[0].toString();
        scoreO.innerHTML = score[1].toString();
        document.getElementById("winner").innerHTML = `${player} wins!`
        clearInterval(timer);
    }

    var timer = setInterval(timerCheck, 1000)

    function timerCheck() {
        if (timeSec <= 0) {
            timeSec = 3;
            time.innerHTML = curPlayer + " was skipped";
            curPlayer = (curPlayer == player1) ? player2 : player1;
            displayPlayer.innerHTML = curPlayer;

            if (curPlayer == player2 && ai == true) {

                var randId =  Math.floor(Math.random() * 9) + 1;
                var idName = numMap[randId - 1];

                // if the move has been played, pick another one
                while (possible_moves.indexOf(idName) > -1) {
                    randId = Math.floor(Math.random() * 9) + 1;
                    idName = numMap[randId - 1];
                }

                clickedBox(idName, player2);
            }

        }
        else {
            time.innerHTML = timeSec;
        }
        timeSec--;
    }

})
