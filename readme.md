# Media Shuttle submit with metadata, send download link to portal members
# project name: gingo
## Scott Reynolds, Feb 25 2021

**AWS Role and Access Keys**

Create a user and access keys to allow this application access to interact with the necessary AWS resources. ie., User name: signiant_mediashuttle_gingo_user

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


**This application requires a subscription to Media Shuttle with Metadata.**

   This code utilizes the Metadata feature of submit portals and the Media Shuttle Management API **/portal/*portalId*/package/*packageId*** method to retrieve the metadata about the submitted files and return a form with that dynamic content. 

   Media Shuttle SaaS must be able to connect to your form from the Internet so it is required to host your application on a platform that can support this. Heroku is a sample application infrastructure that can provide Node.js containers.

1. First configure your Node env with:

   registrationKey=*yourSubmitPortalMetadataRegistrationKey*  
   formUrl=*yourPortalUrl*/show  
   apiKey=*yourMediaShuttleApiKey*

2. Configure your portal Metadata settings:

   Metadata provider URL: https://your_application_url/show  
   Registration key: unique_key to use in your Node env

3. Configure metadata logic

   This can be used to interact with your internal databases and applications to generate a dynamic form and store the data which is presented with EJS in formUrl public/form.html sample. Customize as necessary.

3. Run the app:

   node app.js