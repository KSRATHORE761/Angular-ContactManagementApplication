import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MyContact } from '../models/myContact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl:string = `https://localhost:4000`;
  constructor(private http : HttpClient) { }
  
  //Get All contact Data:
  public getAllContacts():Observable<MyContact>{
    let dataUrl:string = `${this.baseUrl}/contacts`;
    return this.http.get<MyContact>(dataUrl).pipe(
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
