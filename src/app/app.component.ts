import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { GameLogicComponent } from './components/game-logic/game-logic.component';
import { FormsModule } from '@angular/forms';
import { GameType } from './interfaces/game-type.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    GameLogicComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'Eyes OFF Games';
  isGameStarted = false;
  players: string[] = [
    'Gustavo',
    'Kozonoe',
    'Maricato',
    'Rodrigues',
    'Felipe',
    'Sanger',
    'Weslley',
  ];
  playerName: string = '';
  type: GameType = GameType.None;

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
    this.isGameStarted = true;
  }
}
