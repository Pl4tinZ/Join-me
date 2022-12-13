<?php

########### CONFIG ###############

$recipient = $_POST['name'];
$redirect = 'http://gruppe-329.developerakademie.net/Join/success.html';

$htmlContent = ' 
    <html> 
    <head> 
        <title>Reset Password</title> 
    </head> 
    <body> 
    <section style="display: flex; justify-content: center; align-items: center; flex-direction: column; background-color: #F2F3F8;">
        <div class="logo"><img src="img/Capa 1.png" style="height: 100px; margin-bottom: 36px;"></div>
        <div class="content" style="width: 650px; height: 350px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background-color: #ffffff; gap: 16px;">
            <div class="headline">
                <h2>You have requested to reset your password</h2>
            </div>
            <div class="description" style="margin-bottom: 50px;">
                <span style="color: rgba(0, 0, 0, 0.6);">We cannot simply send you your old password. A unique link to reset your password has been generated for you. 
                    To reset your password, click the following link and follow the instructions. </span>
            </div>
            <div class="reset_btn" style="color: white;">
                <button style="padding: 10px; border-radius: 50px; background-color: #20E277; border: none; width: 200px;"><a href="https://gruppe-329.developerakademie.net/Join/templates/reset_password.html">RESET PASSWORD</a></button>
            </div>
        </div>
    </section>
    </body> 
    </html>'; 



########### CONFIG END ###########



########### Intruction ###########   
#
#   This script has been created to send an email to the $recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST rewquest to this file, including
#     [name] The name of the sender (Absender)
#     [message] Message that should be send to you
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $subject = "Join reset password";
        $headers = "From:  noreply@joinsupport.com";

        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";


        mail($recipient, $subject, $htmlContent, $headers);
        header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
