import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BrokerDTO } from 'src/app/flashquote/models/Broker';
import { LanguageService } from 'src/app/services/language.service';
import { ExclusionRulesComponent } from '../exclusion-rules/exclusion-rules.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  @Input() broker: BrokerDTO
  heroImg: string;
  fontHeadline: string;
  eligibilityStyle: string;

  constructor(private matDialog: MatDialog, public language: LanguageService) { }

  ngOnInit(): void {
    console.log(this.broker)
     this.broker.styles.hero.image || this.broker.market.heroImg

  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      broker: this.broker
    };
    dialogConfig.width = '100vw';
    dialogConfig.panelClass = 'mobile-dialog-container';

    const dialogRef = this.matDialog.open(ExclusionRulesComponent, dialogConfig);
  }

}
