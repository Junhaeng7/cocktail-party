# Label | Me | Audio
*From Los Pollos Hermanos - CS 3311/LMC3432 Junior Design Team 1117*

# What does this do?

This is an Audio Labeling tool meant to ease access and collaboration on Label data. This project is meant to be hosted and built with an AWS Amplify backend for Data storage. This can be used to prepare raw audio data for training data.

## Release Notes

**Version 1.0 Features Available:**

1. Audio data accessible for listing and browsing from AWS bucket specified in <code> s3Broswer.tsx</code>
2. Audio available to be rendering into a visual spectrogram view
3. Audio Labeling available with editable regions
4. Spectrogram zoom in/out with persistent label regions
5. Label region export to AWS S3 Bucket

## Getting Started

- Contact AWS Admins for login info

### For Local Deployment
1. Install [NPM and Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Change your present working directory to ./junior-design/amplifyapp
3. In your Terminal/Command Line enter 

        npm install
    That will install all dependecies required by the project.

4. Configure CLI 
        
        npx amplify configure

5. Initialize the amplify environment and project

        npx amplify init

6. Now pull your the AWS Amplify backend environment from AWS

    Example:

        npx amplfiy pull --appId abcdefghjklmnop --envName staging
    The <code> --appId </code> and <code> --envName</code> arguments for the latest build may differ. Refer to AudioT admins for specific amplify details.

### The project will then be ready for adding features!

Credit: [From this aws tutorial](https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/module-two/)

