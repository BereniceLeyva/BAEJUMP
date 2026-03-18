import { Injectable } from '@angular/core';

import { RespuestaBD } from '../interfaces/interfaces'; 
import { HttpClient } from '@angular/common/http';

import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class Personajes {
    constructor(
      private http:HttpClient,

      private firestore:Firestore
    ){}

    getDatos(){
      return this.http.get<RespuestaBD>('https://jumprush1-default-rtdb.firebaseio.com/.json');
    }
  
    getDetalle(id: string){
      return this.http.get<Personajes>(`https://jumprush1-default-rtdb.firebaseio.com/data/${id}.json`);
    }
}