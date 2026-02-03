import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ItoPlayer } from '../../interfaces/ito-player.interface';
import { itoThemes } from '../../shared/themes/itoThemes';
import { GameControlsComponent } from '../../shared/components/game-controls/game-controls.component';
import { GameUsedThemesComponent } from '../../shared/components/game-used-themes/game-used-themes.component';
import { GameSwipeRevealComponent } from '../../shared/components/game-swipe-reveal/game-swipe-reveal.component';
import { GameFlipCardComponent } from '../../shared/components/game-flip-card/game-flip-card.component';

@Component({
  selector: 'app-ito',
  standalone: true,
  imports: [
    CommonModule,
    GameControlsComponent,
    GameUsedThemesComponent,
    GameSwipeRevealComponent,
    GameFlipCardComponent,
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

  private touchStartY = 0;
  private touchEndY = 0;

  get currentPlayer(): ItoPlayer | undefined {
    return this.playersDict[this.index];
  }

  get isFirstPlayer(): boolean {
    return this.index === 0;
  }

  get isDone(): boolean {
    return this.index >= this.playersDict.length - 1;
  }

  ngOnInit(): void {
    this.startGame();
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

  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.changedTouches[0].clientY;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndY = event.changedTouches[0].clientY;
    this.handleSwipe();
  }

  getItoColorClass(value?: number): string {
    if (value === undefined || value === null) return '';

    if (value <= 20) return 'ito-low';
    if (value <= 40) return 'ito-mid-low';
    if (value <= 60) return 'ito-mid';
    if (value <= 80) return 'ito-mid-high';
    return 'ito-high';
  }

  private handleSwipe(): void {
    const distance = this.touchStartY - this.touchEndY;
    const threshold = 40;

    if (distance > threshold && !this.isRevealed) this.reveal();
    if (distance < -threshold && this.isRevealed) this.hide();
  }

  private startGame(): void {
    this.setupPlayers();
    this.index = 0;
    this.isRevealed = false;
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
