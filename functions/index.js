const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const { database } = require("firebase-admin");
admin.initializeApp();
require("dotenv").config();


const {SENDER_EMAIL, SENDER_PASSWORD} = process.env;

exports.sendEmailBrokerRequest = functions.https.onCall((data) => {
    if(data.province == 'QC' || data.province == 'ON' ){
        var mailList = [
        `${data.email}`,
        'assurances@elco.ca'
      ]
    } else {
        var mailList = [
            `${data.email}`,
            'tracey.paish@april.ca'
          ]
      }    
      const authData=nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: SENDER_EMAIL,
          pass: SENDER_PASSWORD,
        },
      });
         if(data.language == 'fr')  {
          authData.sendMail({
            from: "no-reply@april.ca",
            to: mailList,
            subject: "Demande d'accès à un courtier",
            text:   ``,
            html:  `<!DOCTYPE html>
            <!DOCTYPE html>
<html lang="fr">
    <head>
        <meta http-equiv="content-type" content="text/html;charset=utf-8" />
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
    </head>
    <body bgcolor="#f2f2f2">
        <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
            <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                <tr cellspacing="0" cellpadding="0" border="0" >
                    <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                        <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                            <tr>
                                <td>
                                    <img src="https://april-on.ca/april_logo_fr.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </table>
        <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
            <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                <tr>
                    <td align="center">
                        <table width="572" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td>
                                    <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                        <tr>
                                            <td colspan="2">
                                                <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">Demande d'accès à un courtier</h2>
                                                <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Bonjour ${data.firstName} ${data.lastName}</p>
                                                <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">Nous confirmons réception de votre demande d'accès à un courtier :
                                                    <ul>
                                                        <li>Prénom: ${data.firstName}</li>
                                                            <li>Nom: ${data.lastName}</li>
                                                            <li>Courriel: ${data.email}</li>
                                                            <li>Province: ${data.province}</li>
                                                            <li>Téléphone: ${data.phone}</li>
                                                            <li>Produit d'assurance: ${data.insurance}</li>
                                                    </ul>
                                                </p>
                                                <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Vous serez contacté sous peu.</p>
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                        <tr width="460">
                                            <td colspan="2" align="left">
                                                <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Nous Joindre</h2>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td valign="top" colspan="2">
                                                <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Pour obtenir de l'aide ou pour toutes questions, n'hésitez pas à nous contacter à l'adresse suivante: <a href="mailto:info@april.ca" >info@april.ca</a></p>
                                                <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Cordialement,</p>
                                                <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">L'équipe d'APRIL Canada</h1>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                <tr>
                    <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                        <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                            <tr cellspacing="0" cellpadding="0" border="0" >

                            </tr>
                            <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                    <tr>
                                        <td>
                                            <p style="color:rgba(0,0,0,0)">.</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Ne répondez pas à ce message &#8211; Les messages ne seront pas lus.</a></small>
                    </td>
                </tr>
            </table>
        </table>
    </body>
</html>`,
            
            }).then(res=>console.log("Succesfully sent"))
                .catch(err=>console.log(err));
        }  
        else{   
          authData.sendMail({
              from: "no-reply@april.ca",
              to: mailList,
              subject: "Request to be contacted by a broker",
              text:   ``,
              html:  `<!DOCTYPE html>
              <html lang="en">
                  <head>
                      <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                      <link rel="preconnect" href="https://fonts.gstatic.com">
                      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
                  </head>
                  <body bgcolor="#f2f2f2">
                      <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                          <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                              <tr cellspacing="0" cellpadding="0" border="0" >
                                  <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                      <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                          <tr>
                                              <td>
                                                  <img src="https://april-on.ca/april_logo_en.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                      </table>
                      <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                          <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                              <tr>
                                  <td align="center">
                                      <table width="572" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                              <td>
                                                  <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                      <tr>
                                                          <td colspan="2">
                                                              <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">Newsletter subscription.</h2>
                                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Hi ${data.firstName}, ${data.lastName}</p>
                                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">We have received your request to be contacted by a broker:
                                                                  <ul>
                                                                      <li>First name: ${data.firstName}</li>
                                                                      <li>Last name: ${data.lastName}</li>
                                                                      <li>Email: ${data.email}</li>
                                                                      <li>Province: ${data.province}</li>
                                                                      <li>Phone: ${data.phone}</li>
                                                                      <li>Insurance product: ${data.insurance}</li>
                                                                  </ul>
                                                              </p>
                                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">You will be contacted shortly.</p>
                                                          </td>
                                                      </tr>
                                                  </table>
                                                  <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                      <tr width="460">
                                                          <td colspan="2" align="left">
                                                              <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Contact Us</h2>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td valign="top" colspan="2">
                                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">If you have any questions please contact our team at <a href="info@april.ca" >info@april.ca</a></p>
                                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Best regards,</p>
                                                              <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">The APRIL Canada Team</h1>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                              <tr>
                                  <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                      <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                          <tr cellspacing="0" cellpadding="0" border="0" >
              
                                          </tr>
                                          <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                              <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                                  <tr>
                                                      <td>
                                                          <p style="color:rgba(0,0,0,0)">.</p>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                              <tr>
                                  <td align="center">
                                      <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Please do not reply to this email.</a></small>
                                  </td>
                              </tr>
                          </table>
                      </table>
                  </body> 
              </html>`,
              
              }).then(res=>console.log("Succesfully sent"))
                  .catch(err=>console.log(err));
        }  
 });

exports.subscribeNewsletter = functions.https.onCall((data) => {

  var mailList = [
    `${data.email}`,
    'adrien.angermann@april.ca'
  ]

    const authData=nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: SENDER_EMAIL,
          pass: SENDER_PASSWORD,
        }
    })

        if(data.language == 'fr')  {
          authData.sendMail({
            from: "no-reply@april.ca",
            to: mailList,
            subject: "Inscription à l'infolettre",
            text:   ``,
            html:  `<!DOCTYPE html>
            <html lang="fr">
                <head>
                    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                    <link rel="preconnect" href="https://fonts.gstatic.com">
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
                </head>
                <body bgcolor="#f2f2f2">
                    <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                        <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                            <tr cellspacing="0" cellpadding="0" border="0" >
                                <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                    <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                        <tr>
                                            <td>
                                                <img src="https://april-on.ca/april_logo_fr.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </table>
                    <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                        <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                            <tr>
                                <td align="center">
                                    <table width="572" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td>
                                                <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                    <tr>
                                                        <td colspan="2">
                                                            <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">Inscription à l'infolettre.</h2>
                                                            <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Bonjour ${data.fullName}</p>
                                                            <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">Nous confirmons réception de votre inscription à l'infolettre:
                                                                <ul>
                                                                    <li>Nom complet: ${data.fullName}</li>
                                                                    <li>Courriel: ${data.email}</li>
                                                                    <li>Province: ${data.province}</li>
                                                                    <li>Langue de préférence: ${data.language}</li>
                                                                </ul>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                    <tr width="460">
                                                        <td colspan="2" align="left">
                                                            <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Nous Joindre</h2>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td valign="top" colspan="2">
                                                            <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Pour obtenir de l'aide ou pour toutes questions, n'hésitez pas à nous contacter à l'adresse suivante: <a href="mailto:info@april.ca" >info@april.ca</a></p>
                                                            <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Cordialement,</p>
                                                            <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">L'équipe d'APRIL Canada</h1>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                            <tr>
                                <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                        <tr cellspacing="0" cellpadding="0" border="0" >
            
                                        </tr>
                                        <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                            <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                                <tr>
                                                    <td>
                                                        <p style="color:rgba(0,0,0,0)">.</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Ne répondez pas à ce message &#8211; Les messages ne seront pas lus.</a></small>
                                </td>
                            </tr>
                        </table>
                    </table>
                </body>
            </html>`,
            
            }).then(res=>console.log("Succesfully sent"))
                .catch(err=>console.log(err));
        }  
        else{   
          authData.sendMail({
              from: "no-reply@april.ca",
              to: mailList,
              subject: "Newsletter subscription",
              text:   ``,
              html:  `<!DOCTYPE html>
              <html lang="en">
                  <head>
                      <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                      <link rel="preconnect" href="https://fonts.gstatic.com">
                      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
                  </head>
                  <body bgcolor="#f2f2f2">
                      <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                          <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                              <tr cellspacing="0" cellpadding="0" border="0" >
                                  <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                      <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                          <tr>
                                              <td>
                                                  <img src="https://april-on.ca/april_logo_en.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                      </table>
                      <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                          <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                              <tr>
                                  <td align="center">
                                      <table width="572" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                              <td>
                                                  <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                      <tr>
                                                          <td colspan="2">
                                                              <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">Newsletter subscription.</h2>
                                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Hi ${data.fullName},</p>
                                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">We have received your subscription to the newsletter:
                                                                  <ul>
                                                                      <li>Name: ${data.fullName}</li>
                                                                      <li>Email: ${data.email}</li>
                                                                      <li>Province: ${data.province}</li>
                                                                      <li>Prefered language: ${data.language}</li>
                                                                  </ul>
                                                              </p>
                                                          </td>
                                                      </tr>
                                                  </table>
                                                  <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                      <tr width="460">
                                                          <td colspan="2" align="left">
                                                              <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Contact Us</h2>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td valign="top" colspan="2">
                                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">If you have any questions please contact our team at <a href="info@april.ca" >info@april.ca</a></p>
                                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Best regards,</p>
                                                              <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">The APRIL Canada Team</h1>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                              <tr>
                                  <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                      <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                          <tr cellspacing="0" cellpadding="0" border="0" >
              
                                          </tr>
                                          <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                              <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                                  <tr>
                                                      <td>
                                                          <p style="color:rgba(0,0,0,0)">.</p>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                              <tr>
                                  <td align="center">
                                      <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Please do not reply to this email.</a></small>
                                  </td>
                              </tr>
                          </table>
                      </table>
                  </body> 
              </html>`,
              
              }).then(res=>console.log("Succesfully sent"))
                  .catch(err=>console.log(err));
        }
    
});

exports.emailContactForm = functions.https.onCall((data) => {

        var mailList = [
                        `${data.email}`,
                        'info@april.ca'
                      ]

        const authData=nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: SENDER_EMAIL,
                pass: SENDER_PASSWORD,
              },
            });

        if(data.language == 'fr')  {
          authData.sendMail({
            from: "no-reply@april.ca",
            to: mailList,
            subject: "Nous avons reçus votre requête",
            text:   ``,
            html:  `<!DOCTYPE html>
                      <html lang="en">
                          <head>
                              <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                              <link rel="preconnect" href="https://fonts.gstatic.com">
                              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
                          </head>
                          <body bgcolor="#f2f2f2">
                              <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                  <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                      <tr cellspacing="0" cellpadding="0" border="0" >
                                          <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                              <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                                  <tr>
                                                      <td>
                                                          <img src="https://april-on.ca/april_logo_fr.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                              </table>
                              <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                  <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                                      <tr>
                                          <td align="center">
                                              <table width="572" border="0" cellspacing="0" cellpadding="0">
                                                  <tr>
                                                      <td>
                                                          <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                              <tr>
                                                                  <td colspan="2">
                                                                      <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">Nous avons reçu votre demande.</h2>
                                                                      <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Bonjour ${data.firstName} ${data.lastName}</p>
                                                                      <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">Nous sommes en train d'analyser votre la demande suivante. Nous vous répondrons sou peu.
                                                                          <ul>
                                                                              <li>Courriel: ${data.email}</li>
                                                                              <li>Téléphone: ${data.phone}</li>
                                                                              <li>Message: ${data.message}</li>
                                                                          </ul>
                                                                      </p>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                              <tr width="460">
                                                                  <td colspan="2" align="left">
                                                                      <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Nous Joindre</h2>
                                                                  </td>
                                                              </tr>
                                                              <tr>
                                                                  <td valign="top" colspan="2">
                                                                      <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Pour obtenir de l'aide ou pour toutes questions, n'hésitez pas à nous contacter à l'adresse suivante: <a href="mailto:info@april.ca" >info@april.ca</a></p>
                                                                      <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Cordialement,</p>
                                                                      <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">L'équipe d'APRIL Canada</h1>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                                  <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                      <tr>
                                          <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                              <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                                  <tr cellspacing="0" cellpadding="0" border="0" >
                      
                                                  </tr>
                                                  <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                      <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                                          <tr>
                                                              <td>
                                                                  <p style="color:rgba(0,0,0,0)">.</p>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td align="center">
                                              <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Ne répondez pas à ce message &#8211; Les messages ne seront pas lus.</a></small>
                                          </td>
                                      </tr>
                                  </table>
                              </table>
                          </body>
                      </html>`,
            
            }).then(res=>console.log("Succesfully sent"))
                .catch(err=>console.log(err));
        }  
        else{   
          authData.sendMail({
              from: "no-reply@april.ca",
              to: mailList,
              subject: "We have received your request",
              text:   ``,
              html:  `<!DOCTYPE html>
              <html lang="en">
                  <head>
                      <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                      <link rel="preconnect" href="https://fonts.gstatic.com">
                      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
                  </head>
                  <body bgcolor="#f2f2f2">
                      <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                          <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                              <tr cellspacing="0" cellpadding="0" border="0" >
                                  <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                      <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                          <tr>
                                              <td>
                                                  <img src="https://april-on.ca/april_logo_en.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                      </table>
                      <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                          <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                              <tr>
                                  <td align="center">
                                      <table width="572" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                              <td>
                                                  <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                      <tr>
                                                          <td colspan="2">
                                                              <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">We have received your request.</h2>
                                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Hi ${data.firstName} ${data.lastName},</p>
                                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">We are analyzing the following request and will be notified by email shortly.
                                                                  <ul>
                                                                      <li>Email: ${data.email}</li>
                                                                      <li>Phone: ${data.phone}</li>
                                                                      <li>Message: ${data.message}</li>
                                                                  </ul>
                                                              </p>
                                                          </td>
                                                      </tr>
                                                  </table>
                                                  <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                      <tr width="460">
                                                          <td colspan="2" align="left">
                                                              <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Contact Us</h2>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td valign="top" colspan="2">
                                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">If you have any questions please contact our team at <a href="info@april.ca" >info@april.ca</a></p>
                                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Best regards,</p>
                                                              <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">The APRIL Canada Team</h1>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                              <tr>
                                  <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                      <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                          <tr cellspacing="0" cellpadding="0" border="0" >
              
                                          </tr>
                                          <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                              <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                                  <tr>
                                                      <td>
                                                          <p style="color:rgba(0,0,0,0)">.</p>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                              <tr>
                                  <td align="center">
                                      <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Please do not reply to this email.</a></small>
                                  </td>
                              </tr>
                          </table>
                      </table>
                  </body> 
              </html>`,
              
              }).then(res=>console.log("Succesfully sent"))
                  .catch(err=>console.log(err));
        }
});
    
exports.emailClaimForm = functions.https.onCall((data) => {

    if(data.province == 'QC') {
        if(data.contractType == 'automobile'|| data.contractType == 'trucking-and-towing'){
            var mailList = [
            `${data.email}`,
            // 'michael.babin@april.ca',
            'reclamation.transport@april.ca'
          ]
        } else {
            var mailList = [
                `${data.email}`,
                // 'michael.babin@april.ca',
                'reclamations@april.ca'
              ]
          }
    } else {
        var mailList = [
            `${data.email}`,
            // 'michael.babin@april.ca', 
            'claims@april.ca'
          ] 
    }
   

    const authData=nodemailer.createTransport({
        host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: SENDER_EMAIL,
                pass: SENDER_PASSWORD,
              },
        });
        if(data.language == 'fr')  {
            if(data.contractType =='automobile'){
                if(data.filePath != ''){
                    authData.sendMail({
                        from: "no-reply@april.ca",
                        to: mailList,
                        subject: "Nous avons reçus votre demande de réclamation",
                        text:   ``,
                        headers: {
                            "x-priority": "1",
                            "x-msmail-priority": "High",
                            importance: "high"
                        },
                        priority: 'high',
                        attachments: [{
                            filename: data.file,
                            path: data.filePath
                        }],
                        html:  `<!DOCTYPE html>
                                  <html lang="en">
                                      <head>
                                          <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                                          <link rel="preconnect" href="https://fonts.gstatic.com">
                                          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
                                      </head>
                                      <body bgcolor="#f2f2f2">
                                          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                              <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                                  <tr cellspacing="0" cellpadding="0" border="0" >
                                                      <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                          <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                                              <tr>
                                                                  <td>
                                                                      <img src="https://april-on.ca/april_logo_fr.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </table>
                                          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                              <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                                                  <tr>
                                                      <td align="center">
                                                          <table width="572" border="0" cellspacing="0" cellpadding="0">
                                                              <tr>
                                                                  <td>
                                                                      <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                          <tr>
                                                                              <td colspan="2">
                                                                                  <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">Nous avons reçu votre demande de réclamation</h2>
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Bonjour,</p>
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">Nous sommes en train d'analyser votre demande suivante. Nous vous répondrons sou peu.
                                                                                      <ul>
                                                                                      <ul><li>Numéro de police: ${data.policyNumber}</li>
                                                                                      <li>Nom de l'assuré: ${data.insured}</li>
                                                                                      <li>Nom de la compagnie: ${data.company}</li>
                                                                                      <li>Numéro de téléphone: ${data.phoneNumber}</li>
                                                                                      <li>Courrier électronique: ${data.email}</li>
                                                                                      <li>Date de réclamation: ${data.date}</li>
                                                                                      <li>Province: ${data.province}</li>
                                                                                      <li>Catégorie du risque: ${data.contractType}</li>
                                                                                      <li>Nature de la réclamation: ${data.claimReason}</li>
                                                                                      <li>Année du véhicule: ${data.autoYear}</li>
                                                                                      <li>Fabriquant: ${data.autoBuilder}</li>
                                                                                      <li>Modèle: ${data.autoModel}</li>
                                                                                      <li>VIN: ${data.autoVIN}</li>
                                                                                      <li>Conducteur: ${data.autoDriver}</li>
                                                                                      <li>Numéro de permis: ${data.autoLicenceNumber}</li>
                                                                                      <li>Localisation: ${data.autoAccidentLocation}</li>
                                                                                      <li>Circonstance: ${data. autoCircumstance}</li>
                                                                                      <li>Tiers party: ${data.thirdPartyDriver}</li>
                                                                                      <li>Numéro de permis: ${data. thirdPartyLicenceNumber}</li>
                                                                                      <li>Téléphone: ${data.thirdPartyPhone}</li>
                                                                                      <li>Assureur: ${data. thirdPartyInsurer}</li>
                                                                                      <li>VIN: ${data.thirdPartyVIN}</li>
                                                                                      </ul>
                                                                                  </p>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                      <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                          <tr width="460">
                                                                              <td colspan="2" align="left">
                                                                                  <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Nous Joindre</h2>
                                                                              </td>
                                                                          </tr>
                                                                          <tr>
                                                                              <td valign="top" colspan="2">
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Pour obtenir de l'aide ou pour toutes questions, n'hésitez pas à nous contacter à l'adresse suivante: <a href="mailto:info@april.ca" >info@april.ca</a></p>
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Cordialement,</p>
                                                                                  <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">L'équipe d'APRIL Canada</h1>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                              <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                                  <tr>
                                                      <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                                          <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                                              <tr cellspacing="0" cellpadding="0" border="0" >
                                  
                                                              </tr>
                                                              <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                                  <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                                                      <tr>
                                                                          <td>
                                                                              <p style="color:rgba(0,0,0,0)">.</p>
                                                                          </td>
                                                                      </tr>
                                                                  </table>
                                                              </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td align="center">
                                                          <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Ne répondez pas à ce message &#8211; Les messages ne seront pas lus.</a></small>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </table>
                                      </body>
                                  </html>`,
                        
                        }).then(res=>console.log("Succesfully sent"))
                            .catch(err=>console.log(err));
                } else {
                    authData.sendMail({
                        from: "no-reply@april.ca",
                        to: mailList,
                        subject: "Nous avons reçus votre demande de réclamation",
                        text:   ``,
                        headers: {
                            "x-priority": "1",
                            "x-msmail-priority": "High",
                            importance: "high"
                        },
                        priority: 'high',
                        html:  `<!DOCTYPE html>
                                  <html lang="en">
                                      <head>
                                          <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                                          <link rel="preconnect" href="https://fonts.gstatic.com">
                                          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
                                      </head>
                                      <body bgcolor="#f2f2f2">
                                          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                              <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                                  <tr cellspacing="0" cellpadding="0" border="0" >
                                                      <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                          <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                                              <tr>
                                                                  <td>
                                                                      <img src="https://april-on.ca/april_logo_fr.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </table>
                                          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                              <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                                                  <tr>
                                                      <td align="center">
                                                          <table width="572" border="0" cellspacing="0" cellpadding="0">
                                                              <tr>
                                                                  <td>
                                                                      <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                          <tr>
                                                                              <td colspan="2">
                                                                                  <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">Nous avons reçu votre demande de réclamation</h2>
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Bonjour,</p>
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">Nous sommes en train d'analyser votre demande suivante. Nous vous répondrons sou peu.
                                                                                      <ul>
                                                                                      <ul><li>Numéro de police: ${data.policyNumber}</li>
                                                                                      <li>Nom de l'assuré: ${data.insured}</li>
                                                                                      <li>Nom de la compagnie: ${data.company}</li>
                                                                                      <li>Numéro de téléphone: ${data.phoneNumber}</li>
                                                                                      <li>Courrier électronique: ${data.email}</li>
                                                                                      <li>Date de réclamation: ${data.date}</li>
                                                                                      <li>Province: ${data.province}</li>
                                                                                      <li>Catégorie du risque: ${data.contractType}</li>
                                                                                      <li>Nature de la réclamation: ${data.claimReason}</li>
                                                                                      <li>Année du véhicule: ${data.autoYear}</li>
                                                                                      <li>Fabriquant: ${data.autoBuilder}</li>
                                                                                      <li>Modèle: ${data.autoModel}</li>
                                                                                      <li>VIN: ${data.autoVIN}</li>
                                                                                      <li>Conducteur: ${data.autoDriver}</li>
                                                                                      <li>Numéro de permis: ${data.autoLicenceNumber}</li>
                                                                                      <li>Localisation: ${data.autoAccidentLocation}</li>
                                                                                      <li>Circonstance: ${data. autoCircumstance}</li>
                                                                                      <li>Tiers party: ${data.thirdPartyDriver}</li>
                                                                                      <li>Numéro de permis: ${data. thirdPartyLicenceNumber}</li>
                                                                                      <li>Téléphone: ${data.thirdPartyPhone}</li>
                                                                                      <li>Assureur: ${data. thirdPartyInsurer}</li>
                                                                                     
                                                                                  </p>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                      <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                          <tr width="460">
                                                                              <td colspan="2" align="left">
                                                                                  <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Nous Joindre</h2>
                                                                              </td>
                                                                          </tr>
                                                                          <tr>
                                                                              <td valign="top" colspan="2">
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Pour obtenir de l'aide ou pour toutes questions, n'hésitez pas à nous contacter à l'adresse suivante: <a href="mailto:info@april.ca" >info@april.ca</a></p>
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Cordialement,</p>
                                                                                  <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">L'équipe d'APRIL Canada</h1>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                              <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                                  <tr>
                                                      <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                                          <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                                              <tr cellspacing="0" cellpadding="0" border="0" >
                                  
                                                              </tr>
                                                              <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                                  <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                                                      <tr>
                                                                          <td>
                                                                              <p style="color:rgba(0,0,0,0)">.</p>
                                                                          </td>
                                                                      </tr>
                                                                  </table>
                                                              </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td align="center">
                                                          <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Ne répondez pas à ce message &#8211; Les messages ne seront pas lus.</a></small>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </table>
                                      </body>
                                  </html>`,
                        
                        }).then(res=>console.log("Succesfully sent"))
                            .catch(err=>console.log(err));
                }
               
            } else {
                if(data.filePath != ''){
                    authData.sendMail({
                        from: "no-reply@april.ca",
                        to: mailList,
                        subject: "Nous avons reçus votre demande de réclamation",
                        headers: {
                          "x-priority": "1",
                          "x-msmail-priority": "High",
                          importance: "high"
                      },
                      priority: 'high',
                        attachments: [{
                          filename: data.file,
                          path: data.filePath
                      }],
                        html:  `<!DOCTYPE html>
                                  <html lang="en">
                                      <head>
                                          <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                                          <link rel="preconnect" href="https://fonts.gstatic.com">
                                          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
                                      </head>
                                      <body bgcolor="#f2f2f2">
                                          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                              <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                                  <tr cellspacing="0" cellpadding="0" border="0" >
                                                      <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                          <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                                              <tr>
                                                                  <td>
                                                                      <img src="https://april-on.ca/april_logo_fr.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </table>
                                          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                              <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                                                  <tr>
                                                      <td align="center">
                                                          <table width="572" border="0" cellspacing="0" cellpadding="0">
                                                              <tr>
                                                                  <td>
                                                                      <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                          <tr>
                                                                              <td colspan="2">
                                                                                  <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">Nous avons reçu votre demande de réclamation</h2>
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Bonjour,</p>
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">Nous sommes en train d'analyser votre demande suivante. Nous vous répondrons sou peu.
                                                                                      <ul>
                                                                                      <ul><li>Numéro de police: ${data.policyNumber}</li>
                                                                                      <li>Nom de l'assuré: ${data.insured}</li>
                                                                                      <li>Nom de la compagnie: ${data.company}</li>
                                                                                      <li>Numéro de téléphone: ${data.phoneNumber}</li>
                                                                                      <li>Courrier électronique: ${data.email}</li>
                                                                                      <li>Date de réclamation: ${data.date}</li>
                                                                                      <li>Province: ${data.province}</li>
                                                                                      <li>Catégorie du risque: ${data.contractType}</li>
                                                                                      <li>Nature de la réclamation: ${data.claimReason}</li>
                                                                                      </ul>
                                                                                  </p>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                      <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                          <tr width="460">
                                                                              <td colspan="2" align="left">
                                                                                  <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Nous Joindre</h2>
                                                                              </td>
                                                                          </tr>
                                                                          <tr>
                                                                              <td valign="top" colspan="2">
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Pour obtenir de l'aide ou pour toutes questions, n'hésitez pas à nous contacter à l'adresse suivante: <a href="mailto:info@april.ca" >info@april.ca</a></p>
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Cordialement,</p>
                                                                                  <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">L'équipe d'APRIL Canada</h1>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                              <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                                  <tr>
                                                      <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                                          <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                                              <tr cellspacing="0" cellpadding="0" border="0" >
                                  
                                                              </tr>
                                                              <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                                  <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                                                      <tr>
                                                                          <td>
                                                                              <p style="color:rgba(0,0,0,0)">.</p>
                                                                          </td>
                                                                      </tr>
                                                                  </table>
                                                              </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td align="center">
                                                          <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Ne répondez pas à ce message &#8211; Les messages ne seront pas lus.</a></small>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </table>
                                      </body>
                                  </html>`,
                        
                        }).then(res=>console.log("Succesfully sent"))
                            .catch(err=>console.log(err));

                } else {
                    authData.sendMail({
                        from: "no-reply@april.ca",
                        to: mailList,
                        subject: "Nous avons reçus votre demande de réclamation",
                        headers: {
                          "x-priority": "1",
                          "x-msmail-priority": "High",
                          importance: "high"
                      },
                      priority: 'high',
                        html:  `<!DOCTYPE html>
                                  <html lang="en">
                                      <head>
                                          <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                                          <link rel="preconnect" href="https://fonts.gstatic.com">
                                          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
                                      </head>
                                      <body bgcolor="#f2f2f2">
                                          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                              <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                                  <tr cellspacing="0" cellpadding="0" border="0" >
                                                      <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                          <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                                              <tr>
                                                                  <td>
                                                                      <img src="https://april-on.ca/april_logo_fr.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </table>
                                          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                              <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                                                  <tr>
                                                      <td align="center">
                                                          <table width="572" border="0" cellspacing="0" cellpadding="0">
                                                              <tr>
                                                                  <td>
                                                                      <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                          <tr>
                                                                              <td colspan="2">
                                                                                  <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">Nous avons reçu votre demande de réclamation</h2>
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Bonjour,</p>
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">Nous sommes en train d'analyser votre demande suivante. Nous vous répondrons sou peu.
                                                                                      <ul>
                                                                                      <ul><li>Numéro de police: ${data.policyNumber}</li>
                                                                                      <li>Nom de l'assuré: ${data.insured}</li>
                                                                                      <li>Nom de la compagnie: ${data.company}</li>
                                                                                      <li>Numéro de téléphone: ${data.phoneNumber}</li>
                                                                                      <li>Courrier électronique: ${data.email}</li>
                                                                                      <li>Date de réclamation: ${data.date}</li>
                                                                                      <li>Province: ${data.province}</li>
                                                                                      <li>Catégorie du risque: ${data.contractType}</li>
                                                                                      <li>Nature de la réclamation: ${data.claimReason}</li>
                                                                                      </ul>
                                                                                  </p>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                      <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                          <tr width="460">
                                                                              <td colspan="2" align="left">
                                                                                  <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Nous Joindre</h2>
                                                                              </td>
                                                                          </tr>
                                                                          <tr>
                                                                              <td valign="top" colspan="2">
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Pour obtenir de l'aide ou pour toutes questions, n'hésitez pas à nous contacter à l'adresse suivante: <a href="mailto:info@april.ca" >info@april.ca</a></p>
                                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Cordialement,</p>
                                                                                  <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">L'équipe d'APRIL Canada</h1>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                              <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                                  <tr>
                                                      <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                                          <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                                              <tr cellspacing="0" cellpadding="0" border="0" >
                                  
                                                              </tr>
                                                              <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                                  <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                                                      <tr>
                                                                          <td>
                                                                              <p style="color:rgba(0,0,0,0)">.</p>
                                                                          </td>
                                                                      </tr>
                                                                  </table>
                                                              </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td align="center">
                                                          <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Ne répondez pas à ce message &#8211; Les messages ne seront pas lus.</a></small>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </table>
                                      </body>
                                  </html>`,
                        
                        }).then(res=>console.log("Succesfully sent"))
                            .catch(err=>console.log(err));
                }
                
            }
          }  
          else{   
              if(data.contractType == 'automobile') {
                if(data.filePath != ''){
                    authData.sendMail({
                        from: "no-reply@april.ca",
                        to: mailList,
                        subject: "We have received your claim request",
                        headers: {
                            "x-priority": "1",
                            "x-msmail-priority": "High",
                            importance: "high"
                        },
                        priority: 'high',
                        attachments: [{
                            filename: data.file,
                            path: data.filePath
                        }],
                        html:  `<!DOCTYPE html>
                        <html lang="en">
                            <head>
                                <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                                <link rel="preconnect" href="https://fonts.gstatic.com">
                                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
                            </head>
                            <body bgcolor="#f2f2f2">
                                <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                    <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                        <tr cellspacing="0" cellpadding="0" border="0" >
                                            <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                                    <tr>
                                                        <td>
                                                            <img src="https://april-on.ca/april_logo_en.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </table>
                                <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                    <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                                        <tr>
                                            <td align="center">
                                                <table width="572" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td>
                                                            <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                <tr>
                                                                    <td colspan="2">
                                                                        <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">We have received your claim request.</h2>
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Hi,</p>
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">We are analyzing the following request and will be notified by email shortly.
                                                                            <ul>
                                                                            <ul><li>Policy number: ${data.policyNumber}</li>
                                                                            <li>Insured name: ${data.insured}</li>
                                                                            <li>Company Name: ${data.company}</li>
                                                                            <li>Phone Number: ${data.phoneNumber}</li>
                                                                            <li>Email: ${data.email}</li>
                                                                            <li>Claim date: ${data.date}</li>
                                                                            <li>Province: ${data.province}</li>
                                                                            <li>Claim type: ${data.contractType}</li>
                                                                            <li>Claim reason: ${data.claimReason}</li>
                                                                            <li>Vehicle year: ${data.autoYear}</li>
                                                                            <li>Builder: ${data.autoBuilder}</li>
                                                                            <li>Model: ${data.autoModel}</li>
                                                                            <li>VIN: ${data.autoVIN}</li>
                                                                            <li>Driver: ${data.autoDriver}</li>
                                                                            <li>Licence number: ${data.autoLicenceNumber}</li>
                                                                            <li>Location: ${data.autoAccidentLocation}</li>
                                                                            <li>Circumstance: ${data. autoCircumstance}</li>
                                                                            <li>Third party: ${data.thirdPartyDriver}</li>
                                                                            <li>Licence number: ${data. thirdPartyLicenceNumber}</li>
                                                                            <li>Phone: ${data.thirdPartyPhone}</li>
                                                                            <li>Insurer: ${data. thirdPartyInsurer}</li>
                                                                            <li>VIN: ${data.thirdPartyVIN}</li>
                                                                            </ul>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                <tr width="460">
                                                                    <td colspan="2" align="left">
                                                                        <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Contact Us</h2>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td valign="top" colspan="2">
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">If you have any questions please contact our team at <a href="info@april.ca" >info@april.ca</a></p>
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Best regards,</p>
                                                                        <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">The APRIL Canada Team</h1>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                        <tr>
                                            <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                                <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                                    <tr cellspacing="0" cellpadding="0" border="0" >
                        
                                                    </tr>
                                                    <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                        <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                                            <tr>
                                                                <td>
                                                                    <p style="color:rgba(0,0,0,0)">.</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Please do not reply to this email.</a></small>
                                            </td>
                                        </tr>
                                    </table>
                                </table>
                            </body> 
                        </html>`,
                        
                        }).then(res=>console.log("Succesfully sent"))
                            .catch(err=>console.log(err));
                } else {
                    authData.sendMail({
                        from: "no-reply@april.ca",
                        to: mailList,
                        subject: "We have received your claim request",
                        headers: {
                            "x-priority": "1",
                            "x-msmail-priority": "High",
                            importance: "high"
                        },
                        priority: 'high',
                        html:  `<!DOCTYPE html>
                        <html lang="en">
                            <head>
                                <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                                <link rel="preconnect" href="https://fonts.gstatic.com">
                                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
                            </head>
                            <body bgcolor="#f2f2f2">
                                <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                    <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                        <tr cellspacing="0" cellpadding="0" border="0" >
                                            <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                                    <tr>
                                                        <td>
                                                            <img src="https://april-on.ca/april_logo_en.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </table>
                                <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                    <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                                        <tr>
                                            <td align="center">
                                                <table width="572" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td>
                                                            <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                <tr>
                                                                    <td colspan="2">
                                                                        <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">We have received your claim request.</h2>
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Hi,</p>
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">We are analyzing the following request and will be notified by email shortly.
                                                                            <ul>
                                                                            <ul><li>Policy number: ${data.policyNumber}</li>
                                                                            <li>Insured name: ${data.insured}</li>
                                                                            <li>Company Name: ${data.company}</li>
                                                                            <li>Phone Number: ${data.phoneNumber}</li>
                                                                            <li>Email: ${data.email}</li>
                                                                            <li>Claim date: ${data.date}</li>
                                                                            <li>Province: ${data.province}</li>
                                                                            <li>Claim type: ${data.contractType}</li>
                                                                            <li>Claim reason: ${data.claimReason}</li>
                                                                            <li>Vehicle year: ${data.autoYear}</li>
                                                                            <li>Builder: ${data.autoBuilder}</li>
                                                                            <li>Model: ${data.autoModel}</li>
                                                                            <li>VIN: ${data.autoVIN}</li>
                                                                            <li>Driver: ${data.autoDriver}</li>
                                                                            <li>Licence number: ${data.autoLicenceNumber}</li>
                                                                            <li>Location: ${data.autoAccidentLocation}</li>
                                                                            <li>Circumstance: ${data. autoCircumstance}</li>
                                                                            <li>Third party: ${data.thirdPartyDriver}</li>
                                                                            <li>Licence number: ${data. thirdPartyLicenceNumber}</li>
                                                                            <li>Phone: ${data.thirdPartyPhone}</li>
                                                                            <li>Insurer: ${data. thirdPartyInsurer}</li>
                                                                            <li>VIN: ${data.thirdPartyVIN}</li>
                                                                            </ul>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                <tr width="460">
                                                                    <td colspan="2" align="left">
                                                                        <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Contact Us</h2>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td valign="top" colspan="2">
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">If you have any questions please contact our team at <a href="info@april.ca" >info@april.ca</a></p>
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Best regards,</p>
                                                                        <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">The APRIL Canada Team</h1>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                        <tr>
                                            <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                                <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                                    <tr cellspacing="0" cellpadding="0" border="0" >
                        
                                                    </tr>
                                                    <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                        <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                                            <tr>
                                                                <td>
                                                                    <p style="color:rgba(0,0,0,0)">.</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Please do not reply to this email.</a></small>
                                            </td>
                                        </tr>
                                    </table>
                                </table>
                            </body> 
                        </html>`,
                        
                        }).then(res=>console.log("Succesfully sent"))
                            .catch(err=>console.log(err));
                }
                
              } else {
                if(data.filePath != ''){
                    authData.sendMail({
                        from: "no-reply@april.ca",
                        to: mailList,
                        subject: "We have received your claim request",
                        headers: {
                          "x-priority": "1",
                          "x-msmail-priority": "High",
                          importance: "high"
                      },
                        priority: 'high',
                        attachments: [{
                          filename: data.file,
                          path: data.filePath
                      }],
                        html:  `<!DOCTYPE html>
                        <html lang="en">
                            <head>
                                <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                                <link rel="preconnect" href="https://fonts.gstatic.com">
                                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
                            </head>
                            <body bgcolor="#f2f2f2">
                                <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                    <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                        <tr cellspacing="0" cellpadding="0" border="0" >
                                            <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                                    <tr>
                                                        <td>
                                                            <img src="https://april-on.ca/april_logo_en.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </table>
                                <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                    <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                                        <tr>
                                            <td align="center">
                                                <table width="572" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td>
                                                            <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                <tr>
                                                                    <td colspan="2">
                                                                        <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">We have received your claim request.</h2>
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Hi,</p>
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">We are analyzing the following request and will be notified by email shortly.
                                                                            <ul>
                                                                            <ul><li>Policy number: ${data.policyNumber}</li>
                                                                            <li>Insured name: ${data.insured}</li>
                                                                            <li>Company Name: ${data.company}</li>
                                                                            <li>Email: ${data.email}</li>
                                                                            <li>Claim date: ${data.date}</li>
                                                                            <li>Province: ${data.province}</li>
                                                                            <li>Claim type: ${data.contractType}</li>
                                                                            <li>Claim reason: ${data.claimReason}</li>
                                                                            </ul>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                <tr width="460">
                                                                    <td colspan="2" align="left">
                                                                        <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Contact Us</h2>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td valign="top" colspan="2">
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">If you have any questions please contact our team at <a href="info@april.ca" >info@april.ca</a></p>
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Best regards,</p>
                                                                        <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">The APRIL Canada Team</h1>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                        <tr>
                                            <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                                <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                                    <tr cellspacing="0" cellpadding="0" border="0" >
                        
                                                    </tr>
                                                    <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                        <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                                            <tr>
                                                                <td>
                                                                    <p style="color:rgba(0,0,0,0)">.</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Please do not reply to this email.</a></small>
                                            </td>
                                        </tr>
                                    </table>
                                </table>
                            </body> 
                        </html>`,
                        
                        }).then(res=>console.log("Succesfully sent"))
                            .catch(err=>console.log(err));
                } else {
                    authData.sendMail({
                        from: "no-reply@april.ca",
                        to: mailList,
                        subject: "We have received your claim request",
                        headers: {
                          "x-priority": "1",
                          "x-msmail-priority": "High",
                          importance: "high"
                      },
                      priority: 'high',
                     
                        html:  `<!DOCTYPE html>
                        <html lang="en">
                            <head>
                                <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                                <link rel="preconnect" href="https://fonts.gstatic.com">
                                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
                            </head>
                            <body bgcolor="#f2f2f2">
                                <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                    <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                        <tr cellspacing="0" cellpadding="0" border="0" >
                                            <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                                    <tr>
                                                        <td>
                                                            <img src="https://april-on.ca/april_logo_en.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </table>
                                <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                    <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                                        <tr>
                                            <td align="center">
                                                <table width="572" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td>
                                                            <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                <tr>
                                                                    <td colspan="2">
                                                                        <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">We have received your claim request.</h2>
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Hi,</p>
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">We are analyzing the following request and will be notified by email shortly.
                                                                            <ul>
                                                                            <ul><li>Policy number: ${data.policyNumber}</li>
                                                                            <li>Insured name: ${data.insured}</li>
                                                                            <li>Company Name: ${data.company}</li>
                                                                            <li>Email: ${data.email}</li>
                                                                            <li>Claim date: ${data.date}</li>
                                                                            <li>Province: ${data.province}</li>
                                                                            <li>Claim type: ${data.contractType}</li>
                                                                            <li>Claim reason: ${data.claimReason}</li>
                                                                            </ul>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                                <tr width="460">
                                                                    <td colspan="2" align="left">
                                                                        <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Contact Us</h2>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td valign="top" colspan="2">
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">If you have any questions please contact our team at <a href="info@april.ca" >info@april.ca</a></p>
                                                                        <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Best regards,</p>
                                                                        <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">The APRIL Canada Team</h1>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                        <tr>
                                            <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                                <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                                    <tr cellspacing="0" cellpadding="0" border="0" >
                        
                                                    </tr>
                                                    <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                        <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                                            <tr>
                                                                <td>
                                                                    <p style="color:rgba(0,0,0,0)">.</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Please do not reply to this email.</a></small>
                                            </td>
                                        </tr>
                                    </table>
                                </table>
                            </body> 
                        </html>`,
                        
                        }).then(res=>console.log("Succesfully sent"))
                            .catch(err=>console.log(err));
                }
                 
              }
          }
    
});
    

exports.sendResume = functions.https.onCall((data) => {
    
async function main() {
    
    var mailList = [
        `${data.email}`,
        // 'michael.babin@april.ca',
        'ressources.humaines@april.ca '
      ]

const authData=nodemailer.createTransport({
host: "smtp.gmail.com",
port: 465,
secure: true,
auth: {
user: SENDER_EMAIL,
pass: SENDER_PASSWORD,
},
});

if(data.language == 'fr')  {
authData.sendMail({
from: "no-reply@april.ca",
to: mailList,
subject: "Nous avons reçus votre requête",
text:   ``,
attachments: [{
filename: data.file,
path: data.filePath
}],
html:  `<!DOCTYPE html>
      <html lang="fr">
          <head>
              <meta http-equiv="content-type" content="text/html;charset=utf-8" />
              <link rel="preconnect" href="https://fonts.gstatic.com">
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
          </head>
          <body bgcolor="#f2f2f2">
              <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                  <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                      <tr cellspacing="0" cellpadding="0" border="0" >
                          <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                              <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                  <tr>
                                      <td>
                                          <img src="https://april-on.ca/april_logo_fr.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </table>
              <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                  <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                      <tr>
                          <td align="center">
                              <table width="572" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                      <td>
                                          <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                              <tr>
                                                  <td colspan="2">
                                                      <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">Nous avons reçu votre demande.</h2>
                                                      <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Bonjour ${data.firstName} ${data.lastName}</p>
                                                      <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">Nous sommes en train d'analyser votre demande suivante. Nous vous répondrons sou peu.
                                                          <ul>
                                                              <li>Courriel: ${data.email}</li>
                                                              <li>Téléphone: ${data.phone}</li>
                                                              <li>Nom du ficher: ${data.file}</li>
                                                              <li>Message: ${data.message}</li>
                                                          </ul>
                                                      </p>
                                                  </td>
                                              </tr>
                                          </table>
                                          <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                              <tr width="460">
                                                  <td colspan="2" align="left">
                                                      <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Nous Joindre</h2>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td valign="top" colspan="2">
                                                      <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Pour obtenir de l'aide ou pour toutes questions, n'hésitez pas à nous contacter à l'adresse suivante: <a href="mailto:info@april.ca" >info@april.ca</a></p>
                                                      <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Cordialement,</p>
                                                      <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">L'équipe d'APRIL Canada</h1>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
                  <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                      <tr>
                          <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                              <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                  <tr cellspacing="0" cellpadding="0" border="0" >
      
                                  </tr>
                                  <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                      <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                          <tr>
                                              <td>
                                                  <p style="color:rgba(0,0,0,0)">.</p>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td align="center">
                              <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Ne répondez pas à ce message &#8211; Les messages ne seront pas lus.</a></small>
                          </td>
                      </tr>
                  </table>
              </table>
          </body>
      </html>`,

}).then(res=>console.log("Succesfully sent"))
.catch(err=>console.log(err));
}  
else{   
authData.sendMail({
from: "no-reply@april.ca",
to: mailList,
subject: "We have received your request",
attachments: [{
filename: data.file,
path: data.filePath
}],
html:  `<!DOCTYPE html>
<html lang="en">
  <head>
      <meta http-equiv="content-type" content="text/html;charset=utf-8" />
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
  </head>
  <body bgcolor="#f2f2f2">
      <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
          <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
              <tr cellspacing="0" cellpadding="0" border="0" >
                  <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                      <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                          <tr>
                              <td>
                                  <img src="https://april-on.ca/april_logo_en.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </table>
      <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
          <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
              <tr>
                  <td align="center">
                      <table width="572" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                              <td>
                                  <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                      <tr>
                                          <td colspan="2">
                                              <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">We have received your request.</h2>
                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Hi ${data.firstName} ${data.lastName},</p>
                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">We are analyzing the following request and you will be notified by email shortly.
                                                  <ul>
                                                      <li>Email: ${data.email}</li>
                                                      <li>Phone: ${data.phone}</li>
                                                      <li>File Name: ${data.file}</li>
                                                      <li>Message: ${data.message}</li>
                                                  </ul>
                                              </p>
                                          </td>
                                      </tr>
                                  </table>
                                  <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                      <tr width="460">
                                          <td colspan="2" align="left">
                                              <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Contact Us</h2>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td valign="top" colspan="2">
                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">If you have any questions please contact our team at <a href="info@april.ca" >info@april.ca</a></p>
                                              <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Best regards,</p>
                                              <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">The APRIL Canada Team</h1>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
              <tr>
                  <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                      <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                          <tr cellspacing="0" cellpadding="0" border="0" >

                          </tr>
                          <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                              <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                  <tr>
                                      <td>
                                          <p style="color:rgba(0,0,0,0)">.</p>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td align="center">
                      <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Please do not reply to this email.</a></small>
                  </td>
              </tr>
          </table>
      </table>
  </body> 
</html>`,

}).then(res=>console.log("Succesfully sent"))
  .catch(err=>console.log(err));
}
  
   
  
 
}

main().catch(console.error);

  
});

exports.sendForm = functions.https.onCall((data) => {
    

    var mailList = [
                    `${data.email}`,
                    'info@april.ca',
                    // 'michael.babin@april.ca'
                  ]

    const authData=nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: SENDER_EMAIL,
            pass: SENDER_PASSWORD,
          },
        });

    if(data.language == 'fr')  {
      authData.sendMail({
        from: "no-reply@april.ca",
        to: mailList,
        subject: "Nous avons reçus votre requête",
        text:   ``,
        attachments: [{
            filename: data.file,
            path: data.filePath
        }],
        html:  `<!DOCTYPE html>
                  <html lang="fr">
                      <head>
                          <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                          <link rel="preconnect" href="https://fonts.gstatic.com">
                          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
                      </head>
                      <body bgcolor="#f2f2f2">
                          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                              <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                  <tr cellspacing="0" cellpadding="0" border="0" >
                                      <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                          <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                              <tr>
                                                  <td>
                                                      <img src="https://april-on.ca/april_logo_fr.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </table>
                          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                              <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                                  <tr>
                                      <td align="center">
                                          <table width="572" border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                  <td>
                                                      <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                          <tr>
                                                              <td colspan="2">
                                                                  <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">Nous avons reçu votre demande.</h2>
                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Bonjour ${data.fullName}</p>
                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">Nous sommes en train d'analyser votre demande suivante. Nous vous répondrons sou peu.
                                                                      <ul>
                                                                          <li>Courriel: ${data.email}</li>
                                                                          <li>Province: ${data.province}</li>
                                                                          <li>Catégorie du risque: ${data.risk}</li>
                                                                          <li>Nom du ficher: ${data.file}</li>
                                                                          <li>Message: ${data.message}</li>
                                                                      </ul>
                                                                  </p>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                          <tr width="460">
                                                              <td colspan="2" align="left">
                                                                  <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Nous Joindre</h2>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td valign="top" colspan="2">
                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Pour obtenir de l'aide ou pour toutes questions, n'hésitez pas à nous contacter à l'adresse suivante: <a href="mailto:info@april.ca" >info@april.ca</a></p>
                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Cordialement,</p>
                                                                  <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">L'équipe d'APRIL Canada</h1>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                              <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                  <tr>
                                      <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                          <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                              <tr cellspacing="0" cellpadding="0" border="0" >
                  
                                              </tr>
                                              <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                  <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                                      <tr>
                                                          <td>
                                                              <p style="color:rgba(0,0,0,0)">.</p>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align="center">
                                          <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Ne répondez pas à ce message &#8211; Les messages ne seront pas lus.</a></small>
                                      </td>
                                  </tr>
                              </table>
                          </table>
                      </body>
                  </html>`,
        
        }).then(res=>console.log("Succesfully sent"))
            .catch(err=>console.log(err));
    }  
    else{   
      authData.sendMail({
          from: "no-reply@april.ca",
          to: mailList,
          subject: "We have received your request",
          attachments: [{
            filename: data.file,
            path: data.filePath
        }],
          html:  `<!DOCTYPE html>
          <html lang="en">
              <head>
                  <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                  <link rel="preconnect" href="https://fonts.gstatic.com">
                  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
              </head>
              <body bgcolor="#f2f2f2">
                  <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                      <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                          <tr cellspacing="0" cellpadding="0" border="0" >
                              <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                  <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                      <tr>
                                          <td>
                                              <img src="https://april-on.ca/april_logo_en.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </table>
                  <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                      <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                          <tr>
                              <td align="center">
                                  <table width="572" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                          <td>
                                              <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                  <tr>
                                                      <td colspan="2">
                                                          <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">We have received your request.</h2>
                                                          <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Hi ${data.fullName},</p>
                                                          <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">We are analyzing the following request and you will be notified by email shortly.
                                                              <ul>
                                                              <li>Email: ${data.email}</li>
                                                              <li>Province: ${data.province}</li>
                                                              <li>Risk category: ${data.risk}</li>
                                                              <li>File name: ${data.file}</li>
                                                              <li>Message: ${data.message}</li>
                                                              </ul>
                                                          </p>
                                                      </td>
                                                  </tr>
                                              </table>
                                              <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                  <tr width="460">
                                                      <td colspan="2" align="left">
                                                          <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Contact Us</h2>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td valign="top" colspan="2">
                                                          <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">If you have any questions please contact our team at <a href="info@april.ca" >info@april.ca</a></p>
                                                          <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Best regards,</p>
                                                          <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">The APRIL Canada Team</h1>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                      <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                          <tr>
                              <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                  <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                      <tr cellspacing="0" cellpadding="0" border="0" >
          
                                      </tr>
                                      <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                          <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                              <tr>
                                                  <td>
                                                      <p style="color:rgba(0,0,0,0)">.</p>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td align="center">
                                  <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Please do not reply to this email.</a></small>
                              </td>
                          </tr>
                      </table>
                  </table>
              </body> 
          </html>`,
          
          }).then(res=>console.log("Succesfully sent"))
              .catch(err=>console.log(err));
    }
});

exports.sendDirect = functions.https.onCall((data) => {
    

    var mailList = [
                    `${data.email}`,
                    'info@elco.ca',
                    // 'michael.babin@april.ca'
                  ]

    const authData=nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: SENDER_EMAIL,
            pass: SENDER_PASSWORD,
          },
        });

    if(data.language == 'fr')  {
      authData.sendMail({
        from: "no-reply@april.ca",
        to: mailList,
        subject: "Nous avons reçus votre requête -- APRIL Construction",
        text:   ``,
        html:  `<!DOCTYPE html>
                  <html lang="fr">
                      <head>
                          <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                          <link rel="preconnect" href="https://fonts.gstatic.com">
                          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
                      </head>
                      <body bgcolor="#f2f2f2">
                          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                              <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                  <tr cellspacing="0" cellpadding="0" border="0" >
                                      <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                          <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                              <tr>
                                                  <td>
                                                      <img src="https://april-on.ca/april_logo_fr.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </table>
                          <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                              <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                                  <tr>
                                      <td align="center">
                                          <table width="572" border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                  <td>
                                                      <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                          <tr>
                                                              <td colspan="2">
                                                                  <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">Nous avons reçu votre demande.</h2>
                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Bonjour ${data.fullName}</p>
                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">Nous sommes en train d'analyser votre demande. Nous vous répondrons sous peu.
                                                                      <ul>
                                                                          <li>Courriel: ${data.email}</li>
                                                                          <li>Téléphone: ${data.phoneNumber}</li>
                                                                          <li>Activité principale: ${data.risk}</li>
                                                                          <li>Chiffre d'affaires annuel: ${data.revenue}</li>
                                                                          <li>Années d'expérience continue dans ce type d’activité: ${data.yExperience}</li>
                                                                      </ul>
                                                                  </p>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                          <tr width="460">
                                                              <td colspan="2" align="left">
                                                                  <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Nous Joindre</h2>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td valign="top" colspan="2">
                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Pour obtenir de l'aide ou pour toutes questions, n'hésitez pas à nous contacter à l'adresse suivante: <a href="mailto:info@april.ca" >info@april.ca</a></p>
                                                                  <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Cordialement,</p>
                                                                  <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">L'équipe d'APRIL Canada</h1>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                              <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                                  <tr>
                                      <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                          <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                              <tr cellspacing="0" cellpadding="0" border="0" >
                  
                                              </tr>
                                              <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                                  <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                                      <tr>
                                                          <td>
                                                              <p style="color:rgba(0,0,0,0)">.</p>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align="center">
                                          <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Ne répondez pas à ce message &#8211; Les messages ne seront pas lus.</a></small>
                                      </td>
                                  </tr>
                              </table>
                          </table>
                      </body>
                  </html>`,
        
        }).then(res=>console.log("Succesfully sent"))
            .catch(err=>console.log(err));
    }  
    else{   
      authData.sendMail({
          from: "no-reply@april.ca",
          to: mailList,
          subject: "We have received your request -- APRIL Construction",
          html:  `<!DOCTYPE html>
          <html lang="en">
              <head>
                  <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                  <link rel="preconnect" href="https://fonts.gstatic.com">
                  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:ital@1&display=swap" rel="stylesheet">
              </head>
              <body bgcolor="#f2f2f2">
                  <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                      <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                          <tr cellspacing="0" cellpadding="0" border="0" >
                              <td cellspacing="0" width="668" height="166" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                  <table width="568" height="132" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-top-right-radius:76px" >
                                      <tr>
                                          <td>
                                              <img src="https://april-on.ca/april_logo_en.png"  style="color:#fff; font-size: 80px; font-family:'Poppins',sans-serif;margin-left:20px;" alt="APRIL Canada">
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </table>
                  <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                      <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="padding-bottom:30px;padding-top:30px;">
                          <tr>
                              <td align="center">
                                  <table width="572" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                          <td>
                                              <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                  <tr>
                                                      <td colspan="2">
                                                          <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:28px;color:#323132;text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:bold;padding-top:0px;padding-bottom:8px;">We have received your request.</h2>
                                                          <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;font-weight:300;text-align:left;">Hi ${data.fullName},</p>
                                                          <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:300;line-height:24px;color:#656465;text-align:justify;">We are analyzing the following request and you will be notified by email shortly.
                                                              <ul>
                                                              <li>Email address
                                                              : ${data.email}</li>
                                                              <li>Phone Number: ${data.phoneNumber}</li>
                                                              <li>Principal Activity?: ${data.risk}</li>
                                                              <li>Annual revenue: ${data.revenue}</li>
                                                              <li>Number of years of experience: ${data.yExperience}</li>
                                                              </ul>
                                                          </p>
                                                      </td>
                                                  </tr>
                                              </table>
                                              <table width="460" border="0" cellspacing="0" cellpadding="0" align="center">
                                                  <tr width="460">
                                                      <td colspan="2" align="left">
                                                          <h2 style="font-family:'Poppins',sans-serif;font-size:13px;line-height:32px;color:#639e30;text-align:left;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-top:15px;margin-bottom:5px;">Contact Us</h2>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td valign="top" colspan="2">
                                                          <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">If you have any questions please contact our team at <a href="info@april.ca" >info@april.ca</a></p>
                                                          <p style="font-family:'Poppins',sans-serif;font-size:15px;line-height:24px;color:#656465;text-align:left;margin-bottom:15px;font-weight:300;">Best regards,</p>
                                                          <h1 style="font-family:'Roboto',sans-serif;font-size:18px;line-height:32px;color:#639e30;text-align:left;letter-spacing:2px;font-weight:normal;margin-top:15px;">The APRIL Canada Team</h1>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                      <table width="100%" bgcolor="#f2f2f2" border="0" cellspacing="0" cellpadding="0" align="center">
                          <tr>
                              <td align="center" cellspacing="0" cellpadding="0" border="0" align="center">
                                  <table width="668" bgcolor="#f9f9f9" border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;" >
                                      <tr cellspacing="0" cellpadding="0" border="0" >
          
                                      </tr>
                                      <td cellspacing="0" width="668" height="120" cellpadding="0" border="0" align="center" style="background-color:#f9f9f9; color:black" >
                                          <table width="568" height="90" bgcolor="#004161" border="0" cellspacing="0" cellpadding="0" align="center" style="border-bottom-left-radius:76px">
                                              <tr>
                                                  <td>
                                                      <p style="color:rgba(0,0,0,0)">.</p>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td align="center">
                                  <small style="font-family:verdana,sans-serif;font-size:11px;line-height:16px;color:#656465;text-align:center;">Please do not reply to this email.</a></small>
                              </td>
                          </tr>
                      </table>
                  </table>
              </body> 
          </html>`,
          
          }).then(res=>console.log("Succesfully sent"))
              .catch(err=>console.log(err));
    }
});




