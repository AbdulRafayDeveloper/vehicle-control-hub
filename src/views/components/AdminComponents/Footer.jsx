import React from "react";

const Footer = () => {
  return (
    <div
      className="flex justify-between bg-white p-2"
      style={{
        flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on larger screens
        padding: { xs: "10px", sm: "20px" },
      }}
    >
      <div
        className="text-[#636467] text-[12px] pl-8"
        style={{ textAlign: { xs: "center", sm: "left" } }}
      >
        All Rights Reserved
      </div>
      <div
        className="flex gap-3"
        style={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
        }}
      >
        <div className="text-[#636467] text-[12px] mt-1">Follow Us</div>
        <div className="flex gap-1">
          <img src="/src/assets/linkedin.svg" alt="linkedIn" />
          <img src="/src/assets/youtube.svg" alt="Youtube" />
          <img src="/src/assets/instagram.svg" alt="Instagram" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
