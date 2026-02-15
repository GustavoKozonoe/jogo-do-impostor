import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { GameType } from './interfaces/game-type.enum';
import { ItoComponent } from './games/ito/ito.component';
import { ImpostorGameComponent } from './games/impostor-game/impostor-game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    FormsModule,
    ItoComponent,
    ImpostorGameComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit {
  title = 'Jogo do Impostor';
  isGameStarted = false;
  players: string[] = [];
  playerName: string = '';
  type: GameType = GameType.None;

  ngOnInit() {
    document.addEventListener(
      'gesturestart',
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );

    document.addEventListener(
      'touchmove',
      function (e: any) {
        if (e.scale !== 1) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }

  addPlayer() {
    this.players.push(this.playerName);
    this.playerName = '';
  }

  removePlayer(playerIndex: number) {
    this.players.splice(playerIndex, 1);
  }

  receivePlayers(players: string[]) {
    this.players = players;
  }

  startGame(type: number) {
    this.type = type;
    if (type == GameType.Ito) {
      this.title = 'ITO';
    }
    this.isGameStarted = true;
  }
}
