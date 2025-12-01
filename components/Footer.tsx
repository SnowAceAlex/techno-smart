import Container from "./Container";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";
import { SubText } from "./ui/text";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        <FooterTop />
        <FooterBottom />
        <div className="border-t py-4">
          <SubText className="text-center">
            &copy; {new Date().getFullYear()} <Logo className="text-sm" />. All
            rights reserved.
          </SubText>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
