import { Injectable, ComponentRef, Injector } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType} from '@angular/cdk/portal';

import { OverlayRef } from '@angular/cdk/overlay';
import { CustomOverlayRef } from '../models/custom-overlay-ref';
import { DIALOG_DATA } from '../models/custom-overlay.token';


      /*
        NoopScrollStrategy: does nothing
        CloseScrollStrategy: automatically closes the overlay when scrolling
        BlockScrollStrategy: blocks page scrolling
        RepositionScrollStrategy: will reposition the overlay element on scroll
      */


interface DialogConfig {
  component?:ComponentType<any>;
  allowBackdropClick?:boolean;
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  width?:string;
  height?:string;
  element?:any;
  position?:{originX:"center" | "start" | "end", originY: "center" | "top" | "bottom", overlayX: "center" | "start" | "end", overlayY: "center" | "top" | "bottom"};
  data?:any;
}

const DEFAULT_CONFIG: DialogConfig = {
  allowBackdropClick: false,
  hasBackdrop: true,
  backdropClass: 'overlay-backdrop',
  height:"90%",
  width:"60%",
  panelClass: 'overlay-panel',
  position:{originX:'center', originY: 'top', overlayX: 'center', overlayY: 'top'},
}

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  private _openedOverlay:CustomOverlayRef[] = [];

  config:DialogConfig;

  constructor(private injector: Injector, private overlay:Overlay) { }

  open(config: DialogConfig = {}){

    this.config = { ...DEFAULT_CONFIG, ...config };

    const overlayRef = this.createOverlay();
    
    // Instantiate remote control
    const dialogRef = new CustomOverlayRef(overlayRef);

    if(this.config.allowBackdropClick)
      overlayRef.backdropClick().subscribe(() => dialogRef.close('backdropClick'));

    const overlayComponent = this.attachDialogContainer(overlayRef, dialogRef);

    this._openedOverlay.push(dialogRef);
    dialogRef.afterClosed$.subscribe(_=>this.hasClosed(dialogRef));
    
    return dialogRef;
  }

  closeAll(){
    this._openedOverlay.forEach(x => x.close('close'));
  }

  private hasClosed(dialog:CustomOverlayRef){
    if(dialog != null)
      if(this._openedOverlay.indexOf(dialog) > -1)
        this._openedOverlay.splice(this._openedOverlay.indexOf(dialog), 1);
  }

  private getOverlayConfig(): OverlayConfig {
    
    const positionStrategy = this.config.element ? 
      this.overlay.position()
      .flexibleConnectedTo(this.config.element)
      .withPositions([this.config.position!])
      .withLockedPosition(true) :
      this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: this.config.hasBackdrop,
      backdropClass: this.config.backdropClass,
      panelClass: this.config.panelClass,
      width: this.config.width,
      height: this.config.height,
      scrollStrategy: this.config.element ? this.overlay.scrollStrategies.reposition() : this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createOverlay() {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig();

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }

  private createInjector(dialogRef: CustomOverlayRef): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: CustomOverlayRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: this.config.data }
      ]
    })
  }

  private attachDialogContainer(overlayRef: OverlayRef, dialogRef: CustomOverlayRef) {

    const injector = this.createInjector(dialogRef);

    const containerPortal = new ComponentPortal(this.config.component!, null, injector);
    const containerRef: ComponentRef<any> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

}
