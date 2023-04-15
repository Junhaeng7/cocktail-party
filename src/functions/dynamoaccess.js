import AWS from "aws-sdk";
// import awsconfig from 'components/../aws-exports'
import Amplify from "aws-amplify";
import { Storage } from "aws-amplify";

export default class DynamoAccess {
  constructor(bucket, region) {
    // Amplify.configure(awsconfig)
    this.bucketRegion = region;
    this.bucket = bucket;
  }

  async connect() {
    await Storage.get("labelerCred.json").then(async (resp) => {
      const url = `${JSON.stringify(resp)}`.slice(1, -1);
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          AWS.config.update({
            region: "us-east-1",
            endpoint: "http://localhost:8000",
            accessKeyId: "AKIATI44Q6EJP6MQPZLX", //data.ACCESS_KEY_ID,
            secretAccessKey: "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", //data.SECRET_ACCESS_KEY,
          });
          console.log("connected_dynamoaccess");
        })
        .catch((err) => console.error(err));
    });
  }

  listTables() {
    var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
    ddb.listTables({ Limit: 10 }, function (err, data) {
      if (err) {
        console.log("Error", err.code);
      } else {
        console.log("Table names are ", data.TableNames);
      }
    });
  }

  insertEntry() {
    console.log("Attempting test insert...");
  }
}
