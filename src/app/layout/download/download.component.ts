import {Component, OnInit} from '@angular/core';
import {EmailValidator, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {phoneNumberValidation} from './mobile.validation';
import {Router} from '@angular/router';
import {RestService} from '../../service/rest/rest.service';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  // title = 'Want to get in  touch with me? Please fill this form!';
  private restHost = environment.REST_HOST;
  title='DegreeSearch'
  id;degree;
  contactForm: FormGroup;
  
  constructor(private router: Router,
              private rest: RestService) { }
  
  ngOnInit(): void {
    this.createForm();
  }
  
  createForm() {
    this.contactForm = new FormGroup({
      name: new FormControl ('', [Validators.required, Validators.minLength(1)]),

      phone: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.email ]) ,
      // phone: new FormControl('',[Validators.required, phoneNumberValidation]),
      message: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })
  }
  
  get name() {return this.contactForm.get('name'); }
  get email() {return this.contactForm.get('email'); }
  get telephone () {return this.contactForm.get('phone'); }
  get message() {return this.contactForm.get('message')}
  
    onSubmit() {
      const form = this.contactForm.value;
      const body = {contact:{       name: form.name,
        telephone: form.phone,
        email: form.email,
        message: form.message,}
 
      };  
      console.log('feedback:', body);
      // this.rest.userFeedback(body).subscribe(
      //   data => {
      //     console.log('console-feedback:', data )
      //     this.router.navigate(['./home'])
      //   },
      //   error => {},
      //   () => {}
      // )
      // this.restservice.getDataList(`MMPAll/?mol_id1=${this.result1}`, page, perPage)
      // .subscribe(data => {
      //     this.images=data['results'],
      //     this.countf=data['count'],
      //     // this.size=this.images.length-1;
      //     // this.size=this.size+1
      //     // this.count=this.count*this.size
      //     console.log('这')
      //     console.log(this.images)
      //     this.isLoading = false;
      // });
    }
  }