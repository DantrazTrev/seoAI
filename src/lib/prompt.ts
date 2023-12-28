

export const createPromptCompliance =  (policyText:string,pageContent:string) => {
   
    const prompt = `
    Check the following PAGE for compliance with the following POLICY

    And return any non-compliant sections of the PAGE:

    POLICY:
    """ ${policyText} """
    PAGE: 
    """ ${pageContent} """ `;

    console.log(prompt);
    return prompt;
}

export const createPromptRules =  (policyText:string) => {
const prompt = `
    Given the following TEXT, return the compliance policy as a list of rules:
    TEXT:
    """ ${policyText} """
    `;
    console.log(prompt);
return prompt;    

}