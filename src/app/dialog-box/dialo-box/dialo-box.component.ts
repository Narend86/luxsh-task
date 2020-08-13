import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_service/user.service';
@Component({
  selector: 'app-dialo-box',
  templateUrl: './dialo-box.component.html',
  styleUrls: ['./dialo-box.component.css']
})
export class DialoBoxComponent implements OnInit {
  addSiteForm: FormGroup;
    submitted = false;
  constructor(public dialogRef: MatDialogRef<DialoBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private userService: UserService,private formBuilder: FormBuilder) {
      console.log(this.data);
     }

  ngOnInit(): void {

    if(this.data && this.data.edit === true){
      console.log(this.data.site['Site_Id'])
      this.addSiteForm = this.formBuilder.group({
        Site_Id: [this.data.site['Site_Id'], Validators.required],
        Company_Id: [this.data.site['Company_Id'], Validators.required],
        Site_Code: [this.data.site['Site_Code'], [Validators.required]],
        Site_Name: [this.data.site['Site_Name'], [Validators.required]],
        Address1: [this.data.site['Address1'], [Validators.required]],
        Address2: [this.data.site['Address2'], [Validators.required]],
        Address3: [this.data.site['Address3'], [Validators.required]],
        Address4: [this.data.site['Address4'], [Validators.required]],
        PostCode: [this.data.site['PostCode'], [Validators.required]],
        City: [this.data.site['City'], [Validators.required]],
        State: [this.data.site['State'], [Validators.required]],
        Country: [this.data.site['Country'], [Validators.required]],
        isActive: [this.data.site['isActive'], [Validators.required]],
        AddedBy: [this.data.site['AddedBy'], [Validators.required]],
      })
    }else{
      this.addSiteForm = this.formBuilder.group({
        Site_Id: ['', Validators.required],
        Company_Id: ['', Validators.required],
        Site_Code: ['', [Validators.required]],
        Site_Name: ['', [Validators.required]],
        Address1: ['', [Validators.required]],
        Address2: ['', [Validators.required]],
        Address3: ['', [Validators.required]],
        Address4: ['', [Validators.required]],
        PostCode: ['', [Validators.required]],
        City: ['', [Validators.required]],
        State: ['', [Validators.required]],
        Country: ['', [Validators.required]],
        isActive: [0, [Validators.required]],
        AddedBy: [0, [Validators.required]],
      })
    }
  }
    // convenience getter for easy access to form fields
    get f() { return this.addSiteForm.controls; }

    onSubmit() {
 
      this.submitted = true;

      // stop here if form is invalid
      if (this.addSiteForm.invalid) {
          return;
      }
      console.log(this.addSiteForm.value)
     this.dialogRef.close(this.addSiteForm.value);
  }
  cancel(data){
this.dialogRef.close(data);
  }
}
