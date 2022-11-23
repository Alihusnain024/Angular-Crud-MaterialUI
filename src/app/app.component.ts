import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogeComponent } from './dialoge/dialoge.component';
import { ApiService } from './services/api.service';
import {AfterViewInit,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-Material-Crud';
  displayedColumns: string[] = ['productName', 'category', 'date','freshness', 'price', 'comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private api:ApiService){

  }
  ngOnInit(){
    this.getAllProducts();
    
  }


  openDialog() {
    this.dialog.open(DialogeComponent, {
      width:"30%"
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllProducts();
      }

    })
  }
  getAllProducts(){
    this.api.getProduct().subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },error(err) {
        alert('Error while getting thr record');
      },
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row:any){
    this.dialog.open(DialogeComponent,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe(res=>{
      if(res==='update'){
        this.getAllProducts();
      }
    })
  }
  deleteProduct(id:number){
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        alert('product deleted successfully');

      },
      error(err) {
        alert('product not deleted');
        
      },
    })
  }

}
