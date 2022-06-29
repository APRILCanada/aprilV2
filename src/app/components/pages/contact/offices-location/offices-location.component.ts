import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offices-location',
  templateUrl: './offices-location.component.html',
  styleUrls: ['./offices-location.component.scss']
})
export class OfficesLocationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  scrollToContact(){
    document.getElementById("contactForm")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
      });
  }
}
