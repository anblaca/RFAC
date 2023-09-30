const sentence = ['la', 'comida', 'esta','en', 'la', 'mesa'];
const maxLettersPast = 5;
const game = document.getElementById('game');
const PORT = 5000;

const state = {
    secret: sentence,
    grid: Array(6).fill().map(() => Array(sentence.length).fill('')),
    imagesLoaded: false,
    currentRow: 0,
    currentCol: 0,
    currentWord: '',
    won: false,
    lost: false,
};

async function loadImages(cb) {
    const url = new URL(`http://localhost:${PORT}/loadImages`)
    let response = await fetch(url, {
        method: "post",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    } )
    let res = await response.json();
    state.secret = res.prompt.split(' ');
    state.grid = Array(6).fill().map(() => Array(state.secret.length).fill(''))
    console.log(state.secret);
    loadWeb(JSON.parse(res.imagesLoaded));
    cb()
}

function loadWeb(images){
    const imageDiv = document.getElementById('images');
    console.log(typeof(images))
    for(let i = 0; i < 3; i++){
        let img = document.createElement('img');
        img.src = images[i]
        console.log(images[i])
        img.style = "width: 200px; height: 200px;";
        img.className = "image";
        imageDiv.appendChild(img);
    }
    state.imagesLoaded = true;
}
function updateGrid(){

    
        for(let i = 0; i < state.grid.length; i++){
            for(let j = 0; j < state.grid[i].length; j++){
                const box = document.getElementById(`box${i}${j}`)
                box.textContent = state.grid[i][j];
            }
        }

    
}


function loading(){
    const theme = document.getElementById('theme');
    const p = document.createElement('p');
    p.className = 'message';
    p.textContent = 'Creando imagenes...'
    theme.appendChild(p)
}
function drawGrid(){
    game.removeChild(document.getElementById('theme'));
    const grid = document.createElement('div');
    grid.className = 'grid';
    grid.style = `grid-template-columns: repeat(${state.secret.length}, auto);`

    for(let i = 0; i < 6; i++){
        for(let j = 0; j < state.secret.length; j++){
            drawBox(grid, i, j);
        }
    }

    game.appendChild(grid);
}
function drawBox(grid, row, column, letter = ''){
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${column}`
    box.textContent = letter;
    box.style = `width: ${state.secret[column].length + 3}rem`

    grid.appendChild(box);
    return box;
}

function registerKeyBoardEvents(){
    document.body.onkeydown = (e) => {
        const key = e.key;
        if(key === 'Enter'){
            if(state.currentCol === state.secret.length-1){
                const sentence = getCurrentSentence();
                isSentenceValid(sentence).then(valid => {
                    if(valid == true){
                        revealSentence(sentence);
                        state.currentRow++;
                        state.currentCol = 0;
                        state.currentWord = "";
                    } else {
                        revealWrongSentence(valid)
                    }
                })
            }
        }
        if(key === 'Backspace') remove();
        if(key == ' '){
            addWord();
            state.currentWord = '';
        }
        if(isLetter(key)) addLetter(key);
        updateGrid();
    }
}

function getCurrentSentence(){
    return state.grid[state.currentRow].reduce((prev, curr) => prev + " " + curr);
}

async function isSentenceValid(sentence){
    if(state.currentCol !== state.secret.length-1) return;
    const url = new URL(`http://localhost:${PORT}/check`)
    let response = await fetch(url, {
            method: "post",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({sentence})
        })
    let res = await response.json()

    if(!res.valid.includes(false)) return true;
    
    return res.valid;
}


function revealSentence(guess){
    const row = state.currentRow;
    const animation_duration = 500;
    for(let i = 0; i < state.secret.length; i++){
        const box = document.getElementById(`box${row}${i}`)
        const word = box.textContent;

        setTimeout(() => {
            if(word.toUpperCase() === state.secret[i].toUpperCase()){
                box.classList.add('right');
            } else if(state.secret.map(function(x){return x.toUpperCase()}).includes(word.toUpperCase())){
                box.classList.add('wrong');
            } else{
                box.classList.add('empty');
            }
        }, (i * animation_duration) / 2);

        box.classList.add('animated');
        box.style.animationDelay = `${(i * animation_duration) / 2}ms`;
    }


    console.log(guess.toUpperCase() == state.secret.join(' ').toUpperCase());
    const isWinner = guess.toUpperCase() == state.secret.join(' ').toUpperCase();
    const isGameOver = state.currentRow === 5;

    setTimeout(() => {
        if(isWinner){
            state.won = true;
            endGame(true);
            
        }
        else if(isGameOver){
            state.lost = true;
            endGame(false);
        } 
    }, 3 * animation_duration);

    

}

function endGame(won){
    const mesDiv = document.createElement('div');
    mesDiv.classList.add('finalDiv');
    const butDiv = document.createElement('div');
    butDiv.classList.add('finalDiv');
    const message = document.createElement('p');
    if(won) message.textContent = "¡Felicididades, has ganado!"
    else message.textContent = `La frase era: ${state.secret.join(' ')}`
    message.classList.add('message');
    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = "Reiniciar"
    button.addEventListener('click', () => window.location.reload());

    mesDiv.appendChild(message);
    butDiv.appendChild(button);
    game.appendChild(mesDiv);
    game.appendChild(butDiv);
}
function revealWrongSentence(valid){
    // false, true, true, false, false
    const row = state.currentRow;
    const animation_duration = 500;
    for(let i = 0; i < state.secret.length; i++){
        const box = document.getElementById(`box${row}${i}`)
        setTimeout(() => {
            if(!valid[i]){
                box.classList.add('error');
            }
        }, (i * animation_duration) / 2);

        box.classList.add('animated');
        box.style.animationDelay = `${(i * animation_duration) / 2}ms`;
    }
}

function isLetter(key){
    return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter){
    if(state.currentCol === state.secret.length || state.won || state.lost) return;
    let lengthSecretWord = state.secret[state.currentCol].length;
    if(state.currentWord.length >= lengthSecretWord + maxLettersPast) return;
    state.currentWord += letter;
    state.grid[state.currentRow][state.currentCol] = state.currentWord;
}

function addWord(){
    if(state.currentCol === state.secret.length || state.won || state.lost) return;
    state.grid[state.currentRow][state.currentCol] = state.currentWord;
    state.currentCol++;
}

function remove(){
    if(state.currentWord === '' && state.currentCol === 0) return;
    if(state.currentWord === ''){
        state.currentCol--;
        state.currentWord = state.grid[state.currentRow][state.currentCol];
    } else {
        state.currentWord = state.currentWord.slice(0, -1);
        state.grid[state.currentRow][state.currentCol] = state.currentWord;
        const box = document.getElementById(`box${state.currentRow}${state.currentCol}`);
        box.classList.remove('error');
    }
    
}


function startup(){
    loading()
    loadImages(() => {
        drawGrid();
        registerKeyBoardEvents();
    });
    // while(!state.imagesLoaded)
    // if(state.imagesLoaded) 
    // else{
    //     drawGrid();
    //     registerKeyBoardEvents();
    // } 

}

startup()