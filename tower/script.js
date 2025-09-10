const analyzeBtn = document.getElementById('analyzeBtn');
const stakeInput = document.getElementById('stake');
const idInput = document.getElementById('accountId');
const resultDiv = document.querySelector('.result');
const timerBar = document.querySelector('.timer-bar');
const timerText = document.querySelector('.timer-text');
const timerContainer = document.querySelector('.timer-bar-container');
const notification = document.querySelector('.notification');

// Шансы сигналов
const weights = {
  1: 40,
  2: 20,
  3: 15,
  4: 10,
  5: 6,
  6: 4,
  7: 3,
  8: 1,
  9: 1,
  10: 0.5
};

// Функция выбора случайного числа с учетом веса
function weightedRandom(obj) {
  let entries = Object.entries(obj);
  let sum = entries.reduce((a,b)=>a+b[1],0);
  let rand = Math.random() * sum;
  let cumulative = 0;
  for(let [num, weight] of entries){
    cumulative += weight;
    if(rand < cumulative) return num;
  }
}

// Правильное склонение слова "постройка"
function getPostroikaText(number) {
  if(number === 1) return "постройку";
  if(number >= 2 && number <= 4) return "постройки";
  return "построек";
}

// Показ уведомления
function showNotification(text){
  notification.innerText = text;
  notification.classList.add('show');
  setTimeout(()=>notification.classList.remove('show'),3000);
}

let cooldown = false;

analyzeBtn.addEventListener('click', ()=>{
  if(cooldown) return; // CD активен

  let stake = stakeInput.value.trim();
  let accountId = idInput.value.trim();
  const idPattern = /^[0-9]{7}$/;

  if(!stake || !accountId){
    showNotification("Заполни все поля!");
    return;
  }
  if(!idPattern.test(accountId)){
    showNotification("ID должен состоять ровно из 7 цифр!");
    return;
  }

  cooldown = true;
  analyzeBtn.disabled = true;

  // Эффект анализа
  resultDiv.innerText = "🔍 Анализирую данные...";
  timerContainer.style.display = 'none';
  timerText.style.display = 'none';

  setTimeout(()=>{
    // Сигнал
    const signal = weightedRandom(weights);
    const text = getPostroikaText(signal);
    resultDiv.innerText = `🚀 Поставь ${signal} ${text}`;

    // Таймер
    timerContainer.style.display = 'block';
    timerText.style.display = 'block';
    let timeLeft = 15;
    timerText.innerText = timeLeft;
    timerBar.style.width = '100%';

    const interval = setInterval(()=>{
      timeLeft -= 0.1; // плавное уменьшение
      if(timeLeft < 0) timeLeft = 0;
      timerText.innerText = Math.ceil(timeLeft);
      timerBar.style.width = (timeLeft/15*100)+'%';
      if(timeLeft <= 0){
        clearInterval(interval);
        cooldown = false;
        analyzeBtn.disabled = false;
      }
    },100);

  }, 2000); // 2 секунды "анализирую"
});
