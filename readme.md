# Media Shuttle submit with metadata, send download link to portal members

# project name: Gingo
## Node.js

## Scott Reynolds, Feb 25 2021
## Updated April 27, 2021

### Seee gingo_diagram.png ###

**This application requires a subscription to Media Shuttle with Automation API and Metadata.**

   This application utilizes the Metadata feature of Submit portal to request metadata about the submitted files. Once files are uploaded emails are sent to an associated Share portal's members including the metadata. Those users then click on the email link to request the files to download. AWS SES is used to send emails.

   Media Shuttle SaaS must be able to connect to this application from the Internet. Heroku or AWS are sample platform infrastructures that can serve this function.
   
   Security is open in this portal design and you can change the portal settings to match your security needs.

**This application uses the Media Shuttle API Client**

This repository is imported from the package.json file during NPM install

https://github.com/scottdavidreynolds/media_shuttle_api#1.13.3

**Setup AWS Role and Access Keys**

Create a user and access keys to allow this application access to interact with the necessary AWS resources. ie., User name: signiant_mediashuttle_user_name

Create a policy for the following services. ie., policy name: signiant_mediashuttle_gingo_policy

Lambda Policy, API Gateway, SES
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendRawEmail"
            ],
            "Resource": "*"
        }
    ]
}
```
1.  Decide on the name of your workflow and create two portals at https://manage.mediashuttle.com. One will be a Submit portal and one will be a Share portal. For example you can create:

   https://gingo-one-upload.mediashuttle.com (Submit) 
   https://gingo-one-download.mediashuttle.com (Share)

   Determine these names and create the portals before proceeding. Both portals must be assigned to the same storage and folder.

   In manage.mediashuttle.com select your Submit portal, Security, Authentication and change to No Login if you do no want users to login before uploading files to the Submit portal.

2. Update your https://submit_portal_name/admin

   Metadata: Metadata provider URL: https://your_application_url/show  
   Registration key: unique_key to you will use in your Node ENV

   application_url may not be know until you deploy this application.
   /show must be included at the end of the URL.

3. Update your https://share_portal_name/admin 

   General: 
   
   DISABLE Send portal invitations when:
      Members are added
      Members are imported

   DISABLE Notify senders by email when:
      Files are sent or uploaded to storage
      Files are received or downloaded from storage

      
4. Configure your Node ENV:

   apiKey=*yourMediaShuttleApiKey*                 // Your MS API Key
   AWS_ACCESS_KEY_ID=%your_access_key%             // Your AWS Credentials
   AWS_SECRET_ACCESS_KEY=%your_secret_access_key%  // Your AWS Credentials

5. Configure the config.js file:

   ```
   module.exports.settings = {
      apiUrl: 'https://api.mediashuttle.com/v1',   // Do not change
      AWS_REGION='us-west-2'                       // Your AWS region for SES service
   }

   module.exports.keys = {
      MS_API_KEY=process.env.MS_API_KEY            // Do not change
   }

   module.exports.portalMapping = [
      {
         name: "descriptor",                                // Enter a name for this workflow
         uploadUrl: "gingo-one-upload.mediashuttle.com",    // The name of your submit portal for uploading
         downloadUrl: gingo-one-download.mediashuttle.com", // The name of your share portal for downloading
         expirationHours: 168,                              // This package expiration feature is not implemented
         senderEmail: "user@domain.com",                    // The user account the files will come from
         emailSubject: "Gingo One has new package available to download",  // Email subject
         emailBody: "Click below to download the package:", // Email body
         applicationHost: "https://this_applications_url",  // This endpoint serving this application including https:// prefix
         registrationKey=*yourSubmitPortalMetadataRegistrationKey*         // Form Reg Key
      } 
   ]
   ```
   This application can service multiple workflows from same config by adding another portalMapping object to the array.

6. Deploy

   npm install

   npm start

7. Create a webhook subscription for your Submit portal

   This function is available from https://developer.signiant.com under Media Shuttle API. Auto-provisioning of this will be added to this application in the future. As this is a one time setting it is inneficient to make the API call each time the application executes.

   **url: %applicationHost%/webhook/upload**

7. Configure which users will recieve emails when files are uploaded by adding the users as Members to the Share portal.

8. Customize the metadata collection form as required from public/form.html and apply the cooresponding JSON in webhookController.js metadataFormatted keys and values.

   In form.html insure the form name key matches the JSON element. ie. 
   
   form.html
   ```
      name="senderName"
   ```
   webhookController.js
   ```
      // standardize order of metadata keys
      let metadataFormatted = {
         'Sender name': packageData.metadata.senderName,
         ...
      }
   ```

## Using the system: ##

User1 opens https://gingo-one-upload.mediashuttle.com Submit portal and selects files to upload and send to recipients of share portal. After they select Add Info your metadata form will be presented. After they Submit the files the recipients will get an email showing the metadata entered and a list of the files to download. Clicking the download link will generate a download link and redirect the user to the Share portal download page.

