import { Container } from "@/app/components/Container";

export const Footer = () => {
  return (
    <div className="w-full h-[280px] bg-[#4338ca] size-3.5 text-white flex flex-col p-10">
      <Container className="flex justify-between gap-12">
      <div className="flex flex-col gap-3 ">
        <div className="flex gap-2">
          <img className="w-4 h-4" src="film-white.svg" />
          <p className=" flex items-center size-4 font-bold italic ">MovieZ</p>
        </div>
        <p>© 2024 Movie Z. All Rights Reserved.</p>
      </div>
      <div className="flex gap-24 ">
        <div className="flex flex-col gap-3">
          <p>Contact Information</p>
          <div className="flex gap-3">
            <img className="w-4" src="mail.svg" />
            <div>
              <p className="font-semibold">Email:</p>
              <p>support@movieZ.com</p>
            </div>
          </div>
          <div className="flex gap-3">
            <img className="w-4" src="phone.svg" />
            <div>
              <p className="font-semibold">Phone:</p>
              <p>+976 (11) 123-4567</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p>Follow us</p>
          <div className="flex gap-3 font-semibold">
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
