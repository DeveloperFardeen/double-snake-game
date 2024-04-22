document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
  
    const gridSize = 20;
    let snake1 = [{ x: 5, y: 5 }];
    let snake2 = [{ x: 15, y: 15 }];
    let food = { x: 10, y: 10 };
    let direction1 = 'right';
    let direction2 = 'left';
  
    function draw() {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw Snake 1
      ctx.fillStyle = '#2ecc71'; // Green
      snake1.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
      });
  
      // Draw Snake 2
      ctx.fillStyle = '#3498db'; // Blue
      snake2.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
      });
  
      // Draw Food
      ctx.fillStyle = '#e74c3c'; // Red
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }
  
    function update() {
      // Move Snake 1
      moveSnake(snake1, direction1);
  
      // Move Snake 2
      moveSnake(snake2, direction2);
  
      // Check for collision between snakes
      if (checkCollision(snake1, snake2)) {
        alert('Game Over! Snakes collided!');
        resetGame();
        return;
      }
  
      // Check for collision with walls or itself for Snake 1
      if (checkCollisionWithWallsOrSelf(snake1)) {
        alert('Game Over! Snake 1 collided with walls or itself!');
        resetGame();
        return;
      }
  
      // Check for collision with walls or itself for Snake 2
      if (checkCollisionWithWallsOrSelf(snake2)) {
        alert('Game Over! Snake 2 collided with walls or itself!');
        resetGame();
        return;
      }
  
      // Check for collision with food for Snake 1
      if (checkCollisionWithFood(snake1, food)) {
        // Generate new food at random position
        generateFood();
      } else {
        // If no collision with food, remove the last segment of Snake 1
        snake1.pop();
      }
  
      // Check for collision with food for Snake 2
      if (checkCollisionWithFood(snake2, food)) {
        // Generate new food at random position
        generateFood();
      } else {
        // If no collision with food, remove the last segment of Snake 2
        snake2.pop();
      }
    }
  
    function moveSnake(snake, direction) {
      const head = { ...snake[0] };
  
      switch (direction) {
        case 'up':
          head.y -= 1;
          break;
        case 'down':
          head.y += 1;
          break;
        case 'left':
          head.x -= 1;
          break;
        case 'right':
          head.x += 1;
          break;
      }
  
      snake.unshift(head);
    }
  
    function checkCollision(snake1, snake2) {
      return snake1.some(segment1 =>
        snake2.some(segment2 =>
          segment1.x === segment2.x && segment1.y === segment2.y
        )
      );
    }
  
    function checkCollisionWithWallsOrSelf(snake) {
      const head = snake[0];
  
      return (
        head.x < 0 || head.x >= canvas.width / gridSize ||
        head.y < 0 || head.y >= canvas.height / gridSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
      );
    }
  
    function checkCollisionWithFood(snake, food) {
      return snake[0].x === food.x && snake[0].y === food.y;
    }
  
    function generateFood() {
      food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
      };
    }
  
    function resetGame() {
      snake1 = [{ x: 5, y: 5 }];
      snake2 = [{ x: 15, y: 15 }];
      food = { x: 10, y: 10 };
      direction1 = 'right';
      direction2 = 'left';
    }
  
    function gameLoop() {
      update();
      draw();
    }
  
    document.addEventListener('keydown', function (event) {
      switch (event.key) {
        // Snake 1 controls
        case 'ArrowUp':
          direction1 = 'up';
          break;
        case 'ArrowDown':
          direction1 = 'down';
          break;
        case 'ArrowLeft':
          direction1 = 'left';
          break;
        case 'ArrowRight':
          direction1 = 'right';
          break;
  
        // Snake 2 controls
        case 'w':
          direction2 = 'up';
          break;
        case 's':
          direction2 = 'down';
          break;
        case 'a':
          direction2 = 'left';
          break;
        case 'd':
          direction2 = 'right';
          break;
      }
    });
  
    setInterval(gameLoop, 100); // Run the game loop every 100 milliseconds
  });
  