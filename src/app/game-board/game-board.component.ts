import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  width = 2;
  height = 2;
  board = [];
  enemyCount = 0;
  enemyPlaceCount = 0;
  hero = {
    x: 0,
    y: 0
  }
  gameOver = false;
  heroMoveCount = 0;
  initialStart = true;
  submitted = false;
  gameStarted = false;

  constructor() { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (!this.gameOver) {
      if (event.key === "ArrowLeft") {
        this.moveHeroPosition(-1, 0)
      }
      if (event.key === "ArrowRight") {
        this.moveHeroPosition(1, 0)
      }
      if (event.key === "ArrowUp") {
        this.moveHeroPosition(0, -1)
      }
      if (event.key === "ArrowDown") {
        this.moveHeroPosition(0, 1)
      }
    }
  }


  ngOnInit() {
    //this.gameStart();
  }
  gameRestart() {
    this.gameOver = false;
    this.initialStart = true;
    this.gameStarted = false;
    this.submitted = false;
  }
  gameStart() {
    if (this.width < 2 || this.height < 2) {
      this.submitted = true;
      return '';
    } else {
      console.log(this.width + '----------------------')
      this.initialStart = false
      this.gameOver = false;
      this.board = [];
      this.enemyCount = this.enemyPlaceCount = this.height;
      console.log(this.enemyCount)
      this.heroMoveCount = 0
      this.hero = {
        x: Math.floor(this.width/2),
        y: Math.floor(this.height/2)
      }
      for (var i = 0; i < this.height; i++) {
        var widthBox = []
        for (var j = 0; j < this.width; j++) {
          widthBox.push({
            id: '' + i + j,
            width: j,
            height: i,
            isEnemy: false,
            isHero: false,
          })
        }
        this.board.push(widthBox);
        this.getEnemy(Math.floor((Math.random() * 10) % this.width), i)
      }
      console.log(this.board)
      this.submitted = false
      this.gameStarted = true
      this.initialStart = false
    }

  }
  getEnemy(x, y) {
    console.log(x, y)
    console.log(this.board)
    if (this.enemyPlaceCount > 0) {
      if (this.hero.x != x || this.hero.y != y) {
        this.board[y][x].isEnemy = true;
        this.enemyPlaceCount--;
      } else {
        let xp = x < (this.width-1) ? (x + 1) : (x - 1);
        console.log(xp)
        this.board[y][xp].isEnemy = true;
        this.enemyPlaceCount--;
      }
    }
  }
  moveHeroPosition(x, y) {
    var moveX = this.hero.x + x, moveY = this.hero.y + y;
    console.log(moveX, moveY)
    if ((moveX >= 0) && (moveX <= (this.width - 1)) && (moveY <= (this.height - 1)) && moveY >= 0) {
      if (this.board[moveY][moveX].isEnemy) {
        this.board[moveY][moveX].isEnemy = false;
        this.enemyCount--;
      }
      this.heroMoveCount++
      this.hero.x = moveX;
      this.hero.y = moveY;
      console.log(this.enemyCount)
      if (this.enemyCount === 0) {
        this.gameOver = true;
        this.gameStarted = false;
        this.initialStart = false;
      }
    }
  }
}

