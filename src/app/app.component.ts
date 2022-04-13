 import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ToDoPage';

  public toDoForm :  FormGroup;
  userInfo :any = [];
  userdetail:any =[];
  editdata: any;
  editflag: boolean =false;
  editInd: any;
  updatedindex: any;

  constructor(private fb:FormBuilder){
    this.toDoForm = this.fb.group({
      userName : new FormControl('',Validators.required),
      userEmail : new FormControl('',[Validators.required,Validators.email]),
      userPassword : new FormControl('',Validators.required)
    });
  }


  ngOnInit(){
    this.getlocalstoragedata();
  }

  getlocalstoragedata(){
    this.userdetail = localStorage.getItem('userInfo');
    this.userInfo = JSON.parse(this.userdetail);
    console.log(this.userInfo,"userInfo");
  }


  formdata(toDoForm){
   if(toDoForm && toDoForm.touched){
    if(!this.userInfo){this.userInfo =[]; }
      this.userInfo.push(toDoForm.value);
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      this.toDoForm.reset();
    }
  }

  editRow(event,i){
    this.editInd = i;
    this.editdata = event;
    if(this.editdata !=null){
      this.editflag = true;
      this.toDoForm.patchValue({
        userName: this.editdata.userName,
        userEmail: this.editdata.userEmail,
        userPassword: this.editdata.userPassword,
      });
     
    }
   }

  update(editdata){
    if(editdata!=null){
      this.userInfo[this.editInd] = editdata.value;
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
     
    }
  }
 }
