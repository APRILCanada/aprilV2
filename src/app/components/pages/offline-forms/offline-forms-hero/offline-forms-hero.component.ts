import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offline-forms-hero',
  templateUrl: './offline-forms-hero.component.html',
  styleUrls: ['./offline-forms-hero.component.scss']
})
export class OfflineFormsHeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollToBottom(){
    document.getElementById("offlineFormList")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
      });
  }

}
