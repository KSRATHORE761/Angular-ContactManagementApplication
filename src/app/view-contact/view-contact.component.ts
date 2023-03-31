import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public contactId:string|null = null;
  public loading:boolean=false;
  public contacts:MyContact={} as MyContact;
  public errorMessage:string | null=null;
  public groupDetail : MyGroup = {} as MyGroup;
  constructor(
    private activatedRoute:ActivatedRoute,
    private contactService:ContactService
    ){}
  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((param)=>{
        this.contactId = param.get('contactId')
      });
      if(this.contactId){
        this.loading=true;
        this.contactService.getContact(this.contactId).subscribe((data:MyContact)=>{
          this.contacts = data;
          this.contactService.getGroup(data).subscribe(
            (groupdata:MyGroup)=>{
              this.groupDetail = groupdata;
            }
          )
          this.loading=false;
        },
        (error)=>{
          this.errorMessage=error;
          this.loading=false;
        }
        ) 
      }
  }
  public isNotEmpty(){
    return Object.keys(this.contacts).length>0 && Object.keys(this.groupDetail).length>0;
  }
}
