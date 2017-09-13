import {Component, Inject, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MD_DIALOG_DATA, MdDialog, MdDialogRef} from '@angular/material';
import {IcpcService} from '../../services/IcpcService';
import {Episode} from '../../model/Episode';
import {Visit} from '../../model/Visit';
import {VisitDetailsDialogComponent} from '../visit-details-dialog/VisitDetailsDialogComponent';
import {Patient} from '../../model/Patient';

@Component({
  selector: 'icpc-episode-details-dialog',
  templateUrl: 'episode-details-dialog.html',
})
export class EpisodeDetailsDialogComponent implements OnInit {

  @Input()
  public patient: Patient;

  @Input()
  public episode: Episode;

  public formGroup: FormGroup;

  constructor(private icpcService: IcpcService,
              public dialog: MdDialog,
              public dialogRef: MdDialogRef<EpisodeDetailsDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any,
              fb: FormBuilder) {
    this.episode = data.episode;
    this.patient = data.patient;
    this.formGroup = fb.group({
      name: new FormControl()
    });
  }

  public ngOnInit(): void {
    this.formGroup.patchValue({
      name: this.episode.name
    })
  }

  public getVisit(id: number) {
    return this.patient.subVisits.find(v => v.id === id);
  }

  public get visitsLabel() {
    return `Підвізіти (${(this.episode.subVisits || []).length})`;
  }

  public openVisitDetailsModal(visit: Visit) {
    let dialogRef = this.dialog.open(VisitDetailsDialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        visit: visit
      }
    });
  }

}