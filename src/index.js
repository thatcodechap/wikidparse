import { parseDocument }  from 'htmlparser2';
import Headline from './Headline.js';
import Section from './Section.js';
import Content from './Content.js';
import { cleanHtmlString, parseItemText, isEmpty, isHeader, isTag , HEADERS}  from './utils.js';

export default function parsePage(htmlString){
    htmlString = cleanHtmlString(htmlString);
    let htmlDom = parseDocument(htmlString);
    let headlines = parseHeadlines(htmlDom.children[0]);
    let mainTree = buildSectionTree(headlines);
    return serializeSection(mainTree);
}

function parseHeadlines(root){
    return tagFilter(root, HEADERS).map(headline=>new Headline(headline));
}

function tagFilter(root,tags){
    let elements = [];
    root.children.forEach(child => {
        if(tags.includes(child.name))
            elements.push(child);
    });
    return elements;
}

function buildSectionTree(headlines){
    let root = new Section();
    root.headline = {hierarchy: 1};
    let current= root;
    headlines.forEach(headline=>{
        let section = new Section(headline);
        if(headline.hierarchy <= current.headline.hierarchy)
            while(current.headline.hierarchy >= headline.hierarchy)
                current = current.parent;
        section.parent = current;
        fetchOls(headline).forEach(ol=>{
            section.contents = buildContentTree(ol);
        })
        current.children.push(section);
        current = section;
    })
    return root;
}

function fetchOls(headline){
    let ols = [];
    let element = headline.element.next;
    while(element){
        if(isTag(element) && isHeader(element))
            break;
        if(element.name == 'ol')
            ols.push(element);
        element = element.next;
    }
    return ols;
}

function buildContentTree(orderedList){
    let contents = [];
    orderedList.children.forEach(item=>{
        let content = new Content(parseItemText(item));
        tagFilter(item, ['ol']).forEach(subList=>{
            content.subcontents = content.subcontents.concat(buildContentTree(subList));
        })
        contents.push(content);
    })
    return contents;
}

function serializeSection(root){
    let json = {};
    if(!isEmpty(root.contents))
        for(let i = 1;i<=root.contents.length;i+=1)
            json[i] = serializeContent(root.contents[i-1]);
    root.children.forEach(child=>{
        json[child.headline.text] = serializeSection(child);
    })
    return json;
}

function serializeContent(root){
    if(isEmpty(root.subcontents))
        return root.data;

    let json = {};
    json.type = root.data;
    for(let i=1;i<=root.subcontents.length;i+=1)
        json[i] = serializeContent(root.subcontents[i-1]);
    return json;
}