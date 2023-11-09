// script.js
// Versão 1.1 - Jogo da Serpente com WASD

const canvas = document.getElementById('snake');
const context = canvas.getContext('2d');
const box = 32;
const snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let direction = 'right';

// Lista de palavras em português e suas correspondentes em inglês
const wordPairs = [
  { portuguese: 'gato', english: 'cat' },
  { portuguese: 'cachorro', english: 'dog' },
  { portuguese: 'maçã', english: 'apple' },
  // Adicione mais palavras conforme necessário
];

let currentWordPair = { x: 0, y: 0 }; // Coordenadas iniciais para a palavra

function chooseRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordPairs.length);
  currentWordPair = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
    word: wordPairs[randomIndex].english, // Adiciona a palavra em inglês
  };
  document.getElementById('portuguese-word').textContent =
    wordPairs[randomIndex].portuguese;
}

chooseRandomWord();

function startGame() {
  snake.length = 0;
  snake[0] = {
    x: 8 * box,
    y: 8 * box,
  };
  direction = 'right';
  document.getElementById('score').textContent = '0';
  chooseRandomWord();
  document.getElementById('gameover-screen').style.display = 'none';
  jogo = setInterval(iniciarJogo, 100);
}

function novoJogo() {
  clearInterval(jogo);
  document.getElementById('gameover-screen').style.display = 'none';
  startGame();
}

const background = new Image();
background.src = 'grass.png';

// Aguarde o carregamento da imagem de fundo antes de prosseguir
background.onload = function() {
  criarBG(); // Chame a função para desenhar o fundo após o carregamento da imagem
};

function criarBG() {
  // Limpe o canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhe a imagem de fundo
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
}

function criarCobrinha() {
    for (let i = 0; i < snake.length; i++) {
      const radius = box / 2;
      const centerX = snake[i].x + radius;
      const centerY = snake[i].y + radius;
  
      if (i === 0) {
        // Desenhe a cabeça da cobra como um quadrado
        context.fillStyle = 'darkgreen';
        context.fillRect(centerX - radius, centerY - radius, box, box);
  
        // Adicione uma língua na boca da cobra
        context.fillStyle = 'red';
        context.beginPath();
        context.moveTo(centerX, centerY + radius / 2);
        context.quadraticCurveTo(
          centerX - radius / 2,
          centerY + radius,
          centerX,
          centerY + radius
        );
        context.quadraticCurveTo(
          centerX + radius / 2,
          centerY + radius,
          centerX,
          centerY + radius / 2
        );
        context.fill();
  
        // Desenhe os olhos
        const eyeRadius = radius / 4;
        const leftEyeX = centerX - radius / 3;
        const rightEyeX = centerX + radius / 3;
        const eyeY = centerY - radius / 3;
  
        context.fillStyle = 'black';
        context.beginPath();
        context.arc(leftEyeX, eyeY, eyeRadius, 0, 2 * Math.PI);
        context.arc(rightEyeX, eyeY, eyeRadius, 0, 2 * Math.PI);
        context.fill();
      } else {
        // Desenhe o corpo da cobra
        let corBase = 40 + i * 5;
        context.fillStyle = `rgb(0, ${corBase}, 0`;
  
        // Calcule as coordenadas do retângulo
        const x = snake[i].x;
        const y = snake[i].y;
        const width = box;
        const height = box;
  
        // Desenhe o retângulo
        context.fillRect(x, y, width, height);
      }
    }
  }
  
  
  
  

  function drawWord() {
    context.fillStyle = 'red';
    context.font = '24px Arial';
  
    const text = currentWordPair.word;
    const textWidth = context.measureText(text).width;
    const textHeight = 24;
    const margin = 10; // Margem de colisão
  
    const boxX = currentWordPair.x - margin;
    const boxY = currentWordPair.y - textHeight - margin;
    const boxWidth = textWidth + 2 * margin;
    const boxHeight = textHeight + 2 * margin;
  
    const borderRadius = 10; // Raio da borda
  
    context.fillStyle = 'lightyellow';
    context.beginPath();
    context.moveTo(boxX + borderRadius, boxY);
    context.lineTo(boxX + boxWidth - borderRadius, boxY);
    context.quadraticCurveTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + borderRadius);
    context.lineTo(boxX + boxWidth, boxY + boxHeight - borderRadius);
    context.quadraticCurveTo(boxX + boxWidth, boxY + boxHeight, boxX + boxWidth - borderRadius, boxY + boxHeight);
    context.lineTo(boxX + borderRadius, boxY + boxHeight);
    context.quadraticCurveTo(boxX, boxY + boxHeight, boxX, boxY + boxHeight - borderRadius);
    context.lineTo(boxX, boxY + borderRadius);
    context.quadraticCurveTo(boxX, boxY, boxX + borderRadius, boxY);
    context.fill();
  
    context.fillStyle = 'red';
    context.fillText(text, currentWordPair.x, currentWordPair.y);
  }
  

document.addEventListener('keydown', update);

function update(event) {
  if ((event.key === 'a' || event.key === 'A') && direction !== 'right')
    direction = 'left';
  if ((event.key === 'w' || event.key === 'W') && direction !== 'down')
    direction = 'up';
  if ((event.key === 'd' || event.key === 'D') && direction !== 'left')
    direction = 'right';
  if ((event.key === 's' || event.key === 'S') && direction !== 'up')
    direction = 'down';
}

function iniciarJogo() {
  for (let i = 1; i < snake.length; i++) {
    if (
      snake[0].x === snake[i].x &&
      snake[0].y === snake[i].y
    ) {
      clearInterval(jogo);
      alert('VOCÊ PERDEU!');
    }
  }

  if (
    snake[0].x + box > currentWordPair.x &&
    snake[0].x < currentWordPair.x + box &&
    snake[0].y + box > currentWordPair.y &&
    snake[0].y < currentWordPair.y + box
  ) {
    // Palavra correta, aumenta a pontuação e escolhe uma nova palavra
    const score = parseInt(
      document.getElementById('score').textContent
    );
    document.getElementById('score').textContent = score + 1;
    chooseRandomWord();
  }

  if (
    snake[0].x >= canvas.width ||
    snake[0].x < 0 ||
    snake[0].y >= canvas.height ||
    snake[0].y < 0
  ) {
    clearInterval(jogo);
    alert('VOCÊ PERDEU!');
  }

  criarBG();
  criarCobrinha();
  drawWord(); // Agora desenha a palavra em inglês

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === 'right') snakeX += box;
  if (direction === 'left') snakeX -= box;
  if (direction === 'up') snakeY -= box;
  if (direction === 'down') snakeY += box;

  if (
    snakeX !== currentWordPair.x ||
    snakeY !== currentWordPair.y
  ) {
    snake.pop();
  }

  const newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);