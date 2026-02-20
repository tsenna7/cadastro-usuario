export interface User {
  id: string;
  name: string;
  lastName: string;
  gender: {id: number; name: string;}
  zipcode: string,
  state: string,
  city: string,
  street: string,
  neighbourhood: string,
  number: number,
  complement: string,
}
