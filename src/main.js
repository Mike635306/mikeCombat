const wallet = document.querySelector('.main_wallet-cash');
const main_tap = document.querySelector('.main_tap');
const lvl_progress = document.querySelector('.level_progress');
const lvl_counter = document.querySelector('#lvl_counter');
const energy_count =  document.querySelector('#energy-count');
const create_acc = document.querySelector('#create_acc');
const username = document.querySelector('#username');
const game_auth = document.querySelector('.game_auth');

//Данные про прогресс
const data = {
    
     name:'',     //Ваше имя
     profit_per_hour:1,  //Прибыль за час
     money:0,            //Сумма
     profit_per_tap:1 ,   //Прибыль за каждый тап
     level:0,            //Уровень
     level_progress:0,    //Прогресс
     energy:1000
}

function createAccount(e){
 data.name = username.value
let currentUsername = document.querySelector('#current_username');
currentUsername.innerText = data.name;
game_auth.style.display = 'none';
e.preventDefault()
}







function minerPerHour(){
   
    let money_interval = setInterval(function(){
           
        data.money += data.profit_per_hour; //Каждую секунду зачисляем по монете 
        wallet.innerHTML = data.money;  //Выводим сумму

    },1000)

}

function handleTap(e){
     
   data.energy -= 1
   energy_count.innerHTML = data.energy;

    data.money += data.profit_per_tap + data.level;
    wallet.innerHTML = data.money;
    
    main_tap.style.animation = 'taping 0.3s 1'
    
    let img = document.createElement('img');
    img.src = './img/hamster_coin.png'
    img.classList.add('tap-money');
     
    let x = e.clientX
    let y = e.clientY

    main_tap.appendChild(img);
 
    let timeOut = setTimeout(function(){
        img.remove()
    },1000)




    let time = setTimeout(function(){
        main_tap.style.animation = 'none';
        clearInterval(time);
    },300)
     
  
    if(data.level_progress <= 100){
        data.level_progress += 1;
        lvl_progress.style.width = data.level_progress + '%';   
    }else{
        data.level_progress = 0;
        lvl_progress.style.width = data.level_progress+ '%';
        data.level += 1;
        lvl_counter.innerHTML = data.level;
    }

  

}

function energyRecovery(){
  
    
      if(data.energy<1000){
        data.energy += 1
         energy_count.innerHTML = data.energy;
      }else{
         return
      }
   
}




//Вызовы функции

minerPerHour(); //Данная функция включает на фоне майнинг
setInterval(() => {
    energyRecovery()
}, 2000);


//События
main_tap.addEventListener('click',handleTap); //Событие клика по кнопке майнинга


create_acc.addEventListener('click',createAccount)
