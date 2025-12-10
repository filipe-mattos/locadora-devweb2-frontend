import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CustomerModel, { CustomerPayload } from '../models/customer-model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private httpClient = inject(HttpClient);

  findCustomerById(id: string) {
    return this.httpClient.get<CustomerModel>('http://localhost:8000/clients/' + id);
  }

  listCustomer() {
    return this.httpClient.get<CustomerModel[]>('http://localhost:8000/clients/');
  }

  deleteCustomer(id: string) {
    return this.httpClient.delete('http://localhost:8000/clients/' + id);
  }

  updateCustomer(id: string, payload: CustomerPayload) {
    return this.httpClient.put<CustomerModel>('http://localhost:8000/clients/' + id, payload);
  }

  saveCustomer(payload: CustomerPayload) {
    return this.httpClient.post<CustomerModel>('http://localhost:8000/clients/members', payload);
  }
}
