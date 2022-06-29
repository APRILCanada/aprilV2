export class Answer{
  key:string;
  section:string;
  value:string;
  identifier:string;

  constructor(id:string, section:string, identifier:string, value:string){
    this.key = id;
    this.section = section;
    this.identifier = identifier || '';
    this.value = value;
  }
}