import AWS from "aws-sdk";
import {
  ChonkyActions,
  ChonkyFileActionData,
  FileArray,
  FileBrowser,
  FileData,
  FileList,
  FileNavbar,
  FileToolbar,
  setChonkyDefaults,
} from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import path from "path";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, withRouter, Route } from "react-router-dom";
// import awsconfig from 'components/../aws-exports'
import Amplify from "aws-amplify";
import { Storage } from "aws-amplify";
import Spectrogramview from "components/Spectrogramview";
// import { useStoryLinks } from './util';

// Amplify.configure(awsconfig)

setChonkyDefaults({ iconComponent: ChonkyIconFA });

// The AWS credentials below only have read-only access to the Chonky demo bucket.
// You will need to create custom credentials for your bucket.
const BUCKET_NAME = "los-pollos-hermanos-bucket";
const BUCKET_REGION = "us-east-1";

type BrowserProps = {
  bucket: string;
  region: string;
};

const defaultProps = {
  bucket: "los-pollos-hermanos",
  region: "us-east-1",
};

// const getCred = async () => await Storage.get("labelerCred.json")
//     .then(async resp => {
//         const url = `${JSON.stringify(resp)}`.slice(1,-1);
//         await fetch(url)
//             .then(res => res.json())
//             .then(data => {
//                 // console.log(data.ACCESS_KEY_ID);
//                 // console.log(data.SECRET_ACCESS_KEY);

//                 AWS.config.update({
//                     region: BUCKET_REGION,
//                     accessKeyId: data.ACCESS_KEY_ID,
//                     secretAccessKey: data.SECRET_ACCESS_KEY,
//                 });
//                 console.log('files loaded');
//             })
//         .catch(err => console.error(err));
//     });
// getCred();

const fetchS3BucketContents = async (
  bucket: string,
  prefix: string,
  region: string
): Promise<FileArray> => {
  await Storage.get("labelerCred.json").then(async (resp) => {
    const url = `${JSON.stringify(resp)}`.slice(1, -1);
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        AWS.config.update({
          region: BUCKET_REGION,
          accessKeyId: data.ACCESS_KEY_ID,
          secretAccessKey: data.SECRET_ACCESS_KEY,
        });
        console.log("files loaded");
      })
      .catch((err) => console.error(err));
  });

  const s3 = new AWS.S3();
  return s3
    .listObjectsV2({
      Bucket: bucket,
      Delimiter: "/",
      // Prefix: 'audio/00/',
      Prefix: prefix !== "/" ? prefix : "",
    })
    .promise()
    .then((response) => {
      const chonkyFiles: FileArray = [];
      // const s3Objects = response.Contents;
      const s3Objects: AWS.S3.Object[] = response.Contents
        ? response.Contents.filter((item) => item.Key?.endsWith(".flac"))
        : [];
      console.log(response.Contents);
      const s3Prefixes = response.CommonPrefixes;
      console.log(response.CommonPrefixes);
      // const s3Prefixes = response.CommonPrefixes ? response.CommonPrefixes?.filter(item => s3Objects?.forEach(e => e.Key?.includes(item.Prefix ? item.Prefix : ''))) : response.CommonPrefixes;
      // const s3Prefixes = response.CommonPrefixes ? response.CommonPrefixes.filter(item => item.Key.endsWith('.flac')) : response.CommonPrefixes;

      // let dir = [...s3Objects?.map(item => item?.Key)];
      // dir = dir.map(item => item?.split('/').slice(0, -1).join('/'));
      // let dir2 = [];
      // dir.forEach(el => {
      //     el?.split('/').slice(0, -1).join('/');
      // });

      if (s3Objects) {
        // console.log(s3Objects.length);
        // console.log(s3Objects[0].Key);
        // console.log(dir[0]);
        chonkyFiles.push(
          ...s3Objects.map(
            (object): FileData => ({
              id: object.Key!,
              name: path.basename(object.Key!),
              modDate: object.LastModified,
              size: object.Size,
            })
          )
        );
        // chonkyFiles.push(
        //     ...dir.map(
        //         (object): FileData => ({
        //             id: object!,
        //             name: path.basename(object!),
        //             isDir: true,
        //         })
        //     )
        // );
      }

      if (s3Prefixes) {
        // console.log(s3Prefixes.length);
        chonkyFiles.push(
          ...s3Prefixes.map(
            (prefix): FileData => ({
              id: prefix.Prefix!,
              name: path.basename(prefix.Prefix!),
              isDir: true,
            })
          )
        );
      }

      return chonkyFiles;
    });
};

const storyName = "AWS S3 Browser";
const S3Browser: React.FC<BrowserProps> = ({ bucket, region }) => {
  const [error, setError] = useState<string | null>(null);
  const [folderPrefix, setKeyPrefix] = useState<string>("/");
  const [files, setFiles] = useState<FileArray>([]);

  const BUCKET_NAME = bucket;
  const BUCKET_REGION = region;

  useEffect(() => {
    console.log("REGION:" + BUCKET_REGION);
    fetchS3BucketContents(BUCKET_NAME, folderPrefix, BUCKET_REGION)
      .then(setFiles)
      .catch((error) => setError(error.message));
  }, [folderPrefix, setFiles]);

  const folderChain = React.useMemo(() => {
    let folderChain: FileArray;
    if (folderPrefix === "/") {
      folderChain = [];
    } else {
      let currentPrefix = "";
      folderChain = folderPrefix
        .replace(/\/*$/, "")
        .split("/")
        .map((prefixPart): FileData => {
          currentPrefix = currentPrefix
            ? path.join(currentPrefix, prefixPart)
            : prefixPart;
          return {
            id: currentPrefix,
            name: prefixPart,
            isDir: true,
          };
        });
    }
    folderChain.unshift({
      id: "/",
      name: BUCKET_NAME,
      isDir: true,
    });
    return folderChain;
  }, [folderPrefix]);

  let history = useHistory();

  const handleFileAction = useCallback(
    (data: ChonkyFileActionData) => {
      if (data.id === ChonkyActions.OpenFiles.id) {
        // if ( data.payload.clickType === "double" && data.payload.file.id.slice(id.length - 5) === '.flac') {

        // }
        if (data.payload.files && data.payload.files.length !== 1) return;
        if (!data.payload.targetFile || !data.payload.targetFile.isDir) return;

        const newPrefix = `${data.payload.targetFile.id.replace(/\/*$/, "")}/`;
        console.log(`Key prefix: ${newPrefix}`);
        setKeyPrefix(newPrefix);
      }
      if (data.id === ChonkyActions.MouseClickFile.id) {
        if (
          data.payload.clickType === "double" &&
          data.payload.file.name.slice(data.payload.file.name.length - 5) ===
            ".flac"
        ) {
          const myS3 = new AWS.S3({ region: BUCKET_REGION });
          const url = myS3.getSignedUrl("getObject", {
            Bucket: BUCKET_NAME,
            Key: data.payload.file.id,
            Expires: 600,
          });
          var filename = data.payload.file.id;

          const props_to_pass = {
            link: url,
            file: filename,
          };

          history.push("/spectrogram", props_to_pass);
        }
      }
    },
    [setKeyPrefix]
  );

  return (
    <div className="story-wrapper">
      <div className="story-description">
        {/* <h1 className="story-title">{storyName}</h1>
                <p>
                    This example fetches data from a real S3 bucket. If you open the
                    "Network" tab of your browser's dev tools, you will see S3 API
                    requests being sent in real-time as you enter different folders.
                </p>
                <p>
                    Note that the AWS SDK in this example is configured to have{' '}
                    <strong>read-only</strong> access to Chonky's demo bucket, called
                    <code>{BUCKET_NAME}</code>. To use a custom bucket, you will need to
                    setup appropriate IAM roles and permissions. Please remember to
                    restrict public access to your data!
                </p>
                <div className="story-links">
                    {useStoryLinks([
                        { gitPath: '2.x_storybook/src/demos/S3Browser.tsx' },
                    ])}
                </div> */}
        {error && (
          <div className="story-error">
            An error has occurred while loading bucket: <strong>{error}</strong>
          </div>
        )}
      </div>
      <div id="fileBrowser">
        <FileBrowser
          instanceId={storyName}
          files={files}
          folderChain={folderChain}
          onFileAction={handleFileAction}
          defaultFileViewActionId={ChonkyActions.EnableListView.id}
        >
          <FileNavbar />
          <FileToolbar />
          <FileList />
        </FileBrowser>
      </div>
    </div>
  );
};
(S3Browser as any).storyName = storyName;
S3Browser.defaultProps = defaultProps;

export default S3Browser;
