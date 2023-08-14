import { parseHeaderText } from "./utils.js";
export default class Headline{
    constructor(element){
        this.text = parseHeaderText(element);
        this.element = element;
        this.hierarchy = parseInt(element.name.substring(1));
    }
    hierarchy;
    text;
    parent;
    element;
}