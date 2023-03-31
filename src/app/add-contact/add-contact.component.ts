import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading:boolean = false;
  public contact: MyContact = {} as MyContact;
  public errorMessage:string | null=null;
  public groups:MyGroup[] = [] as MyGroup[];

  constructor(private contactService:ContactService,private router:Router){}
  ngOnInit(): void {
      this.contactService.getAllGroups().subscribe((data:MyGroup[])=>{
        this.groups = data
      },(error)=>{
        this.errorMessage = error;
      })
  }
  public addContact(){

    this.loading = true;
    this.contactService.createContact(this.contact).subscribe((data:MyContact)=>{
      this.loading = false;
      this.router.navigate(['/']).then();
      
    },(error)=>{
      this.errorMessage=error;
      this.loading = false;
      this.router.navigate(['/contacts/add']).then();
    })
  }
}
