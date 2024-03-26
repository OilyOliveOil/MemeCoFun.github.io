<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snake Game</title>
  <style>
    #game-board {
      border: 1px solid black;
      width: 400px;
      height: 400px;
      margin: auto;
      position: relative;
    }

    .snake, .food {
      width: 20px;
      height: 20px;
      background-color: black;
      position: absolute;
    }

    .food {
      background-color: red;
    }
  </style>
</head>
<body>
  <div id="game-board"></div>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const board = document.getElementById('game-board');
      const boardWidth = board.clientWidth;
      const boardHeight = board.clientHeight;
      const blockSize = 20;
      const maxBlocksX = boardWidth / blockSize;
      const maxBlocksY = boardHeight / blockSize;

      let snake = [{ x: 10, y: 10 }];
      let food = { x: 15, y: 15 };
      let dx = 0;
      let dy = 0;
      let score = 0;
      let gameOver = false;
      
      function draw() {
        board.innerHTML = '';
        drawSnake();
        drawFood();
      }

      function drawSnake() {
        snake.forEach(segment => {
          const snakeElement = document.createElement('div');
          snakeElement.style.gridColumn = `${segment.x} / span 1`;
          snakeElement.style.gridRow = `${segment.y} / span 1`;
          snakeElement.classList.add('snake');
          board.appendChild(snakeElement);
        });
      }

      function drawFood() {
        const foodElement = document.createElement('div');
        foodElement.style.gridColumn = `${food.x} / span 1`;
        foodElement.style.gridRow = `${food.y} / span 1`;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
      }

      function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          score++;
          generateFood();
        } else {
          snake.pop();
        }
      }

      function generateFood() {
        food = {
          x: Math.floor(Math.random() * maxBlocksX) + 1,
          y: Math.floor(Math.random() * maxBlocksY) + 1
        };

        if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
          generateFood();
        }
      }

      function checkGameOver() {
        const head = snake[0];
        if (head.x < 1 || head.x > maxBlocksX || head.y < 1 || head.y > maxBlocksY || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
          gameOver = true;
          clearInterval(gameLoop);
          alert(`Game Over! Your score is ${score}`);
        }
      }

      function handleKeyPress(event) {
        switch (event.key) {
          case 'ArrowUp':
            if (dy !== 1) {
              dx = 0;
              dy = -1;
            }
            break;
          case 'ArrowDown':
            if (dy !== -1) {
              dx = 0;
              dy = 1;
            }
            break;
          case 'ArrowLeft':
            if (dx !== 1) {
              dx = -1;
              dy = 0;
            }
            break;
          case 'ArrowRight':
            if (dx !== -1) {
              dx = 1;
              dy = 0;
            }
            break;
        }
      }

      document.addEventListener('keydown', handleKeyPress);

      const gameLoop = setInterval(() => {
        if (!gameOver) {
          moveSnake();
          checkGameOver();
          draw();
        }
      }, 100);
    });
  </script>
</body>
</html>
