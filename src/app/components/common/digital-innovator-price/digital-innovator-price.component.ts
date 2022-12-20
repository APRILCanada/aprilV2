import { AfterViewChecked, Component, OnInit, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/services/language.service';

let matchQuery = window.matchMedia('(min-width: 768px)');

@Component({
  selector: 'app-digital-innovator-price',
  templateUrl: './digital-innovator-price.component.html',
  styleUrls: ['./digital-innovator-price.component.scss']
})
export class DigitalInnovatorPriceComponent implements OnInit, AfterViewChecked {

  constructor(
    private language: LanguageService,
    private modalService: NgbModal,
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
  }

getImageUrl(){
    if(this.language.get() == 'fr' ) {
      if(matchQuery.matches) {
        return '../../../../assets/img/digital-innovator-price/POPUP-APRIL.CA-ORDINATEUR-FR.jpg';
      }
      else{
        return '../../../../assets/img/digital-innovator-price/POPUP-APRIL.CA-MOBILE-FR.jpg';
      }
    }
    if(this.language.get() == 'en' ) {
      if(!matchQuery.matches){
        return '../../../../assets/img/digital-innovator-price/POPUP-APRIL.CA-MOBILE-EN.jpg';
      } 
      else{
        return '../../../../assets/img/digital-innovator-price/POPUP-APRIL.CA-ORDINATEUR-EN.jpg';
      } 
    }
    return '../../../../assets/img/digital-innovator-price/POPUP-APRIL.CA-ORDINATEUR-FR.jpg';
  }

  btnClose(){
    this.modalService.dismissAll();
  }

  ngAfterViewChecked(): void {
    let element = document.querySelector(".modal-content");
    if(element){
    this.renderer.setStyle(element, 'background-color', 'transparent');
    }
  }
}
