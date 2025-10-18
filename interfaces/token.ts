export interface UserClaims {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  FullName: string;
  PhoneNumber: string;
  Address: string;
  BirthDate: string;
  ImageUrl: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
}
