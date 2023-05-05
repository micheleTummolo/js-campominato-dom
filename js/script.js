const playButton = document.getElementById('play_button')

let best = 0
let currentScore

playButton.addEventListener('click', function () {

    let diff = document.getElementById('difficulty').value
    console.log("Difficoltà: " + diff)
    let max = 0;
    let grid = document.getElementById('grid');
    let squareType

    let top = 0
    let bottom = 0
    let left = 0
    let right = 0

    let lines = 0

    let first_column = []
    let last_column = []

    grid.innerHTML = ""

    if (diff == "easy") {
        max = 100
        squareType = 'square_easy'
        top = 9
        bottom = 11
        left = 0
        right = 2

    }

    else if (diff == "medium") {
        max = 81
        squareType = 'square_medium'
        top = 8
        bottom = 10
        left = 0
        right = 2
    }
    else {
        max = 49
        squareType = 'square_hard'
        top = 6
        bottom = 8
        left = 0
        right = 2
    }

    lines = Math.sqrt(max)

    for (y = 1; y <= lines; y++) {
        first_column.push((lines * y) + 1)
        last_column.push(lines * y)
    }

    console.log(first_column)
    console.log(last_column)
    console.log("Numero quadrati: " + max)
    console.log("Numero righe: " + lines)

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

        square.setAttribute("id", "square_" + (i + 1))

        grid.appendChild(square)
        let h2 = document.getElementsByTagName('h2')
        h2[i].setAttribute("id", i + 1)
        /* console.log(h2[i].id) */
        square.addEventListener('click', function () {
            if (bombs.includes(i + 1)) {
                for (let j = 0; j < max; j++) {
                    if (bombs.includes(j + 1)) {
                        document.getElementById("square_" + (j + 1)).classList.add('red')
                    }
                }
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
                let tot_bomb = 0
                if (bombs.includes(i + right) && !last_column.includes(i + 1)) {
                    tot_bomb += 1
                    console.log("Bomba a destra")
                    document.getElementById(i + 1).innerHTML = tot_bomb
                }
                if (bombs.includes(i) && !first_column.includes(i + 1)) {
                    tot_bomb += 1
                    console.log("Bomba a sinistra")
                    document.getElementById(i + 1).innerHTML = tot_bomb
                }
                if (bombs.includes(i + bottom)) {
                    tot_bomb += 1
                    console.log("Bomba sotto")
                    document.getElementById(i + 1).innerHTML = tot_bomb
                }
                if (bombs.includes(i - top)) {
                    tot_bomb += 1
                    console.log("Bomba sopra")
                    document.getElementById(i + 1).innerHTML = tot_bomb
                }
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

        content.classList.add('bomb_true')

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



