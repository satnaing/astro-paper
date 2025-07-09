import { isMainThread, workerData, parentPort } from 'worker_threads';
import { processFile } from './file-scanner.js';

/**
 * Worker线程处理函数
 */
if (!isMainThread) {
  const { files, config } = workerData;
  
  (async () => {
    const results = [];
    
    for (const filePath of files) {
      const result = await processFile(filePath, config);
      results.push(result);
    }
    
    parentPort.postMessage(results);
  })();
}