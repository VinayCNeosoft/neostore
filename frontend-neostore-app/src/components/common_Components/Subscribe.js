import React from 'react'
import { Alert, Container } from 'react-bootstrap'

function Subscribe() {
    return (
        <div>
            <br/><br/><br/>
            <Container>
            <Alert variant="success">
                <Alert.Heading>Hey, Thank You for Subscribing to Our Newsletter!</Alert.Heading>
                <p>
                You will soon receive an email with instructions on how to verify your email address and confirm your subscription.
                </p>
                <hr />
                </Alert>
            </Container>
            <br/>
        </div>
    )
}

export default Subscribe
