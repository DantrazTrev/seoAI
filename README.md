# SEOAI

This project contains an API that checks a webpage against a set of complaince rules.


It uses
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Cheerio](https://cheerio.js.org/)
- [OpenAI](https://openai.com/)



### ⚠️⚠️⚠️⚠️ Warning The deployed API uses a free OpenAI account and can run out of credits. Please use the local version of the API to test the functionality. 


## Ideation


The API has two endpoints

- GET /status - returns the status of the API

- POST /check-compliance - returns the compliance of the webpage
    body: {
        policy{
            url?: string,
            html?: string,
            text?: string,
        },
        webpage{
            url?: string,
            html?: string,
        }
    }



We pass a webpage and the url to the compliance Policy to the API. 

The API the uses cheerio and/or OpenAI to extract the policy from the given input

The API then uses Cheerio to parse the webpage and extract the text and html.

The API then uses OpenAI to compare the policy to the webpage and return the non-compliant sections of the webpage.



## Getting Started

'yarn'
To install all dependencies

To run the server in locally please add a .env file with the following variables
```
PORT=3000
OPENAI_API_KEY = sk-<your key>
```

'yarn run dev'
To run the server

### Prerequisites

- Node.js
- Yarn

