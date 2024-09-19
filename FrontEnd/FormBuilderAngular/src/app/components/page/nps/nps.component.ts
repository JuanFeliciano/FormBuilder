import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NpsService } from 'src/app/services/NpsService/nps.service';

@Component({
  selector: 'app-nps',
  templateUrl: './nps.component.html',
  styleUrls: ['./nps.component.scss'],
})
export class NpsComponent implements AfterViewInit {
  @ViewChild('pointer') pointer: ElementRef<HTMLDialogElement>;
  @ViewChild('nps') nps: ElementRef<HTMLDialogElement>;
  npsScore: number;
  detractors: string;
  passives: string;
  promoters: string;

  constructor(private npsService: NpsService) {}

  ngAfterViewInit(): void {
    this.npsService.GetNpsScore().subscribe((score) => {
      this.npsScore = score;
      this.updateNeedlePosition(score);
      this.updateScoreStyle(score);
    });
  }

  updateNeedlePosition(score: number): void {
    const minScore = -100;
    const maxScore = 100;

    const angle = ((score - minScore) / (maxScore - minScore)) * 180 - 90;

    const needleImg = this.pointer.nativeElement;
    needleImg.style.transform = `rotate(${angle}deg)`;
  }

  updateScoreStyle(score: number): void {
    const npsScoreElement = this.nps.nativeElement;
    npsScoreElement.classList.remove('positive', 'negative', 'neutral');
    if (score >= 50) {
      npsScoreElement.classList.add('positive');
    } else if (score < 0) {
      npsScoreElement.classList.add('negative');
    } else {
      npsScoreElement.classList.add('neutral');
    }
  }
}
