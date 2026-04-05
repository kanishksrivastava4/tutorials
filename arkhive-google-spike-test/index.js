//============================================================
//File:        index.js
//Author:      Kanishk 3188783
//Created:     2026-03/18
//Description: Tech Spike for Google Vision OCR
//Version:     1.0
//============================================================

//importing google visiob
import vision from '@google-cloud/vision';
//crearubg new client using JSON credentials
const client = new vision.ImageAnnotatorClient({
    keyFilename: './credentials/vocal-collector-492418-t0-3b2154a3b42b.json'
});

const imagePath = './assets/receipt.png';

async function main() {
    //Processing receipt using document text detection
    const response = await client.documentTextDetection(imagePath);
    //getting first element of response (which is a JSON with ALL the extracted information (e.g. text, confidence, location etc))
    const result = response[0];
    //getting full text from response 
    const fullText = result.fullTextAnnotation.text;
    //print results
    console.log(fullText);
    //Uncomment this if you want to see the WHOLE output JSON
    //console.log(JSON.stringify(result, null, 2));

}

//running the asychronous function
main();
