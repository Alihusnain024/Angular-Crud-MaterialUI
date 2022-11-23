import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialoge',
  templateUrl: './dialoge.component.html',
  styleUrls: ['./dialoge.component.scss']
})
export class DialogeComponent implements OnInit {
  freshnessList=["BrandNew","SecondHand","Refurebished"];
  productForm !: FormGroup;
  actionBtn:string='save';

  constructor(private formBuilder: FormBuilder, private api:ApiService,private dialogRef: MatDialogRef<DialogeComponent>, @Inject(MAT_DIALOG_DATA) public editData:any,) { }

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required],



    });
    if(this.editData){
      this.actionBtn='upadte';
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);



    }
  }
  addProduct(){
    
      if(!this.editData){
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert('Products added successfully');
            this.productForm.reset();
            this.dialogRef.close('Save');
  
          },
          error(err) {
            alert('Error while adding the product')
          },
        });

      }else{
        this.updateProduct()
      }  
  }

 

  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert('data has been updated');
        this.productForm.reset();
        this.dialogRef.close('update');
      },error(err) {
        alert('Error while updating');
      },
    })

  }
  

}
