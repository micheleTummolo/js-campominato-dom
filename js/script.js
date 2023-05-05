const playButton = document.getElementById('play_button')

let best = 0
let currentScore

playButton.addEventListener('click', function () {

    let diff = document.getElementById('difficulty').value
    console.log("Difficoltà: " + diff)
    let max = 0;
    let grid = document.getElementById('grid');
    let squareType

    grid.innerHTML = ""

    if (diff == "easy") {
        max = 100
        squareType = 'square_easy'
    }

    else if (diff == "medium") {
        max = 81
        squareType = 'square_medium'
    }
    else {
        max = 49
        squareType = 'square_hard'
    }

    console.log("Numero quadrati: " + max)

    let bombs = arrayBomb(1, max)
    console.log(bombs)

    let gameOver = document.getElementById('game_over_container')
    let win = document.getElementById('win_container')

    gameOver.classList.remove('active')
    gameOver.classList.add('inactive')

    win.classList.add('inactive')
    win.classList.remove('active')

    grid.classList.remove('event-none')

    let score = document.getElementById('score')
    let bestScore = document.getElementById('best_score')
    let counter = 0
    score.innerHTML = ("Score: " + counter)

    for (let i = 0; i < max; i++) {
        const square = createGridSquare()
        grid.appendChild(square)
        let h2 = document.getElementsByTagName('h2')
        h2[i].setAttribute("id", i + 1)
        console.log(h2[i].id)
        square.addEventListener('click', function () {
            if (bombs.includes(i + 1)) {
                this.classList.add('red')
                grid.classList.add('event-none')
                console.log("Hai cliccato una bomba")
                gameOver.classList.remove('inactive')
                gameOver.classList.add('active')
                currentScore = counter
                if (currentScore > best) {
                    best = currentScore
                    bestScore.innerHTML = ("Best score: " + best)
                }
            }
            else {
                this.classList.add('clicked')
                console.log("Hai cliccato il quadratino numero " + (i + 1))
                counter += 1
                score.innerHTML = ("Score: " + counter)
                this.classList.add('event-none')
            }

            if (counter == (max - 16)) {
                win.classList.remove('inactive')
                win.classList.add('active')
                currentScore = counter
                if (currentScore > best) {
                    best = currentScore
                    bestScore.innerHTML = ("Best score: " + best)
                }
            }
        })

    };


    function createGridSquare() {
        const element = document.createElement('div');
        const content = document.createElement('h2');

        element.appendChild(content);

        element.classList.add('square', squareType);

        return element;
    };

    function arrayBomb(min, max) {
        let bombs = []
        let i = 0

        while (i < 16) {
            let bombNum = Math.floor(Math.random() * (max - min + 1) + min)

            if (!bombs.includes(bombNum)) {
                bombs.push(bombNum)
                i++
            }
        }

        return bombs
    }
})



