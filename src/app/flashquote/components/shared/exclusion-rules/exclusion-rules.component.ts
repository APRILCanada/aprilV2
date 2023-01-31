import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { BrokerDTO } from 'src/app/flashquote/models/Broker';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-exclusion-rules',
  templateUrl: './exclusion-rules.component.html',
  styleUrls: ['./exclusion-rules.component.scss']
})
export class ExclusionRulesComponent implements OnInit {
  isOpen: false;
  lang: string;
  broker: BrokerDTO;

  constructor(    // injection token which allows to get access to the data passed into the dialog
    // which is made available in a data property
    @Inject(MAT_DIALOG_DATA)
    public data: {
      broker: BrokerDTO
    },
    // get a ref of the currently opened dialog
    private dialogRef: MatDialogRef<ExclusionRulesComponent>, public language: LanguageService, public translate: TranslateService) { }

  ngOnInit(): void {
    this.lang = this.language.get()
    this.broker = this.data.broker
    console.log(this.broker)
  }

  close() {
    this.dialogRef.close();
  }

}
