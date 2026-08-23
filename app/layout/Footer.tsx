import { Container } from "@/app/components/Container";

export const Footer = () => {
  return (
    <div className="w-full bg-[#4338ca] text-white py-8 md:py-10">
      <Container className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-12">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <img className="w-4 h-4" src="/film-white.svg" alt="logo" />
            <p className="font-bold italic">MovieZ</p>
          </div>
          <p className="text-sm md:text-base">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 md:gap-24">
          <div className="flex flex-col gap-3">
            <p>Contact Information</p>
            <div className="flex gap-3">
              <img className="w-4" src="/mail.svg" alt="email" />
              <div>
                <p className="font-semibold">Email:</p>
                <p className="break-all">support@movieZ.com</p>
              </div>
            </div>
            <div className="flex gap-3">
              <img className="w-4" src="/phone.svg" alt="phone" />
              <div>
                <p className="font-semibold">Phone:</p>
                <p>+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p>Follow us</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 font-semibold">
              <p>Facebook</p>
              <p>Instagram</p>
              <p>Twitter</p>
              <p>Youtube</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
