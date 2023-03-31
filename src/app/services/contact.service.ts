import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl:string = `http://localhost:4000`;
  constructor(private http : HttpClient) { }
  
//#region contacts
  //Get All contact Data:
  public getAllContacts():Observable<MyContact[]>{
    let dataUrl:string = `${this.baseUrl}/contacts`;
    return this.http.get<MyContact[]>(dataUrl).pipe(
      catchError(this.handleError)
    )
  }
  // Get Single contact:
  public getContact(contactId:string):Observable<MyContact>{
    let dataUrl:string = `${this.baseUrl}/contacts/${contactId}`
    return this.http.get<MyContact>(dataUrl).pipe(
      catchError(this.handleError)
    );
  }

//CREATE Contact
public createContact(contact:MyContact):Observable<MyContact>{
  let dataUrl:string=`${this.baseUrl}/contacts`;
  return this.http.post<MyContact>(dataUrl,contact)
  .pipe(catchError(this.handleError));
}

//Update Contact
public updateContact(contact:MyContact,contactId:string):Observable<MyContact>{
  let dataUrl:string=`${this.baseUrl}/contacts/${contactId}`;
  return this.http.put<MyContact>(dataUrl,contact)
  .pipe(catchError(this.handleError));
}
//Delete Contact
public deleteContact(contactId:string):Observable<MyContact>{
  let dataUrl:string=`${this.baseUrl}/contacts/${contactId}`;
  return this.http.delete<MyContact>(dataUrl)
  .pipe(catchError(this.handleError));
}
  //#endregion

//#region Group

//Get All Group Data:
public getAllGroups():Observable<MyGroup[]>{
  let dataUrl:string = `${this.baseUrl}/groups`;
  return this.http.get<MyGroup[]>(dataUrl).pipe(
    catchError(this.handleError)
  )
}
// Get Single Group:
public getGroup(contact:MyContact):Observable<MyGroup>{
  let dataUrl:string = `${this.baseUrl}/groups/${contact.groupId}`
  return this.http.get<MyGroup>(dataUrl).pipe(
    catchError(this.handleError)
  );
}

// //CREATE Group
// public createGroup(group:MyGroup):Observable<MyGroup>{
// let dataUrl:string=`${this.baseUrl}/groups`;
// return this.http.post<MyGroup>(dataUrl,group)
// .pipe(catchError(this.handleError));
// }

// //Update Group
// public updateGroup(group:MyGroup,groupId:string):Observable<MyGroup>{
// let dataUrl:string=`${this.baseUrl}/groups/${groupId}`;
// return this.http.put<MyGroup>(dataUrl,group)
// .pipe(catchError(this.handleError));
// }
// //Delete Group
// public deleteGroup(groupId:string):Observable<MyGroup>{
// let dataUrl:string=`${this.baseUrl}/groups/${groupId}`;
// return this.http.delete<MyGroup>(dataUrl)
// .pipe(catchError(this.handleError));
// }
//#endregion
  //Error Solve
  public handleError(error:HttpErrorResponse){
    let errorMessage:string='';
    if(error.error instanceof ErrorEvent){
            //Client side error
      errorMessage = `Error : ${error.error.message}`; 
    }    
    else{
      //server side error
      errorMessage = `Status: ${error.status} \n Message ${error.error.message}`;
    }
    return throwError(errorMessage);
  }
}
