import { Component, OnInit ,ViewChild} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Target} from '../../../models/target';
import {FileUploader} from 'ng2-file-upload';
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import {JsmeComponent} from "../../../jsme/jsme/jsme.component";
@Component({
  selector: 'app-target-prediction',
  templateUrl: './target-prediction.component.html',
  styleUrls: ['./target-prediction.component.css']
})
export class TargetPredictionComponent implements OnInit {
form = new FormData;
  @ViewChild(JsmeComponent) jsme: JsmeComponent;
  jsmeSmiles: string;
targets;
inputFile: File;
chemicalScreeningForm: FormGroup;

constructor(private rest: RestService) {
}


public uploder: FileUploader = new FileUploader({
  url: `${environment.REST_HOST}/TargetPrediction/`,
  method: "POST",
  itemAlias: "query_file"
});
ngOnInit() {
  this.jsmeSmiles = '';
  this.createForm();
  // this._getTargetName();
}
getJsmeSmiles() {
  this.chemicalScreeningForm.reset({
    smile: this.jsme.smiles,
  })
  this.jsmeSmiles = this.jsme.smiles;

  console.log(this.jsmeSmiles)
  console.log(123)
  console.log(this.chemicalScreeningForm.value)
}
createForm() {
  this.chemicalScreeningForm = new FormGroup({
    queryFile: new FormControl('',),
    email: new FormControl('', [Validators.required, Validators.email]),
    smile: new FormControl('', )
  })
  // this.chemicalScreeningForm.reset({
  //   smile: this.jsmeSmiles,
  // })
}
get queryFile() {
  return this.chemicalScreeningForm.get('queryFile');
}

get email() {
  return this.chemicalScreeningForm.get('email');
}

get target() {
  return this.chemicalScreeningForm.get('smile');
}

fileChange(event: any) {
  this.inputFile = event.target.files[0];
  this.fileAlert();
}

fileAlert() {
  const a = this.inputFile.name.lastIndexOf('.sdf'); // 无值为-1.存在值最小为1
  const b = this.inputFile.name.lastIndexOf('.smi');
  if (a + b < 0) {
    alert('Please submit MDL sdf or SMILES format file!')
  } else if (this.inputFile.size > 41943040) {
    alert('please submit less than 40M file!')
  }
}

onSubmit() {

  if (!this.inputFile) {
    if(this.jsmeSmiles===''){
      alert('Please submit MDL sdf or SMILES format file or smiles value!')

    }
    else {
      const formData = this.chemicalScreeningForm.value;
      this.form.append('smiles', formData.smile);
      this.form.append('email', formData.email);
      const body={
        smiles:formData.smile,
        email:formData.email,
      }
      console.log('body:', body, 'form:', this.form, 'Signup', this.chemicalScreeningForm.value);
      this.rest.registry(this.form)
      .subscribe(data => {
        console.log('signIndata:', data);
        alert('Smiles Submission Successful! The prediction result will be sent to your email.');
        // this.router.navigate(['/sign-in']);
      },
      errorRes  => {
        const error = errorRes.error;
        console.log(error);
        // error.username ? alert('用户名已经存在!') : null;
        // error.email ? alert('该邮箱已经被注册!') : null;
        alert('该邮箱已经被注册!')
      },
      () => {}
    );
    }
    
  } else if (this.inputFile) {
    const a = this.inputFile.name.lastIndexOf('.sdf'); // 无值为-1.存在值最小为1
    const b = this.inputFile.name.lastIndexOf('.smi');
    if (a + b < 0) {
      alert('Please submit MDL sdf or SMILES format file!')
    } else if (this.inputFile.size > 41943040) {
      alert('please submit less than 40M file!')
    } else {
      console.log('成功')
      this.uploaderFile();
    }
  }

}

uploaderFile() {
  const form = this.chemicalScreeningForm.value;
  const emailAddress = form.email;
  const smiles = form.smile;
  console.log(this.chemicalScreeningForm)
  console.log(form)
  this.uploder.setOptions({
    additionalParameter: {
      'email': emailAddress,
      'smiles': smiles,
    }
  });
  console.log(this.uploder,  smiles);
  this.uploder.queue[0].onSuccess = function (response, status, headers) {
    if (status == 200) {
      let temRes = JSON.parse(response);
      // console.log('response', temRes);
      alert('File Submission Successful! The prediction result will be sent to your email.');
    } else {
      alert('File Submission Failed. Please resubmit the query file!')
    }
  };
  this.uploder.queue[0].upload();
  this.rebuildForm();
}

rebuildForm() {
  this.chemicalScreeningForm.reset({
    smile: '',
  })
}

}

