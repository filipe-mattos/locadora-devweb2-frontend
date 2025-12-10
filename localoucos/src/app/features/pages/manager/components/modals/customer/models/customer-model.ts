export default interface CustomerModel {
  id: string;
  name: string;
  address: string;
  phone: string;
  gender: string;
  cpf: string;
  birth_date: string
}

export type CustomerPayload = Omit<CustomerModel, 'id'>;
