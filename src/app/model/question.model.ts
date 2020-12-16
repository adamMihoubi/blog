import {Level} from './level.enum';
import {Cathegory} from './cathegory.enum';


export class Question{
  id:Number;
  question:String;
  level:Level;
  cathegory:Cathegory;
  responses:Array<String>;
  answer:String;

};
