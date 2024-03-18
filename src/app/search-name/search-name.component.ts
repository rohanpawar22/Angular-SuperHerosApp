import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-name',
  templateUrl: './search-name.component.html',
  styleUrl: './search-name.component.scss'
})
export class SearchNameComponent implements OnInit {

  searchForm: FormGroup;

  @Output() searchEvent = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchKeyword: ['', [this.onlyLettersValidator()]]
    });
  }

  ngOnInit(): void {
  }

  get searchKeyword() {
    return this.searchForm.get('searchKeyword').value;
  }

  onlyLettersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regex = /^[a-zA-Z]*$/; // Regular expression to match only letters
      const valid = regex.test(control.value);
      return valid ? null : { invalidFormat: true };
    };
  }

  clearSearch() {
    this.searchForm.reset();
  }

  searchSuperHeroList() {
    this.searchEvent.emit({ "searchKeyword": this.searchKeyword })
  }

}
