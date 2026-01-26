import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { themes } from '../../themes/themes';
import { GameType } from '../../interfaces/game-type.enum';

@Component({
  selector: 'app-game-logic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-logic.component.html',
  styleUrl: './game-logic.component.sass',
})
export class GameLogicComponent implements OnInit {
  private audio = new Audio('assets/dry-fart.mp3');
  private themes = themes;
  private themeDistribution: string[] = [];

  @Input() players: string[] = [];
  @Input() type: GameType = GameType.SingleTheme;

  pickedPlayer = '';
  pickedTheme = '';
  pickedThemes: string[] = [];

  usedThemes: string[] = [];
  usedThemesLabel = '';

  index = 0;
  isDone = false;
  isFirstPlayer = true;
  isRevealed = false;

  ngOnInit(): void {
    this.startGame();
  }

  private buildBalancedThemeDistributionTwoFaction(): void {
    const totalPlayersWithoutImpostor = this.players.length - 1;
    const baseAmount = Math.floor(totalPlayersWithoutImpostor / 2);
    const remainder = totalPlayersWithoutImpostor % 2;

    this.themeDistribution = [];

    this.pickedThemes.forEach((theme, index) => {
      const amount = baseAmount + (index < remainder ? 1 : 0);

      this.themeDistribution.push(...Array(amount).fill(theme));
    });

    this.shuffle(this.themeDistribution);
  }

  next(): void {
    if (this.type === GameType.TwoFactions) {
      this.pickedTheme = this.getThemeForCurrentPlayer();
    }

    this.index++;
    this.isDone = this.index >= this.players.length - 1;
    this.isFirstPlayer = this.index === 0;

    this.resetViewState();
  }

  previous(): void {
    if (this.index === 0) return;

    this.index--;
    this.isFirstPlayer = this.index === 0;

    this.resetViewState();
  }

  restart(): void {
    this.updateUsedThemes();
    this.startGame();
  }

  reveal(): void {
    this.isRevealed = true;
    this.playAudio();
  }

  hide(): void {
    this.isRevealed = false;
  }

  private startGame(): void {
    this.pickInitialThemes();
    this.pickedPlayer = this.getRandomPlayer();
    this.index = 0;
    this.isDone = false;
    this.isFirstPlayer = true;
    this.resetViewState();
  }

  private pickInitialThemes(): void {
    this.pickedThemes = [];

    if (this.type === GameType.SingleTheme) {
      this.pickedTheme = this.getRandomTheme();
      return;
    }

    if (this.type === GameType.TwoFactions) {
      this.pickedThemes = [this.getRandomTheme(), this.getRandomTheme()];
      this.pickedTheme = this.pickedThemes[0];

      this.buildBalancedThemeDistributionTwoFaction();
    }
  }

  private updateUsedThemes(): void {
    if (this.type === GameType.SingleTheme) {
      this.usedThemes.push(this.pickedTheme);
      this.themes = this.themes.filter(
        (theme) => !this.usedThemes.includes(theme),
      );
    }

    if (this.type === GameType.TwoFactions) {
      this.usedThemes.push(...this.pickedThemes);
    }

    this.usedThemesLabel = this.usedThemes.join(', ');
    this.pickedThemes = [];
  }

  private shuffle<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private resetViewState(): void {
    this.isRevealed = false;
  }

  private playAudio(): void {
    this.audio.currentTime = 0;
    this.audio.play();
  }

  private getRandomPlayer(): string {
    return this.getRandomItem(this.players);
  }

  private getRandomTheme(): string {
    return this.getRandomItem(this.themes);
  }

  private getRandomItem<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
  }

  private getThemeForCurrentPlayer(): string {
    return this.themeDistribution[this.index];
  }
}
