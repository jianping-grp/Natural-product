import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router} from '@angular/router';
// declare var $: any;
@Component({
  selector: 'app-shouye',
  templateUrl: './shouye.component.html',
  styleUrls: ['./shouye.component.css']
})
export class ShouyeComponent implements OnInit {
  scontent = '';
  scontentt = '';
  scontentd ='';
  @ViewChild('content') content: ElementRef;
  @ViewChild('contentt') contentt: ElementRef;
  @ViewChild('contentt') contentd: ElementRef;
  @Input() color ='primary';
  @Input() color2 ='primary';
  constructor(  private router: Router) { }
  ngOnInit() {
  }

  chazhao() {
    this.scontent ="?search="+this.content.nativeElement.value;
    // this.restservice.postData('search/', this.scontent).subscribe(data => {console.log(data)})
    this.router.navigate(['/compound-table/', this.scontent]);
  }
  chazhaot() {
    this.scontentt ='?search=' +this.contentt.nativeElement.value;
    this.router.navigate(['/target-table/', this.scontentt]);
  }
  chazhaod() {
    this.scontentd ='?search=' +this.contentd.nativeElement.value;
    this.router.navigate(['/derivative-table/', this.scontentd]);
  }
}
