import {NgModule} from '@angular/core';
import {IcpcCodePipe} from './pipes/IcpcCodePipe';
import {CommonModule} from '@angular/common';
import {EpisodePipe} from './pipes/EpisodePipe';
import {IcpcTransformPipe} from './pipes/IcpcTransformPipe';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    IcpcCodePipe,
    IcpcTransformPipe,
    EpisodePipe,
  ],
  exports: [
    IcpcCodePipe,
    IcpcTransformPipe,
    EpisodePipe,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatOptionModule,
    MatExpansionModule,
    MatCardModule,
    MatNativeDateModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatListModule,
    MatRadioModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatOptionModule,
    MatExpansionModule,
    MatCardModule,
    MatNativeDateModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatListModule,
    MatRadioModule
  ],
  providers: [
    IcpcCodePipe,
    IcpcTransformPipe,
    EpisodePipe
  ]
})
export class SharedModule {
}
