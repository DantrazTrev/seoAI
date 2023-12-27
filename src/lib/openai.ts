import OpenAI from 'openai';


// Using the default configuration
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });

export default openai;

