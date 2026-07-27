import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export const ContactEmail = ({
  name = "John Doe",
  email = "johndoe@example.com",
  topic = "General inquiry",
  message = "Hello, I wanted to reach out regarding...",
}: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>New contact form submission from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={logoText}>New Message Received</Text>
        </Section>
        <Heading style={h1}>Contact Form Submission</Heading>
        
        <Text style={label}>Name</Text>
        <Text style={value}>{name}</Text>

        <Text style={label}>Email</Text>
        <Text style={value}>{email}</Text>

        <Text style={label}>Topic</Text>
        <Text style={value}>{topic}</Text>

        <Hr style={hr} />

        <Text style={label}>Message</Text>
        <Text style={messageValue}>{message}</Text>

        <Hr style={hr} />
        
        <Text style={footer}>
          This email was sent from your portfolio's contact form.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ContactEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const header = {
  paddingBottom: "24px",
  borderBottom: "1px solid #e5e7eb",
  marginBottom: "32px",
};

const logoText = {
  fontSize: "20px",
  fontWeight: "600",
  fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  color: "#111827",
  margin: "0",
};

const h1 = {
  color: "#111827",
  fontSize: "24px",
  fontWeight: "700",
  fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  padding: "0",
  margin: "0 0 24px 0",
  lineHeight: "1.2",
};

const label = {
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0 0 4px 0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const value = {
  color: "#111827",
  fontSize: "16px",
  margin: "0 0 24px 0",
};

const messageValue = {
  color: "#111827",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 24px 0",
  whiteSpace: "pre-wrap" as const,
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
};

const footer = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "20px",
};
