import React, { useState } from "react";
import SuccessDialog from "../../../components/AdminComponents/SuccessDialog"; // Import SuccessDialog
import DeleteDialog from "../../../components/AdminComponents/DeleteDialog"; // Import DeleteDialog
import { Button, Select, MenuItem } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";

import Admin from "../../../components/AdminComponents/SideBar";
import AdminHeader from "../../../components/AdminComponents/Header";
const header = (
  <AdminHeader title="Part details" subText="Below are the parts details" />
);

const Update = () => {
  const [formData, setFormData] = useState({
    partId: "132343545",
    partName: "Toyota corolla altus back lights",
    make: "Toyota",
    model: "2024",
    condition: "New",
    category: "Body Parts",
    price: "AED 200",
    description: "Lorem ipsum dolor sit amet. ",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [doneMessage, setDoneMessage] = useState("");
  const [title, setTitle] = useState("");
  const [deleteMessage, setDeleteMessage] = useState(
    "Are you sure you want to delete this item?"
  );

  const handleDialogOpen = () => {
    setTitle("Changes saved");
    setDoneMessage("Changes have been saved successfully!");
    setOpenSuccessDialog(true);
  };

  const handleDialogClose = () => {
    setOpenSuccessDialog(false);
  };

  const handleDeleteOpen = (index) => {
    setImageToDelete(index);
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setImageToDelete(null);
  };

  // Images Upload
  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files.length + uploadedImages.length <= 12) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    } else {
      alert("You can only upload a maximum of 12 images.");
    }
  };

  const handleDeleteConfirm = () => {
    // Delete logic here
    setOpenDeleteDialog(false);
    setDoneMessage("Deleted successfully!");
    setOpenSuccessDialog(true); // Show success dialog after deletion
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
                    width: "160px",
                    height: "30px",
                    textAlign: "left",
                    fontSize: "14px",
                    border: "1px solid gray",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "transparent",
                    },
                  }}
                >
                  <MenuItem value="Loaded">In stock</MenuItem>
                  <MenuItem value="Pending">Out of stock</MenuItem>
                </Select>
              </div>
              <Button
                variant="contained"
                className="w-[100px] h-[30px]"
                sx={{
                  textTransform: "capitalize",
                  fontSize: "12px",
                  backgroundColor: "#525354",
                  ":hover": {
                    backgroundColor: "#05387A",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="w-[140px] h-[30px]"
                sx={{
                  textTransform: "capitalize",
                  fontSize: "12px",
                  backgroundColor: "#08AD36",
                  ":hover": {
                    backgroundColor: "#08AD36",
                  },
                }}
                onClick={handleDialogOpen}
              >
                Update Details
              </Button>
            </div>
          </div>
        </div>
      </div>
      <img src="/src/assets/line.svg" alt="" />

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row justify-between text-left mt-4 overflow-hidden">
        {/* Primary Details Section */}
        <form className="w-2/3 p-4 bg-white rounded-lg">
          <div className="grid grid-cols-1 gap-4  justify-center items-center lg:grid-cols-2 lg:justify-start">
            <div>
              <label className="block text-sm font-medium text-[#3D4A5C]">
                Part ID
              </label>
              <input
                type="text"
                name="PartId"
                value={formData.partId}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Part name</label>
              <input
                type="text"
                name="PartName"
                value={formData.partName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Make</label>
              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Condition</label>
              <input
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm resize-none"
              />
            </div>
          </div>
        </form>

        {/* Image Section */}
        <div className="flex flex-col items-center overflow-hidden">
          <div className="border border-gray-300 p-8 w-full max-w-[360px] rounded-xl h-[290px]">
            <div className="flex justify-center items-center">
              <img src="/src/assets/img-icon.svg" alt="" />
            </div>
            <p className="text-sm text-center">Upload Media</p>
            <p className=" text-gray-500 text-[10px] text-center leading-4 my-2">
              Image thumbnail{" "}
              <span className="font-semibold text-black ">
                (Dimension: 507×461px, <br /> Format: jpg, jpeg, png, svg, Max
                size: 900 KB) <span className="text-red-500">*</span>
              </span>
            </p>
            <label
              htmlFor="upload"
              className="block cursor-pointer mt-4 text-center"
            >
              <span className="p-1.5 rounded-md bg-gray-300 text-[10px]">
                + Add media (image)
              </span>
            </label>
            <input
              type="file"
              id="upload"
              className="hidden"
              multiple
              accept=".jpeg, .jpg, .png, .svg"
              onChange={handleImageUpload}
            />
            <p className="text-center mt-10 text-[10px]">
              Upload maximum 12 images
            </p>
          </div>

          {uploadedImages.length > 0 && (
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-[#414042]">
                Uploaded images
              </h3>
              <div className="grid grid-cols-4 gap-1 mt-6">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Uploaded ${index + 1}`}
                      className="w-20 h-16 rounded-lg"
                    />
                    <IconButton
                      className="absolute -top-7 -right-12"
                      sx={{
                        outline: "none",
                        border: "none",
                        ":focus": {
                          outline: "none",
                          border: "none",
                        },
                      }}
                      onClick={() => handleDeleteOpen(index)}
                    >
                      <RiDeleteBin6Line
                        className="text-red-600"
                        style={{ width: "15px", height: "15px" }}
                      />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Done Dialog */}
        <SuccessDialog
          open={openSuccessDialog}
          onClose={handleDialogClose}
          title={title}
          message={doneMessage}
        />

        {/* Delete Dialog */}
        <DeleteDialog
          open={openDeleteDialog}
          onClose={handleDeleteClose}
          onDeleteConfirm={handleDeleteConfirm}
          message={deleteMessage}
        />
      </div>
    </div>
  );
};

function UpdatePartDetails() {
  return (
    <div>
      <Admin header={header} children={<Update />} />
    </div>
  );
}

export default UpdatePartDetails;
