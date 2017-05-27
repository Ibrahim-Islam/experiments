//leaving off .ts because its included in resolve.extensions in webpack
import { WORLD } from './helper';
import '../style/main.css';
import 'jquery';

declare var System: any;

export class Greetings{

  public greeting: string = "Hello";

  sayHello(){
    return `${this.greeting}, ${WORLD}!`;
  }
}

let greetings = new Greetings();
document.getElementById('root').innerText = greetings.sayHello();

System.import('./import.js').then(module => console.log("import.js loaded"));