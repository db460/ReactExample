import Container from 'react-bootstrap/Container';
import { MyNavbar } from './MyNavbar';
import { SEO } from './SEO';

export function PrivacyPolicy(){
    const seo = (<SEO
        title='Privacy Policy'
        description='Privacy policy for AnimeWay. See how your data is being securely handled.'
        name='AnimeWay'
        type='website'
     />)

    return(
        <Container className='mw-100 container-fluid d-flex flex-column' style={{height: "100vh"}}>
            {seo}
            <MyNavbar/>
            <div style={{flex: 1}} className="d-flex row text-start">
                <div className="col-lg-10 px-sm-5 mx-auto">
                    <p>Thank you for using AnimeWay. At CherryHana LLC ("Company", "we", "us", "our"), we are committed to protecting your personal information and your right to privacy.</p>
                    <p>When you visit our website (the "Website"), use our mobile application (the "App", "AnimeWay") and more generally, use any of our services (the "Services", which include the Website and App), we appreciate that you are trusting us with your personal information.</p>
                    <p>This document outlines our stance on privacy for AnimeWay. We encourage you to read this document carefully.</p>
                    <p><b>If there are any conditions that you do not agree with, please discontinue use of the Services.</b></p>
                    <h3>Data We Collect</h3>
                    <ul>
                        <li>
                            <h4>Personal Data and your AnimeWay Account</h4>
                            <ul>
                                <li>You are required to provide basic personal information such as your Email Address in order to create am AnimeWay Account.</li>
                                <li>We encourage you to use your primary email to sign up for AnimeWay to ensure your continued access to your own data.</li>
                                <li>You can also use a third party login such as signing in with Google.</li>
                                <li>If you lose access to your email or third party login, you will lose access to your AnimeWay account. We cannot restore or change email addresses for security reasons.</li>
                            </ul>
                        </li>
                        <li>
                            <h4>Your Show Data</h4>
                            <ul>
                                <li>AnimeWay is a show preference app and platform. You select shows to watch which are recorded by AnimeWay. We consider this to be your data.</li>
                            </ul>
                        </li>
                        <li>
                            <h4>AdMod Monetization and AdSense</h4>
                            <ul>
                                <li>We use AdMod and AdSense for monetization of AnimeWay. Google Mobile Ads and AdSense collect device's IP address, which may be used to estimate the general location of a device. It collects user product interactions and interaction information, including app launch, taps, and video views. It collects Android advertising (ad) ID, app set ID, and, if applicable, other identifiers related to signed-in accounts on the device</li>
                            </ul>
                        </li>
                        <li>
                            <h4>Customer Support</h4>
                            <ul>
                                <li>If you message or contact us for support purposes, you may communicate personally identifiable information to us (such as your email address and debug information) in the process.</li>
                            </ul>
                        </li>
                        <li>We retain support emails in order to improve customer service</li>
                    </ul>
                    <h3>Data Processing</h3>
                    <ul>
                        <li>
                            <h4>Location</h4>
                            <ul>
                                <li>We store user information on servers located in the United States and other countries. This means that information may be processed, stored, and used outside of the country in which you are located.</li>
                                <li>If you provide Personal Data through the Services, you acknowledge and agree that such Personal Data may be transferred from your current location to servers in other locations.</li>
                                <li>Personal Data can be deleted by emailing the request to <a className='link-info' href='mailto:animewayguide@gmail.com?subject=AnimeWay Data Delete'>animewayguide@gmail.com</a>.</li>
                            </ul>
                        </li>
                        <li>
                            <h4>Data Retention</h4>
                            <ul>
                                <li>We retain your data indefinitely in order to provide the Services. However, you can request deletion of your data at any time by contacting us by emailing <a className='link-info' href='mailto:animewayguide@gmail.com?subject=AnimeWay Account Deletion'>animewayguide@gmail.com</a>.</li>
                            </ul>
                        </li>
                        <li>
                            <h4>Children</h4>
                            <ul>
                                <li>AnimeWay does not knowingly collect Personal Data from children under the age of 13 and do not target our services to children under 13. If you are under 13, please do not submit any Personal Data through the Services.</li>
                                <li>We encourage parents and legal guardians to monitor their children's Internet usage and to help enforce our Privacy Policy by instructing their children to never provide Personal Data through any of our Services. If you have reason to believe that a child under the age of 13 has provided Personal Data to us, please contact us, and we will discontinue the provision of services accordingly.</li>
                            </ul>
                        </li>
                        <li>
                            <h4>Closing Your Account</h4>
                            <ul>
                                <li>You can close your AnimeWay Account at any time. To close your AnimeWay Account, please contact us by emailing <a className='link-info' href='mailto:animewayguide@gmail.com?subject=AnimeWay Close Account'>animewayguide@gmail.com</a>.</li>
                            </ul>
                        </li>
                    </ul>
                    <h3>Changes to this Policy</h3>
                    <ul>
                        <li>This policy replaces all previous policies. We reserve the right to change this policy at any time.</li>
                    </ul>
                    <p>Last Updated: October 13, 2023</p>
                </div>
            </div>
        </Container>
    )
}



       