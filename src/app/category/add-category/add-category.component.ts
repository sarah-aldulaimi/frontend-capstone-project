import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/shared/data/category';
import { CategoryService } from 'src/app/shared/service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {}

  public addCategory(addForm: NgForm): void {
    this.categoryService.addCategory(addForm.value).subscribe((res: Category) => {
      const addbtn = document.getElementById('success');
      addbtn.innerHTML = 'Success';
    });
  }
}
