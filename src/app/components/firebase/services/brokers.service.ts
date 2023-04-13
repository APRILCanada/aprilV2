import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Broker } from '../models/Broker'
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  brokersCollection: AngularFirestoreCollection<Broker>;
  brokerDoc: AngularFirestoreDocument<Broker>;
  brokers: Observable<Broker[]>;
  broker: any;

  constructor(private afs: AngularFirestore) { 
    this.brokersCollection = afs.collection<Broker>('brokers');
    this.brokers = this.brokersCollection.snapshotChanges().pipe(
      map(actions => actions.map((a: any) => {
        const data = a.payload.doc.data() as Broker;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
  }

  getBrokers(): Observable<Broker[]> {
    return this.brokers;
  }

  createBroker(id: any,broker: Broker) {
    this.brokersCollection.doc(id).set(broker);
  }

  getBroker (id: string): Observable<Broker> {
    this.brokerDoc = this.afs.doc<Broker>(`brokers/${id}`);
    this.broker = this.brokerDoc.snapshotChanges().pipe(
      map(action => {
        if(action.payload.exists === false) {
          return null;
        } else {
            const data = action.payload.data() as Broker;
            data.aprilonId = action.payload.id;
            return data;
        }
      }))
      return this.broker
  }

  updateBroker(broker:Broker){
    this.brokerDoc = this.afs.doc(`brokers/${broker.aprilonId}`);
    this.brokerDoc.update(broker);
  }

  deleteBroker(broker:Broker){
    this.brokerDoc = this.afs.doc(`brokers/${broker.aprilonId}`);
    this.brokerDoc.delete();
  }
}