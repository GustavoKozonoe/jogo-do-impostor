import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-used-themes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-used-themes.component.html',
})
export class GameUsedThemesComponent {
  @Input() usedThemes: string[] = [];
}
