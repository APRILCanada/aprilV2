import { Component, Input, OnInit } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { State } from 'src/app/flashquote/store';
import { FormControlState, SetValueAction } from 'ngrx-forms';
import { map, Observable, pluck } from 'rxjs';
import { CarMake } from 'src/app/flashquote/models/CarMake';
import { CarModel } from 'src/app/flashquote/models/CarModel';
import { Question } from 'src/app/flashquote/models/Question';
import { Vehicle } from 'src/app/flashquote/models/Vehicle';
import { CarCodeService } from 'src/app/flashquote/services/car-code.service';
import { threadId } from 'worker_threads';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss']
})
export class AutoComponent implements OnInit {
  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any;

  group$: Observable<any>;
  years: number[] = [];
  makes: CarMake[] = [];
  models: CarModel[] = []
  vehicle: Vehicle;

  filteredMakeOptions$: Observable<CarMake[]>;
  filteredModelOptions$: Observable<CarModel[]>;

  selectedYear: string = "";
  selectedMakeId: number | null;
  selectedModelId: number | null;

  identifier: string = "";
  isLoading = false;
  makeAutoCompleteHidden = false;

  constructor(private carCodeService: CarCodeService, public translate: TranslateService, private store: Store<State>, private actionsSubject: ActionsSubject,
    public language: LanguageService) { }

  ngOnInit() {
    // get the group control
    this.group$ = this.store.pipe(select((s) => s.form.formState.controls[this.question.id]));

    // get vehicle
    this.group$.subscribe(vehicle => {
      this.vehicle = new Vehicle({
        year: vehicle.controls['Vehicle-Year-1'].value,
        make: vehicle.controls['Vehicle-Make-1'].value,
        model: vehicle.controls['Vehicle-Model-1'].value
      })
    })

    // get years
    const year = new Date().getFullYear();
    for (let i = year + 1; i > 1994; i--) {
      this.years.push(i);
    }

    this.filteredMakeOptions$ = this.group$.pipe(
      pluck('controls', 'Vehicle-Make-1', 'value'),
      map((option: any) => option.value ? this._filterMakes(option.value) : this.makes));

    this.filteredModelOptions$ = this.group$.pipe(
      pluck('controls', 'Vehicle-Model-1', 'value'),
      map((option: any) => option.value ? this._filterModel(option.value) : this.models));

    this.setInitialValue();
  }

  setInitialValue() {
    this.selectVehicle(this.vehicle);
  }

  selectVehicle(vehicle: Vehicle) {
    if (!vehicle) return;
    if (vehicle.year === "") return;

    this.yearSelected(vehicle.year);

    this.carCodeService.getMakePerYear(this.selectedYear).subscribe({
      next: makes => {
        this.makes = makes;

        if (vehicle.make === "") return;

        this.makeSelected(this.makes.find(x => x.make === vehicle.make)!);
        this.carCodeService.getModelPerMakeAndYear(this.selectedMakeId!, this.selectedYear).subscribe({
          next: models => {
            this.models = models;
            if (vehicle.model == "")
              return;
            this.modelSelected(this.models.find(x => x.code == vehicle.code)!);
          }
        });
      }
    });
  }

  yearSelected(year: string) {
    this.selectedYear = year;
    // this.removeSelectedMake();
    this.getMakes();
  }

  getMakes() {
    if (this.selectedYear === "") return

    this.carCodeService.getMakePerYear(this.selectedYear).subscribe({
      next: makes => {
        this.makes = makes;
      },
      error: err => {
        this.makes = [];
      }
    });
  }

  makeSelected(make: CarMake) {
    if (!make) return;
    this.selectedMakeId = make.carMakeId
    console.log('make', make)
    this.actionsSubject.next(new SetValueAction(this.control.id + '.Vehicle-Make-1', make.make))
    this.getModels();
  }

  getModels() {
    if (this.selectedYear == "" || this.selectedMakeId == null)
      return;
    this.carCodeService.getModelPerMakeAndYear(this.selectedMakeId, this.selectedYear).subscribe({
      next: models => {
        this.models = models;
      },
      error: err => {
        this.models = [];
      }
    });
  }

  modelSelected(model: CarModel) {
    if (!model) return;
    this.selectedModelId = model.carModelId;
    console.log('model', model.label)
    this.actionsSubject.next(new SetValueAction(this.control.id + '.Vehicle-Model-1', model.label.LabelEn))
  }

  removeSelectedMake() {
    this.selectedMakeId = null;
    this.actionsSubject.next(new SetValueAction(this.control.id + '.Vehicle-Make-1', ''))
    this.removeSelectedModel();
    this.models = [];
  }

  removeSelectedModel() {
    this.selectedModelId = null;
    this.actionsSubject.next(new SetValueAction(this.control.id + '.Vehicle-Model-1', ''))
  }

  private _filterMakes(value: CarMake | string): CarMake[] {
    var val = value instanceof CarMake ? value.make : value;
    const filterValue = val.toString().toLowerCase();
    const searchRegXP = new RegExp(filterValue.normalize('NFD').replace(/[\u0300-\u036f]/g, ""), 'gi');
    if (this.selectedYear === "")
      return [];
    var makes = this.makes.filter(opt => {
      var label = opt.make.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      return searchRegXP.test(label);
    });
    return makes;
  }

  private _filterModel(value: CarModel): CarModel[] {
    var isFr = this.language.get() === 'fr';

    var val = isFr ? value.label.LabelFr : value.label.LabelEn;
    const filterValue = val.toString().toLowerCase();
    const searchRegXP = new RegExp(filterValue.normalize('NFD').replace(/[\u0300-\u036f]/g, ""), 'gi');

    return this.models.filter(opt => {
      var label = isFr ? opt.label.LabelFr.toLowerCase() : opt.label.LabelEn.toLowerCase();
      return searchRegXP.test(label.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
    });
  }
}