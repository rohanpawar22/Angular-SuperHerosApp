import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-name',
  templateUrl: './search-name.component.html',
  styleUrl: './search-name.component.scss'
})
export class SearchNameComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  valueChangesSubscription : Subscription;

  @Output() searchEvent = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchKeyword: ['', [this.onlyLettersValidator()]]
    });

    this.valueChangesSubscription = this.searchForm.get('searchKeyword').valueChanges.subscribe(() => {
      this.searchSuperHeroList();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }

  get searchKeyword() {
    return this.searchForm.get('searchKeyword').value;
  }

  onlyLettersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regex = /^[a-zA-Z\s]*$/;
      const valid = regex.test(control.value);
      return valid ? null : { invalidFormat: true };
    };
  }

  searchSuperHeroList() {
    this.searchEvent.emit({ "searchKeyword": this.searchKeyword })
  }

}
