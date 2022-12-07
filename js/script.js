const playButton = document.getElementById('play_button')

playButton.addEventListener ('click', function(){
    let diff = document.getElementById('difficulty').value
    console.log("Difficoltà: " + diff)
    let max = 0;
    let grid = document.getElementById('grid');
    let squareType
    
    if (diff == "easy" ){
        max = 100
        squareType = 'square_easy'
    }

    else if (diff == "medium"){
        max = 81
        squareType = 'square_medium'
    }
    else {
        max = 49
        squareType = 'square_hard'
    }

    console.log("Numero quadrati: " + max)

    for (let i = 0; i < max; i++) {
        const square = createGridSquare()
        grid.appendChild(square)
        square.addEventListener ('click', function(){
            this.classList.add ('clicked')
            console.log("Hai cliccato il quadratino numero " + (i + 1))
        })
    };

    function createGridSquare() {
        const element = document.createElement ('div');
    
        element.classList.add ('square', squareType);
    
        return element;
    };
})



