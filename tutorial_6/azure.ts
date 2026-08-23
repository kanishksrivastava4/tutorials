/*
  This code sample shows Prebuilt Layout operations with the Azure AI Document Intelligence client library. 

  To learn more, please visit the documentation - Quickstart: Document Intelligence (formerly Form Recognizer) SDKs
  https://learn.microsoft.com/azure/ai-services/document-intelligence/quickstarts/get-started-sdks-rest-api?pivots=programming-language-javascript
*/

import DocumentIntelligence from "@azure-rest/ai-document-intelligence"
import { getLongRunningPoller, isUnexpected, type AnalyzeOperationOutput } from "@azure-rest/ai-document-intelligence"

function* getTextOfSpans(content: string, spans: { offset: number; length: number }[]) {
    for (const span of spans) {
      yield content.slice(span.offset, span.offset + span.length);
    }
  }

  /*
    Remember to remove the key from your code when you're done, and never post it publicly. For production, use
    secure methods to store and access your credentials. For more information, see 
    https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-security?tabs=command-line%2Ccsharp#environment-variables-and-application-configuration
  */
  const endpoint = "replacewithyourownendpoint";
  const key = "replacewithyourownkey";

  // sample document
  const formUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf"

  async function main() {
      const client = DocumentIntelligence(endpoint, {key:key});
      const initialResponse = await client
          .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
          .post({
            contentType: "application/json",
            body: {
              urlSource: formUrl
            },
           });
 
           if (isUnexpected(initialResponse)) {
           throw initialResponse.body.error;
         }
 
      const poller = getLongRunningPoller(client, initialResponse);
      const responseBody = (await poller.pollUntilDone()).body as AnalyzeOperationOutput;
      const analyzeResult = responseBody.analyzeResult;
 
      const content = analyzeResult?.content;
      const pages = analyzeResult?.pages;
      const tables = analyzeResult?.tables;
      const languages = analyzeResult?.languages;
 
 
      if (!pages || pages.length <= 0) {
          console.log("No pages were extracted from the document.");
      } else {
          console.log("Pages:");
          for (const page of pages) {
              console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
              console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
              console.log(`  ${page.lines?.length ?? 0} lines, ${page.words?.length ?? 0} words`);
          }
      }
 
      if (!tables || tables.length <= 0) {
          console.log("No tables were extracted from the document.");
      } else {
          console.log("Tables:");
          for (const table of tables) {
              console.log(
                  `- Extracted table: ${table.columnCount} columns, ${table.rowCount} rows (${table.cells.length} cells)`
              );
          }
      }
 
      if (!languages || languages.length <= 0) {
        console.log("No language spans were extracted from the document.");
      } else {
        console.log("Languages:");
        for (const languageEntry of languages) {
          console.log(
            `- Found language: ${languageEntry.locale} (confidence: ${languageEntry.confidence})`
          );
          if (content) {
            for (const text of getTextOfSpans(content, languageEntry.spans)) {
              const escapedText = text.replace(/\r?\n/g, "\\n").replace(/"/g, '\\"');
              console.log(`  - "${escapedText}"`);
            }
          }
        }
      }
  }
 
  main().catch((error) => {
      console.error("An error occurred:", error);
      process.exit(1);
  });