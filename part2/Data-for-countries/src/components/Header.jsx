import React from "react";

const Header = () => {
  const links = [
    { href: "https://www.linkedin.com/in/alizainaslam/", label: "LinkedIn" },
    { href: "https://github.com/alizainaslam", label: "GitHub" },
  ];

  return (
    <header className="my-[10%] md:my-[3%]">
      <ul className="flex justify-end gap-6">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
