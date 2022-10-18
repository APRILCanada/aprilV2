import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExclusionRulesComponent } from '../exclusion-rules/exclusion-rules.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  // open full screen dialog for select with more than 10 options
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    // add the question and all the options (as Observable) related to this select
    dialogConfig.data = {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'custom-dialog-container'
    };
    dialogConfig.width = '100vw';
    dialogConfig.panelClass = 'mobile-dialog-container';
    // call the open method on the matDialog service and pass in the component to render
    // inside the dialog - returns a ref of the currently opened dialog
    const dialogRef = this.matDialog.open(ExclusionRulesComponent, dialogConfig);
  }

}
