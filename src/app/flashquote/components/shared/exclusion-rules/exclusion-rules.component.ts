import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-exclusion-rules',
  templateUrl: './exclusion-rules.component.html',
  styleUrls: ['./exclusion-rules.component.scss']
})
export class ExclusionRulesComponent implements OnInit {

  constructor(    // injection token which allows to get access to the data passed into the dialog
    // which is made available in a data property
    @Inject(MAT_DIALOG_DATA)
    public data: {

    },
    // get a ref of the currently opened dialog
    private dialogRef: MatDialogRef<ExclusionRulesComponent>,) { }
  isOpen: false;

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
