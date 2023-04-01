import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  
  public loading:boolean = false;
  public errorMessage:string | null = null;
  public contactId:string | null = null;
  public contact:MyContact = {} as MyContact;
  public groups:MyGroup[] = [] as MyGroup[];

  constructor(
    private route:ActivatedRoute,
    private contactService: ContactService,
    private router : Router
  ){}
  ngOnInit(): void {
      this.route.paramMap.subscribe((params)=>{
        this.contactId = params.get('contactId');
      })
      if(this.contactId){
        this.loading=true;
        this.contactService.getContact(this.contactId).subscribe((data:MyContact)=>{
          this.contact = data;
          this.contactService.getAllGroups().subscribe((data:MyGroup[])=>{
            this.groups = data;
          })
          this.loading=false;
        },(error)=>{
          this.errorMessage= error;
          this.loading=false;
        })
      }
  }
  updateContactDetails(){
    if(this.contactId){
      this.loading = true;
      this.contactService.updateContact(this.contact,this.contactId).subscribe((data:MyContact)=>{
        this.router.navigate(['/']).then();
        this.loading = false;
      },(error)=>{
        this.errorMessage = error;
        this.loading = false;
        this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
      })
    }
    
  }
}
