import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormArray, FormBuilder, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {IcpcCode} from '../../../model/IcpcCode';
import {IcpcService} from '../../../services/IcpcService';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {noop} from 'rxjs/util/noop';

@Component({
  selector: 'icpc-reason-subvisit-tab-action-tab',
  templateUrl: 'reason-subvisit-tab.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReasonSubVisitTabComponent),
      multi: true
    }
  ]
})
export class ReasonSubVisitTabComponent implements OnInit, ControlValueAccessor {
  private onChange: any = noop;

  writeValue(obj: any[]): void {
    (obj || []).forEach(el => {
      this.reasonsControl.push(new FormControl(el));
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }


  registerOnTouched(fn: any): void {
  }

  public reasonsControl: FormArray;
  public reasonOptions: Observable<IcpcCode[]>;
  public reasonSearch: FormControl = new FormControl();

  constructor(fb: FormBuilder, private icpcService: IcpcService) {
    this.reasonsControl = fb.array([])
  }

  public ngOnInit() {
    this.reasonOptions = this.reasonSearch.valueChanges
      .startWith(null)
      .mergeMap(val => val ? this.filter(val, this.icpcService.reasons) : this.icpcService.reasons);
    this.reasonsControl.valueChanges.subscribe(v => this.onChange(v));
  }

  public onReasonSelected(event: MatAutocompleteSelectedEvent) {
    this.reasonsControl.push(new FormControl(event.option.value));
    this.reasonSearch.reset();
  }

  public deleteReason(index: number) {
    this.reasonsControl.removeAt(index);
  }

  private filter(val: string, values: Observable<IcpcCode[]>): Observable<IcpcCode[]> {
    return values.map(codes => {
        return codes.filter(c => `${c.code} ${c.shortTitleUa}`.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }
    );
  }

}
