export const HEADERS = ['h1','h2','h3','h4','h5','h6'];
export function parseHeaderText(element){
    return element.children[0].data;
}
export function parseItemText(element){
    if(element && !isEmpty(element.children) && element.children[0].type == 'text')
        return element.children[0].data;
}
export function cleanHtmlString(string){
    string = string.replace(/\[.*\]/g,'');
    string = string.replace(/\n/g,'');
    string = string.replace(/<(\/?((span)|(a)|(i)|(sup)|(b))[^>]*)>/g, '');
    return string;
}
export function isHeader(element){
    return HEADERS.includes(element.name)
}
export function isTag(element){
    if(element.type == 'tag')
        return true;
    return false;
}
export function isEmpty(array){
    if(array.length == 0)
        return true;
    else return false;
}