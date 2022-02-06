//ANIMAÇÃO DE EMOJI
addEventListener('load',AnimaVeia)
function AnimaVeia(){
    let veia = document.querySelector('#veia');
    let veiaEmoji = `&#128117;&#127997;`
    let veioEmoji = `&#128116;&#127996;`
  
    setInterval(trocaVeios, 2000) 
    function trocaVeios(){
        veia.innerHTML = veioEmoji;
    }
    setInterval(trocaVeios2, 4000)
    function trocaVeios2(){
        veia.innerHTML = veiaEmoji
    }
}
// DADOS INICIAIS - Initial Data
    let square = {
        a1:'', a2:'', a3:'',

        b1:'', b2:'', b3:'',

        c1:'', c2:'', c3:'',

    };
    let player = '';
    let warning = '';
    let playing = false;

    reset();
    
// EVENTOS - Events
    document.querySelector('.reset').addEventListener('click', reset);
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', itemClick);
    })

// FUNÇÕES - Functions
    function itemClick(event){
        //console.log(event.target);
        let item = event.target.getAttribute('data-item');
        //console.log('click ' + item)
        if(playing && square[item] === ''){
            square[item] = player
            renderSquare();
            togglePlayer();
        }
    }

    function reset(){
        warning = '';
        
        let random = Math.floor(Math.random() * 2);
        player = (random === 0) ? 'X' : 'O';

        for(let i in square){
            square[i] = '';
        }

        playing = true;

        renderSquare();
        renderInfo();
    }
    function renderSquare(){
         for(let i in square){
             //console.log('ITEM: ',i)
             let item = document.querySelector(`div[data-item=${i}]`);
             //condicao
                 item.innerHTML = square[i];
         }

         checkGame();
    }
    function renderInfo(){
         document.querySelector('.vez').innerHTML = player;
         document.querySelector('.resultado').innerHTML = warning;
    }
    function togglePlayer(){
        player = (player === 'X') ? 'O' : 'X';
        renderInfo();
    }
    function checkGame(){
        if(checkWinnerFor('X')){
            warning = '"X" venceu';
            playing = false;
        }
        else if(checkWinnerFor('O')){
            warning = '"O" Venceu';
            playing = false;
        }
        else if(isFull()){
            warning = 'Empate'
            playing = false;
        }
    }
    function checkWinnerFor(player){
        let posibility = [
            'a1,a2,a3',
            'b1,b2.b3',
            'c1,c2,c3',

            'a1,b1,c1',
            'a2,b2,c2',
            'a3,b3,c3',

            'a1,b2,c3',
            'a3,b2,c1',
        ];
        for(let w in posibility){
            let pArray = posibility[w].split(','); //a1,a2,a3
                let hasWon = pArray.every(option => square[option] === player);
                if(hasWon){
                    return true;
                }
                // if(square[option] === player){
                //     return true;
                // }
                // else{
                //     return false;
                // }
        }
        return false;

    }
    function isFull(){
        for(let i in square){
            if(square[i] === ''){
                return false;
            }
        }
        return true;
    }