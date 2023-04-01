import { Component,OnInit } from '@angular/core';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  public loading:boolean= false;
  public contacts:MyContact[] = [];
  public errorMessage:string | null = null;

  constructor(private contactService: ContactService){}
  ngOnInit():void{
    this.getContactDetails();
  }
  getContactDetails(){
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data:MyContact[])=>{
      this.contacts = data;
      this.loading=false;
    },(error)=>{
      this.errorMessage = error;
      this.loading = false;
    })
  }

  deleteContact(contactId:string | undefined){
    if(contactId){
      this.loading = true;
      this.contactService.deleteContact(contactId).subscribe((data:MyContact)=>{
        this.getContactDetails();
        this.loading = false;

      },(error)=>{
        this.errorMessage = error;
        this.getContactDetails();
        this.loading = false;
      })
    }
  }
}
