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

interface BlogNotificationProps {
  postTitle: string;
  postExcerpt: string;
  postSlug: string;
  baseUrl: string;
}

export const BlogNotificationEmail = ({
  postTitle = "A New Article is Live",
  postExcerpt = "Check out my latest thoughts, ideas, and technical insights in this new article.",
  postSlug = "hello-world",
  baseUrl = "https://blog.shellcraft.online",
}: BlogNotificationProps) => (
  <Html>
    <Head />
    <Preview>{postTitle}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={logoText}>Yaswanth Gudivada</Text>
        </Section>
        <Heading style={h1}>{postTitle}</Heading>
        <Text style={text}>{postExcerpt}</Text>
        <Section style={btnContainer}>
          <Link href={`${baseUrl}/articles/${postSlug}`} style={button}>
            Read the full article
          </Link>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          You are receiving this because you subscribed to my digital notebook. 
          If you no longer wish to receive these emails, you can unsubscribe below.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default BlogNotificationEmail;

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
