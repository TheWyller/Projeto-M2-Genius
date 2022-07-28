
const header = document.getElementById("header");
const nomeJogo = document.createElement("h1");
nomeJogo.id = "nomeJogo";
nomeJogo.innerText = "GENIUS";
const img = document.createElement("img");
img.id = "img";
img.src = "./src/img/logo-estrela.png";
img.alt = 'Logo da empresa Brinquedos Estrela'
header.appendChild(nomeJogo);
header.appendChild(img);


function createModal(){
    let modal = document.querySelector('.modal')
    let titleCreate = document.createElement('h1')
    titleCreate.innerText = 'GENINUS'
    removeModal()
    let img = document.createElement('img')
    img.src = './src/img/logo-estrela.png'
    img.alt = 'Logo da empresa Brinquedos Estrela'

    modal.appendChild(titleCreate)
    createForm()
    modal.appendChild(img) 
}

createModal()

function removeModal(){
    let modal = document.querySelector('.modal')
    modal.classList.add('modal--hide')
}

function createForm(){
    let createForm = document.createElement('form')
    createForm.classList.add('modal-form')
    
    let title = document.createElement('h2')
    title.innerText = 'Seja bem vindo ao GENIUS'

    let label = document.createElement('label')
    label.setAttribute('for','name')
    
    let input = document.createElement('input')
    input.setAttribute('type','text')
    input.setAttribute('name','nome')
    input.setAttribute('placeholder','Digite seu nome')
    input.id = 'nome'
    
    let buttonStart = document.createElement('button')
    buttonStart.innerText = 'Start'

    document.querySelector('.modal').appendChild(createForm)
    createForm.appendChild(title);
    createForm.appendChild(label);
    createForm.appendChild(input);
    createForm.appendChild(buttonStart);
}



for(let i = 0; i < 4; i++){
    let botao = document.createElement('button');
    botao.innerText =(i+1);
    botao.id = i+1;
    botao.classList.add("bottom");
    botao.classList.add("bottom"+(i+1));
    document.querySelector('.game').appendChild(botao);
}

let botao = document.createElement('div');
botao.classList.add("bottom");
botao.classList.add("infos");
document.querySelector('.game').appendChild(botao);

function createBtnStart(){
    let start = document.createElement('button');
    start.innerText ='start';
    start.id = 'start';
    document.querySelector('.infos').appendChild(start);
}
createBtnStart()
function removeBtnStart(){
    let button = document.getElementById('start');
    button.remove();
}


let mensagem = document.createElement('p');
document.querySelector('.infos').appendChild(mensagem);

let placar = document.createElement('span');
document.querySelector('.infos').appendChild(placar);


let count = 2;
let score = 0;
let randomArray = [];
let userArray = [];

function randomArrFourNum(count){
    let array = [];
    for(let i = 0; i<count; i++){
        let randNum = Math.floor((Math.random()*4)+1);
        array.push(randNum);
    }
    return array
}


let positionRandomArray = 0;
let timer = 0;


function mensagens(){
    mensagem.innerText ='Prepare-se!!!';

    setTimeout(function(){
        mensagem.innerText =''
    },900)

    setTimeout(function(){
        mensagem.innerText ='Aguarde acender ' +count+' botões';
    },901)

    // setTimeout(function(){
    //     mensagem.innerText ='';
    // },timer-250*count)
    
    // setTimeout(function(){
    //     mensagem.innerText ='Sua vez, seja rápido!!!';
    // },timer-249*count)
    // setTimeout(function(){
    //     mensagem.innerText ='';
    // },timer + 500*count)
}


function turnOnOffLight(){
    //userArray = [];
    
    let turnOnOff = setInterval(function(){
            let numberRandom = randomArray[positionRandomArray];
            let activeButton = document.getElementById(numberRandom);
            activeButton.classList.toggle('active'+numberRandom);
            setTimeout(function(){activeButton.classList.toggle('active'+numberRandom)},800)
            positionRandomArray++
        if(positionRandomArray === randomArray.length){
            clearInterval(turnOnOff)
            grabClick()
                setTimeout(function(){
                    mensagem.innerText ='';
                },850)
                setTimeout(function(){
                    mensagem.innerText ='Sua vez, seja rápido!!!';
                },855)
                
        }
    },1000)
}

function receiveClickUser(event){
    let num = event.target.id;
    userArray.push(parseInt(num));
}

function compareArray(){
    let countCompare = 0;
    for(let i = 0; i<count; i ++){
        if(userArray[i] === randomArray[i]){
            countCompare++
        }
    }
    if(countCompare === count){
        return true
    }
    return false
}


let positionUserArray = 0;


function grabClick(){
    
   let click = setInterval(function(){
        let receive = document.querySelector('.game');
        receive.addEventListener('click',receiveClickUser);
        userArray = [];
        positionUserArray++
        if(positionUserArray === randomArray.length){
            //grabClick()
            clearInterval(click)

            
            // setTimeout(() => {
            //     mensagem.innerText = '';
            //     mensagem.innerText = '5'; 
            //  }, 855);
             setTimeout(() => {
                mensagem.innerText = '';
                mensagem.innerText = '4'; 
             }, 1855);
             setTimeout(() => {
                mensagem.innerText = '';
                mensagem.innerText = '3'; 
             }, 2855);
             setTimeout(() => {
                mensagem.innerText = '';
                mensagem.innerText = '2'; 
             }, 3855);
             setTimeout(() => {
                mensagem.innerText = '';
                mensagem.innerText = '1'; 
             }, 4855);
             setTimeout(() => {
                mensagem.innerText = '';
             }, 5000);

            setTimeout(() => {
               winOrNot() 
            }, 5500);

            //console.log('acabou')
        }
    },100)
}

function clean(){
    positionUserArray = 0;
    positionRandomArray = 0;
    randomArray = [];
    randomArray = randomArrFourNum(count)
    timer = 1800*count
}


function winOrNot(){

    // clean()
    // turnOnOffLight()
    // grabClick()
    
    setTimeout(function(){   
        if(compareArray() === false){
            
            if(count > score){
                score = count-1;
                placar.innerText ='Seu maior placar é:  '+score+' rodadas';
            }
            
            alert('PERDEU! Demorou ou errou a sequência. \nSua pontuação foi ' + (count-1) +' rodadas');
            count = 2;
            createBtnStart()
            start.innerText= 'restart';
            startEverything()
        }else{
            count++
            alert('ACERTOU, MIZERAVI!')
            clean()
            turnOnOffLight()
            mensagens()
        }},1)
        // }},timer + 500*count)
    
}


function startEverything(){
    let inicia = document.getElementById('start');
    
    inicia.addEventListener('click',function(){
        removeBtnStart()
        clean()
        turnOnOffLight()
        // winOrNot()
        mensagens()
    })
}

startEverything()

