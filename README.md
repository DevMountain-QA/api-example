<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

We have the front end ready to utilize an API to interact with a database of employees. We need to make sure that our application is sending the right HTTP requests (per documentation) to do so. An offsite group is working on setting up the interface and database for us though, so we need to create a MOCK API.  For this project we'll be using the open source version of SoapUI. [Download SoapUI here.](https://www.soapui.org/downloads/soapui.html)

You will know your mock API is working fully when you point this application to it and see the requests logged in the correct format.

# API Documentation

*ENDPOINT*

The URL of the API can be provided in the `dbConfig.js` file, at `/src/interface/dbConfig.js`.

*REQUESTS*
* GET
   - URL: `{endpointURL}/`
   - No Body or Parameters
   - Description: This request serves to request a list of employees from the API - an array of the employees is returned.
* POST
   - URL: `{endpointURL}/`
   - Body: `application/json`
      * for example: `{id: 1, name: 'New Employee', number: 1234567890, title: 'New Employee'}`
   - Parameters: None
   - Description: This request serves to add a new record to the database of employees - an array of all employees is then returned.
* PUT
   - URL: `{endpoingURL}/{idOfEmployeeToEdit}`
   - Body: None
   - Parameters: `id`, `name`, `phone`, `title` with appropriate values
      * for example: `http://my.api.com/1/?id=1&name=New%20Employee&number=1234567890&title=New%20Employee` 
   - Description: This request will edit an already existing employe record - and an array of all employees is then returned.

# Instructions

* Follow your instructor's lead

## Disclosure

This is not an ACTUAL business project - but a project plan to assist Quality Assurance Engineers in their training.  Full documentation on the assignment requirements is available in JIRA.

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>