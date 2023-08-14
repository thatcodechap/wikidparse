export default class Section{
    constructor(headline){
        this.headline = headline;
        this.children = [];
        this.contents = [];
    }
    headline;
    parent;
    contents;
    children;
}