import * as functions from 'firebase-functions';

const sstp = require('../lib/sstp_ts');


// import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });
//

export const readText = functions.https.onRequest((req: any, res: any) => {
  const host = '127.0.0.1';
  const port = 9801;
  const faceNum = "1";
  const testMessage = 'hogehoge';
  const restartGhost = new Promise((resolve, reject) => {
    sstp.connect(host, port, () => {
      // console.log('connect');
      // 送信する情報
      const sstpReqData = 'SEND SSTP/1.4\n' +
          'Sender: NizigenConcierge\n' +
          'Script:' + '\\s[' + faceNum + ']' + testMessage + '\\e\n' +
          'Option: nodescript,notranslate\n' +
          'Charset: UTF-8\n'; // データの終了を表すので必ず最後に改行コードを入れる
      sstp.request(sstpReqData).then(() => {
        // console.log('FinishSendSSTP');
        sstp.close();
        resolve();
      }).catch((e: any) => {
        sstp.close();
        resolve();
      });
    });
  });

  restartGhost.then(() => {
    res.send('finished');
  }).catch((err) => {
    // // console.log(err);
    res.send('error');
  });
});
