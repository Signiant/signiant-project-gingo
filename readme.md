# Media Shuttle submit with metadata, send download link to portal members

# project name: gingo

## Scott Reynolds, Feb 25 2021
## Updated April 27, 2021



**This application requires a subscription to Media Shuttle with Automation API and Metadata.**

   This application utilizes the Metadata feature of Submit portal to request metadata about the submitted files. Once files are uploaded emails are sent to an associated Share portal's members. Those users then click on the email link to request the files to download. AWS SES is used to send emails.

   Media Shuttle SaaS must be able to connect to this application from the Internet. You ust host your application on a platform that can support this. Heroku or AWS are sample platform infrastructures that can serve this function.
   
   Security is open in this portal design and you can change the portal settings to match your security needs.

**Setup AWS Role and Access Keys**

Create a user and access keys to allow this application access to interact with the necessary AWS resources. ie., User name: signiant_mediashuttle_user_name

Create a policy for the following services. ie., policy name: signiant_mediashuttle_gingo_policy

Lambda Policy, API Gateway, SES

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

1.  Decide on the name of your workflow and create two portals at https://manage.mediashuttle.com. One will be a Submit portal and one will be a Share portal. For example you can create:

   https://gingo-one-upload.mediashuttle.com (Submit) 
   https://gingo-one-download.mediashuttle.com (Share)

   Determine these names and create the portals before proceeding. Both portals must be assigned to the same storage and folder.

   In manage.mediashuttle.com select your Submit portal, Security, Authentication and chagne to No Login if you do no want users to login before uploading files.

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

   registrationKey=*yourSubmitPortalMetadataRegistrationKey* // Form Reg Key
   apiKey=*yourMediaShuttleApiKey* // Your MS API Key

5. Configure the components/config.js file:

   module.exports.settings = {
      apiUrl: 'https://api.mediashuttle.com/v1',   // Do not change
      AWS_REGION=process.env.AWS_REGION            // Do not change
   }

   module.exports.keys = {
      MS_API_KEY=process.env.MS_API_KEY,           // Do not change
      registrationKey=process.env.registrationKey, // Do not change
   }

   module.exports.portalMapping = [
      {
         name: "descriptor", // Enter a name for this portal workflow              
         uploadUrl: "submit_portal_name.mediashuttle.com", // The name of your submit portal for uploading
         downloadUrl: "share_portal_name.mediashuttle.com", // The name of your share portal for downloading
         expirationHours: 168, // Files can not be downloaded after 7 days
         senderEmail: "sreynolds@signiant.com", // The user account the files will come from
         senderName: "Gingo One Admin", // The name of the user 
         emailSubject: "Gingo One has new package available to download", // Email subject
         emailBody: "Click below to download the package:", // Email body
         requestLinkUrl: "https://this_applications_url/request/" // This applications url and /request endpoint
      } // This application can service multiple workflows from same config
   ]

6. Deploy
   
   node install
   npm start

7. Configure what users will recieve emails when someone uploaded files. In the Share portal add the user members.

8. Customize the metadata collection from as you see fit from public/form.html

Using the system:

User1 opens https://submit_portal.mediashuttle.com and selects files to upload and send to recipients of share_portal. After they select Add Info a metadata form will be presented. After they Submit the files the recipients will get an email showing the metadata entered and a list of the files to download.

