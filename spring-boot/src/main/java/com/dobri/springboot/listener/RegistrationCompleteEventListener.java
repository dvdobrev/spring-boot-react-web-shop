package com.dobri.springboot.listener;

import com.dobri.springboot.event.RegistrationCompleteEvent;
import com.dobri.springboot.user.User;
import com.dobri.springboot.user.UserService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

/**
 * @author Dobrin Dobrev
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class RegistrationCompleteEventListener
        implements ApplicationListener<RegistrationCompleteEvent> {

    private final UserService userService;
    private final JavaMailSender mailSender;
    private User theUser;
    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        //1. Get the newly registered user
        theUser = event.getUser();

        //2. Create a verification token for the user
        String verificationToken = UUID.randomUUID().toString();

        //3. Save the verification token to the user
        userService.saveVerificationToken(theUser, verificationToken);

        //4. Create the verification URL to be sent to the user
        String url = event.getApplicationUrl() + "/register/verifyEmail?token=" + verificationToken;

        //5. Send the email to the user
//        try {
//            sendVerificationEmail(url);
//        } catch (MessagingException e) {
//            throw new RuntimeException(e);
//        } catch (UnsupportedEncodingException e) {
//            throw new RuntimeException(e);
//        }
        log.info("Click the link to verify your registration : {}", url);
    }

    public void sendVerificationEmail(String url) throws MessagingException, UnsupportedEncodingException {
        String subject = "Verify your registration";
        String senderName = "User verification portal";
        String mailContent = "<p> Hi, "+ theUser.getFirstName()+ ", </p>"+
                "<p>Thank you for registering with us,"+"" +
                "Please, follow the link below to complete your registration.</p>"+
                "<a href=\"" +url+ "\">Verify your email to activate your account (This link will expire in 10 minutes)</a>"+
                "<p> Thank you <br> Users Registration Portal Service";


        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom("dobrev.testmail@gmail.com", senderName);
        messageHelper.setTo(theUser.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);
        mailSender.send(message);
    }

}
