import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { themes } from '../../themes/themes';

@Component({
  selector: 'app-game-logic',
  standalone: true,
  imports: [JsonPipe, CommonModule],
  templateUrl: './game-logic.component.html',
  styleUrl: './game-logic.component.sass',
})
export class GameLogicComponent implements OnInit {
  private themes = themes;
  @Input() players: string[] = [];
  @Input() type: number = 0;
  usedThemes: string[] = [];
  usedThemesString: string = '';
  audio = new Audio('assets/dry-fart.mp3');

  pickedTheme = '';
  pickedPlayer = '';
  pickedThemes: string[] = [];
  show = false;
  index = 0;
  done = false;
  notRevealedYet = true;
  isFirst = true;

  ngOnInit() {
    this.pickGameType();
    this.pickedPlayer = this.getRandomPlayer();
  }

  pickGameType() {
    if (this.type === 1) {
      this.pickedTheme = this.getRandomTheme();
    } else if (this.type === 2) {
      this.pickedTheme = this.getRandomTheme();
      this.pickedThemes.push(this.pickedTheme);
      this.pickedThemes.push(this.getRandomTheme());
    }
  }

  next() {
    if (this.type === 2) {
      this.pickedTheme = this.getRandomThemeInTwoFactions();
    }
    this.index === this.players.length - 2
      ? (this.done = true)
      : (this.done = false);
    this.index++;
    this.show = false;
    this.notRevealedYet = true;
    this.isFirst = this.index === 0;
  }

  previous() {
    this.index--;
    this.show = false;
    this.notRevealedYet = true;
    this.isFirst = this.index === 0;
  }

  restart() {
    this.setAlreadyUsedThemes();
    this.pickGameType();
    this.pickedPlayer = this.getRandomPlayer();
    this.show = false;
    this.index = 0;
    this.done = false;
  }

  setAlreadyUsedThemes() {
    if (this.type === 1) {
      this.themes = this.themes.filter((x) =>
        this.pickedThemes.find((y) => y == x),
      );
      this.usedThemes.push(this.pickedTheme);
    } else if (this.type === 2) {
      this.usedThemes = this.usedThemes.concat(this.pickedThemes);
    }

    this.pickedThemes = [];
    this.usedThemesString = this.usedThemes.join(', ');
  }

  reveal() {
    this.notRevealedYet = false;
    this.show = true;
    this.audio.currentTime = 0;
    this.audio.play();
  }

  hide() {
    this.show = false;
  }

  getRandomPlayer(): string {
    return this.players[Math.floor(Math.random() * this.players.length)];
  }

  getRandomThemeInTwoFactions() {
    return this.pickedThemes[Math.floor(Math.random() * 2)];
  }

  getRandomTheme(): string {
    return this.themes[Math.floor(Math.random() * this.themes.length)];
  }
}
