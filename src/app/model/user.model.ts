import {Role} from './role.enum';
export class User {
  id: number;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  inscriptionDate: String;
  lastConnexionDate: String;
  score : Number;
  role:Role;
  questions:Array<Number>;
  imageBlob:Blob;
  fileName:String;
  fileType:String;
};
