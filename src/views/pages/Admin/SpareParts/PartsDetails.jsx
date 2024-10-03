// App.js
import React, { useState } from "react";
import Admin from "../../../components/AdminComponents/SideBar";
import AdminHeader from "../../../components/AdminComponents/Header";
import { Button, MenuItem, Select } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

const header = (
  <AdminHeader title="Part details" subText="Below are the parts details" />
);

const PartDetails = () => {
  // State to hold the selected image
  const [selectedImage, setSelectedImage] = useState(
    "/src/assets/Parts/main.svg"
  );

  const handleImageClick = (index) => {
    setSelectedImage(`/src/assets/Parts/${index + 1}.svg`);
  };
  return (
    <div className="container mx-auto p-8 bg-white rounded-xl">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-5">
        {/* Left Panel */}
        <div>
          <h1 className="text-xl font-semibold text-left ">
            Toyota corolla altus back lights
          </h1>
          {/* Barcode side */}
          <div className="flex gap-3 mt-1">
            <span className=" bg-green-200 text-green-700 px-2 py-1 rounded-lg text-sm">
              In stock
            </span>
            <img src="/src/assets/barcode.svg" alt="Bar-code" />
          </div>
        </div>
        {/* Right Panel */}
        <div className="lg:mt-4">
          {/* Buttons */}
          <div>
            <p className="text-sm text-left">status</p>
            <div className="flex gap-2">
              <div>
                <Select
                  defaultValue="Loaded"
                  variant="outlined"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    width: "160px", // Custom width
                    height: "30px",
                    textAlign: "left",
                    fontSize: "14px",
                    border: "1px solid gray",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "transparent",
                    },
                  }}
                >
                  <MenuItem value="Loaded">Loaded</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </div>
              <RouterLink to={"/admin/part-details/update-parts"}>
                <Button
                  variant="contained"
                  className="w-[135px] h-[30px]"
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "12px",
                    backgroundColor: "#05387A",
                    ":hover": {
                      backgroundColor: "#05387A",
                    },
                  }}
                >
                  Edit Car Details
                </Button>
              </RouterLink>
              <RouterLink to={"/admin/part-details/add-part"}>
                <Button
                  variant="contained"
                  className="w-[180px] h-[30px]"
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "12px",
                    backgroundColor: "#08AD36",
                    ":hover": {
                      backgroundColor: "#08AD36",
                    },
                  }}
                >
                  + Add Car to Live Auction
                </Button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <img src="/src/assets/line.svg" alt="" />

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row justify-between text-left mt-8 overflow-x-auto">
        {/* Primary Details Section */}
        <div className="flex-1 space-y-4 min-w-[300px]">
          <h2 className="text-md font-semibold text-[#48505E]">
            Primary Details
          </h2>
          <div className="space-y-4">
            <div className="flex">
              <p className="car-details">Part ID/S No</p>
              <p className="text-sm">123234242</p>
            </div>

            <div className="flex">
              <p className="car-details">Part name</p>
              <p className="text-sm">Toyota corolla altus back lights</p>
            </div>
            <div className="flex">
              <p className="car-details">Make</p>
              <p className="text-sm">Toyota</p>
            </div>
            <div className="flex">
              <p className="car-details">Model</p>
              <p>2024</p>
            </div>
            <div className="flex">
              <p className="car-details">Year</p>
              <p className="text-sm">2024</p>
            </div>
            <div className="flex">
              <p className="car-details">Category</p>
              <p className="text-sm">Body Parts</p>
            </div>
            <div className="flex">
              <p className="car-details">Condition</p>
              <p className="text-sm">New</p>
            </div>
            <div className="flex">
              <p className="car-details">Price</p>
              <p className="text-sm">AED 200</p>
            </div>
            <div className="flex">
              <p className="car-details">Description</p>
              <p className="text-sm col-span-2">
                Lorem ipsum fatende antere oaktat.
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex flex-col items-center lg:ml-8 mt-8 lg:mt-0 min-w-[300px]">
          {/* Display the selected image */}
          <div className="bg-[#F6F6FF] p-6 rounded-lg mb-4 w-full h-full flex justify-center items-center">
            <img
              src={selectedImage}
              alt="Car"
              className=" w-[240px] h-[140px] "
            />
          </div>

          {/* Thumbnail grid */}
          <div className="grid grid-cols-5 gap-2 ">
            {Array(4)
              .fill()
              .map((_, i) => (
                <img
                  key={i}
                  src={`/src/assets/Parts/${i + 1}.svg`}
                  alt={`Car thumbnail ${i + 1}`}
                  className="w-16 h-16 rounded-lg object-cover cursor-pointer"
                  onClick={() => handleImageClick(i)} // Handle click to change the selected image
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function Part_Details() {
  return (
    <div>
      <Admin header={header} children={<PartDetails />} />
    </div>
  );
}

export default Part_Details;
