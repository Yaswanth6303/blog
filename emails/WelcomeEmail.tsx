import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  baseUrl: string;
}

export const WelcomeEmail = ({
  baseUrl = "https://yourblog.com",
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Yaswanth Gudivada's digital notebook</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={logoText}>Yaswanth Gudivada</Text>
        </Section>
        <Heading style={h1}>Welcome to the newsletter!</Heading>
        <Text style={text}>
          Thank you for subscribing to my digital notebook. I'm excited to have you here!
        </Text>
        <Text style={text}>
          You will now receive fresh articles and technical insights directly in your inbox whenever I publish new content.
        </Text>
        <Section style={btnContainer}>
          <Link href={`${baseUrl}`} style={button}>
            Visit the Blog
          </Link>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          You are receiving this because you subscribed to my digital notebook. 
          If you no longer wish to receive these emails, you can unsubscribe anytime.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

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
  fontSize: "32px",
  fontWeight: "700",
  fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  padding: "0",
  margin: "0 0 16px 0",
  lineHeight: "1.2",
};

const text = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 24px 0",
};

const btnContainer = {
  textAlign: "left" as const,
};

const button = {
  backgroundColor: "#111827",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "48px 0 24px 0",
};

const footer = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "20px",
};
