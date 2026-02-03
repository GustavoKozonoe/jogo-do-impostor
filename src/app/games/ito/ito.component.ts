import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ItoPlayer } from '../../interfaces/ito-player.interface';
import { itoThemes } from '../../shared/themes/itoThemes';
import { GameControlsComponent } from '../../shared/components/game-controls/game-controls.component';
import { GameUsedThemesComponent } from '../../shared/components/game-used-themes/game-used-themes.component';
import { GameSwipeRevealComponent } from '../../shared/components/game-swipe-reveal/game-swipe-reveal.component';
import { GameFlipCardComponent } from '../../shared/components/game-flip-card/game-flip-card.component';
import { ItoRankingRevealComponent } from './components/ito-ranking-reveal/ito-ranking-reveal.component';

@Component({
  selector: 'app-ito',
  standalone: true,
  imports: [
    CommonModule,
    GameControlsComponent,
    GameUsedThemesComponent,
    GameSwipeRevealComponent,
    GameFlipCardComponent,
    ItoRankingRevealComponent,
  ],
  templateUrl: './ito.component.html',
})
export class ItoComponent implements OnInit {
  @Input({ required: true }) players: string[] = [];

  private availableThemes = [...itoThemes];

  playersDict: ItoPlayer[] = [];

  pickedTheme = '';
  usedThemes: string[] = [];
  usedThemesLabel = '';

  index = 0;
  isRevealed = false;

  showRanking = false;
  isEnding = false;
  sortedPlayers: ItoPlayer[] = [];

  ngOnInit(): void {
    this.startGame();
  }

  get currentPlayer(): ItoPlayer | undefined {
    return this.playersDict[this.index];
  }

  get isFirstPlayer(): boolean {
    return this.index === 0;
  }

  get isDone(): boolean {
    return this.index >= this.playersDict.length - 1;
  }

  get getItoColorClass(): string {
    if (this.currentPlayer === undefined || this.currentPlayer === null)
      return '';

    if (this.currentPlayer.itoNumber <= 20) return 'ito-low';
    if (this.currentPlayer.itoNumber <= 40) return 'ito-mid-low';
    if (this.currentPlayer.itoNumber <= 60) return 'ito-mid';
    if (this.currentPlayer.itoNumber <= 80) return 'ito-mid-high';
    return 'ito-high';
  }

  nextPlayer(): void {
    if (this.isDone || this.isRevealed) return;

    this.index++;
    this.resetViewState();
  }

  previousPlayer(): void {
    if (this.isFirstPlayer) return;

    this.index--;
    this.resetViewState();
  }

  restartGame(): void {
    this.registerUsedTheme();
    this.startGame();
  }

  reveal(): void {
    this.isRevealed = true;
  }

  hide(): void {
    this.isRevealed = false;
  }

  showFinalRanking(): void {
    this.sortedPlayers = [...this.playersDict].sort(
      (a, b) => a.itoNumber - b.itoNumber,
    );

    this.isEnding = true; // começa o fade-out

    setTimeout(() => {
      this.showRanking = true; // ranking entra após 300ms
    }, 300);
  }

  private startGame(): void {
    this.setupPlayers();
    this.index = 0;
    this.isRevealed = false;
    this.showRanking = false;
    this.isEnding = false;
    this.pickedTheme = this.pickRandom(this.availableThemes);
  }

  private setupPlayers(): void {
    const numbers = this.generateUniqueRandoms(this.players.length);

    this.playersDict = this.players.map((player, i) => ({
      player,
      itoNumber: numbers[i],
    }));
  }

  private registerUsedTheme(): void {
    this.usedThemes.push(this.pickedTheme);

    this.availableThemes = this.availableThemes.filter(
      (t) => !this.usedThemes.includes(t),
    );

    this.usedThemesLabel = this.usedThemes.join(', ');
  }

  private resetViewState(): void {
    this.isRevealed = false;
  }

  private pickRandom<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
  }

  private generateUniqueRandoms(count: number, min = 1, max = 100): number[] {
    if (max - min + 1 < count) {
      throw new Error('Range pequeno demais para valores únicos');
    }

    const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers.slice(0, count);
  }
}
