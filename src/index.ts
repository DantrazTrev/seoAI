import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { getHTML } from "./lib/domparser";

dotenv.config();
const app = express();
app.use(express.json())




export interface WebPage {
    rawHTML?:string;
    url:string;
}

export interface Policy extends WebPage {
    text?:string;
    url:string;
};

type Page = WebPage | null;
type Compliance  = Policy | null;




app.get("/status", (req: Request, res: Response) => {
  res.send("It is alive and breathing!");
});


app.post("/compliance-check", async (req: Request, res: Response) => {
  
    const {policy,page}:{policy:Compliance,page:Page} = req.body;

    if(!policy || !page) {
        res.status(400).send("Invalid request")
    }


    const pageContext = getHTML(page as WebPage);
    const policyText = policy?.text ? policy.text : getHTML(policy as WebPage);

    res.send("We've got your request for compliance check! We'll get back to you soon!")





})





app.listen(process.env.PORT || 3000 , () =>
  console.log(`Listening on port ${process.env.PORT}`)
);