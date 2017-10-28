import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormArray, FormBuilder, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {IcpcCode} from '../../../model/IcpcCode';
import {IcpcService} from '../../../services/IcpcService';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {noop} from 'rxjs/util/noop';

@Component({
  selector: 'icpc-action-subvisit-tab-action-tab',
  templateUrl: 'action-subvisit-tab.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ActionSubVisitTabComponent),
      multi: true
    }
  ]
})
export class ActionSubVisitTabComponent implements OnInit, ControlValueAccessor {
  private onChange: any = noop;

  writeValue(obj: any[]): void {
    (obj || []).forEach(el => {
      this.actionsControl.push(new FormControl(el));
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }


  registerOnTouched(fn: any): void {
  }

  public actionsControl: FormArray;
  public actionSearch: FormControl = new FormControl();
  public actionOptions: Observable<IcpcCode[]>;

  constructor(fb: FormBuilder, private icpcService: IcpcService) {
    this.actionsControl = fb.array([])
  }

  public ngOnInit() {
    this.actionOptions = this.actionSearch.valueChanges
      .startWith(null)
      .mergeMap(val => val ? this.filter(val, this.icpcService.actions) : this.icpcService.actions);
    this.actionsControl.valueChanges.subscribe(v => this.onChange(v));
  }

  public onActionSelected(event: MatAutocompleteSelectedEvent) {
    this.actionsControl.push(new FormControl(event.option.value));
    this.actionSearch.reset();
  }

  protected deleteAction(index: number) {
    this.actionsControl.removeAt(index);
  }

  private filter(val: string, values: Observable<IcpcCode[]>): Observable<IcpcCode[]> {
    return values.map(codes => {
        return codes.filter(c => `${c.code} ${c.shortTitleUa}`.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }
    );
  }

}
