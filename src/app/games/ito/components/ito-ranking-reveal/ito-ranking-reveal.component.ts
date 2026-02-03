import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItoPlayer } from '../../../../interfaces/ito-player.interface';

@Component({
  selector: 'app-ito-ranking-reveal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ito-ranking-reveal.component.html',
  styleUrl: './ito-ranking-reveal.component.sass',
})
export class ItoRankingRevealComponent {
  @Input() players: ItoPlayer[] = [];

  @Output() restart = new EventEmitter<void>();

  visiblePlayers: ItoPlayer[] = [];

  ngOnInit(): void {
    this.revealPlayersOneByOne();
  }

  private revealPlayersOneByOne(): void {
    this.players.forEach((player, index) => {
      setTimeout(() => {
        this.visiblePlayers.push(player);
      }, index * 800);
    });
  }
}
