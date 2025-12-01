import Container from "./Container";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        <FooterTop />
        <FooterBottom />
        <div className="border-t py-4">
          <div className="flex flex-wrap items-center justify-center gap-2 text-center text-gray-600 text-sm">
            <span>&copy; {new Date().getFullYear()}</span>
            <Logo className="text-sm" />
            <span>All rights reserved.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
