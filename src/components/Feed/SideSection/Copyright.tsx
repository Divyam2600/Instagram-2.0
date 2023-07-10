import React from "react";

const Copyright = () => {
  const items = [
    "About",
    "Help",
    "Press",
    "API",
    "Jobs",
    "Privacy",
    "Terms",
    "Locations",
    "Top Accounts",
    "Hashtags",
    "Language",
  ];
  return (
    <div className="space-y-4 py-4 text-xs text-gray-400">
      {items.map((item, i) => (
        <span key={i}>
          <a className="cursor-pointer font-normal hover:underline">
            {item}
          </a>
          {!(i === items.length - 1) && " • "}
        </span>
      ))}
      <p>© 2022 INSTAGRAM 2.0 BY DIVYAM</p>
      <p>
        Note : This clone has been made only for educational purposes. No
        copyright intended.
      </p>
    </div>
  );
};

export default Copyright;
