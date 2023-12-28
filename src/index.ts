import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { getHTML } from "./lib/domparser";
import {  createPromptCompliance, createPromptRules } from "./lib/prompt";
import runPrompt from "./lib/openai";
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


    const pageContext = await getHTML(page as WebPage);
    const policyText = policy?.text ? policy.text : await getHTML(policy as WebPage);


    const policyRules = await runPrompt(createPromptRules(policyText));
   
    if(!policyRules) {
        res.status(500).send("Something went wrong with parsing the policy. Please try again with a different policy.");
        return;
    }


    const complianceCheck  = await runPrompt(createPromptCompliance(policyRules||"",pageContext));

    if(!complianceCheck) {
        res.status(500).send("Something went wrong with parsing the page. Please try again with a different page.");
        return;
    }


    res.send(complianceCheck)





})





app.listen(process.env.PORT || 3000 , () =>
  console.log(`Listening on port ${process.env.PORT}`)
);