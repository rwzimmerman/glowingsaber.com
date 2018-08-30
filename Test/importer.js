const util = require('util');
const AWS = require('aws-sdk');

const S = new AWS.S3({
    maxRetries: 0,
    region: 'us-west-2',
});

exports.handler = async (event, context) => {
    //Read options from the event.
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
    const srcBucket = event.Records[0].s3.bucket.name;
    const srcKey    = event.Records[0].s3.object.key;

    //Detect which table file has been loaded.  Don't run if not one of the
    //five known file names.
    if (srcKey.match(/gs_ModelList.csv/) != null) {
        const table = "ModelList";
        const msg = "Processing:" + srcKey;
        console.log(msg);
    } else if (srcKey.match(/gs_EffectList.csv/) != null) {
        const table = "EffectList";
        const msg = "Processing:" + srcKey;
        console.log(msg);
    } else if (srcKey.match(/gs_ModelEffectList.csv/) != null) {
        const table = "ModelEffectList";
        const msg = "Processing:" + srcKey;
        console.log(msg);
    } else if (srcKey.match(/gs_Characteristic.csv/) != null) {
        const table = "Characteristic";
        const msg = "Processing:" + srcKey;
        console.log(msg);
    } else if (srcKey.match(/gs_Faction.csv/) != null) {
        const table = "Faction";
        const msg = "Processing:" + srcKey;
        console.log(msg);
    } else {
        const table = "Unknown";
        const msg = "Unknow File:" + srcKey;
        console.log(msg);
        return {message: msg};
    }

    //Get the file
    console.log(`Getting ${srcKey} from s3://${srcBucket}`)

    let data = await S.getObject({
        Bucket: srcBucket,
        Key: srcKey,
    }).promise();


    //Process the file.
    let lines = data.Body.toString('utf-8').split('\n');
    let net_profit = 0;
    lines.slice(1).forEach(function (raw_line) {
        let line = raw_line.split(',');
        if (line.length < 3) { return null; }
        console.log(line);
        net_profit += line[2] - line[3];
    });
    console.log(net_profit);
    return {"net_profits": net_profit};
};
