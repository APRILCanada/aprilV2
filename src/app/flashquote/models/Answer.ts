export class Answer{
  key:string;
  section:string;
  value:string;
  identifier:string;

  constructor(id:string, section:string, value:string, identifier:string){
    this.key = id;
    this.section = section;
    this.value = value;
    this.identifier = identifier || '';
  }
}