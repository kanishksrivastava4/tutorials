import { createWorker } from 'tesseract.js';

(async () => {
  // 1. Create a worker
  const worker = await createWorker('eng');

  // 2. Recognize text from an image
  const ret = await worker.recognize('truefalsegrid.png');

  // 3. Log the extracted text
  console.log(ret.data.text);

  // 4. Terminate the worker
  await worker.terminate();
})();