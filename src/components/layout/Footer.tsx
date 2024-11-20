import {
  useGetAllCustomerSupportLinks,
  useGetAllDiscountedPeopleLinks,
  useGetLegalLinks,
  useGetProductsLinks,
  useGetTeamLinks,
} from "../../services/use-queries";
import FooterLink from "../FooterLink";

const Footer = () => {
  const { data: customerSupportLinks } = useGetAllCustomerSupportLinks();
  const { data: discountedPeopleLinks } = useGetAllDiscountedPeopleLinks();
  const { data: teamLinks } = useGetTeamLinks();
  const { data: productsLinks } = useGetProductsLinks();
  const { data: legalLinks } = useGetLegalLinks();

  const productLinks = [
    {
      links: productsLinks,
      title: "",
    },
    {
      links: teamLinks,
      title: "",
    },
    {
      links: discountedPeopleLinks,
      title: "",
    },
    {
      links: customerSupportLinks,
      title: "Customer Support",
    },
    {
      links: legalLinks,
      title: "&copy; Blue Apron, LLC 202",
    },
  ];

  return (
    <footer className="mt-auto grid grid-cols-[100px_120px_120px_1fr_1fr] bg-blue60 p-[2%] text-xs text-footer-primary md:grid-cols-5 md:p-[3%] lg:p-[4%] xl:px-[8%] xl:text-sm">
      {productLinks.map(({ links, title }, id) => (
        <section key={id} className="space-y-2">
          {title && (
            <span
              className="md:text-gray-50"
              dangerouslySetInnerHTML={{ __html: title }}
            ></span>
          )}
          {links?.map(({ id, name, to, type, test_id }) => (
            <FooterLink
              key={id}
              title={name}
              to={to}
              type={type}
              testId={test_id}
            ></FooterLink>
          ))}
        </section>
      ))}
    </footer>
  );
};

export default Footer;
