import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {
  @Input() id: string;
  image: string;

  constructor(public page: PageService, private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
