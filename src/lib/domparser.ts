import { WebPage } from "..";
import {load} from "cheerio";

const fetchURL = async (url:string) => {
    const request = await fetch(url);
    const html = await request.text();
    return html;
 
} 
export const getHTML = async(item:WebPage) => {
    // If item already has rawHTML, return it
    if(item.rawHTML) {
        return item.rawHTML;
    }

    // If item has a url, fetch it
    
    const rawHTML = await fetchURL(item.url);
    const parsedContent = parseHTML(rawHTML);
    return parsedContent;

}

 const parseHTML =  (html:any,textOnly=true) => {
   
    // Parse the HTML to remove any scripts, styles, etc.

    // Use Cheerio to parse HTML
    const parsedContent = load(html);
    parsedContent('script').remove();
    parsedContent('style').remove();
    parsedContent('noscript').remove();

    // Extract text content (ignoring HTML tags)
    const textContent = parsedContent('body').removeClass().text();


    return textContent || "";


}