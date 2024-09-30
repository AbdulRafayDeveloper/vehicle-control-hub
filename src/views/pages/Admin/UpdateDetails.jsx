import React, { useState } from "react";
import Admin from "../../components/AdminComponents/SideBar";
import AdminHeader from "../../components/AdminComponents/Header";
import {
  Button,
  MenuItem,
  Select,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  DialogContentText,
  DialogTitle,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { RiDeleteBin6Line } from "react-icons/ri";

const header = (
  <AdminHeader title="Car details" subText="Below are the car details" />
);

const CarDetails = () => {
  const [formData, setFormData] = useState({
    carId: "132343545",
    chassisNumber: "5456345434",
    carName: "Toyota Corolla Altis",
    make: "Toyota",
    model: "Corolla",
    year: "2024",
    color: "White",
    mileage: "2,000 Km",
    fuelType: "Petrol",
    transmission: "Automatic",
    condition: "Used",
    price: "AED 30,000",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null); // Track the image index to delete

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
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeleteOpen = (index) => {
    setImageToDelete(index); // Set the index of the image to be deleted
    setOpenDeleteDialog(true); // Open the confirmation dialog
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false); // Close the dialog
    setImageToDelete(null); // Reset the image to delete
  };

  const handleDeleteConfirm = () => {
    const updatedImages = uploadedImages.filter(
      (image, index) => index !== imageToDelete
    );
    setUploadedImages(updatedImages);
    handleDeleteClose();
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-xl">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-5">
        {/* Left Panel */}
        <div>
          <h1 className="text-xl font-semibold text-left ">
            Toyota corolla altus
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
              <RouterLink to={"/admin/car-details/update-details"}>
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
              </RouterLink>
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
                Update Car Details
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row justify-between text-left mt-4 overflow-hidden">
        {/* Primary Details Section */}
        <form className="w-2/3 p-4 bg-white rounded-lg">
          <div className="grid grid-cols-1 gap-4  justify-center items-center lg:grid-cols-2 lg:justify-start">
            <div>
              <label className="block text-sm font-medium text-[#3D4A5C]">
                Car ID
              </label>
              <input
                type="text"
                name="carId"
                value={formData.carId}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Chassis number
              </label>
              <input
                type="text"
                name="chassisNumber"
                value={formData.chassisNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Car name</label>
              <input
                type="text"
                name="carName"
                value={formData.carName}
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
              <label className="block text-sm font-medium">Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Mileage</label>
              <input
                type="text"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Fuel type</label>
              <input
                type="text"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Transmission</label>
              <input
                type="text"
                name="transmission"
                value={formData.transmission}
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
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-24 text-sm resize-none"
            />
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
                (Dimension: 507×461px, <br /> Format: jpg, jpeg, webp, Max size:
                900 KB) <span className="text-red-500">*</span>
              </span>
            </p>
            <label
              htmlFor="upload"
              className="block cursor-pointer mt-4 text-center"
            >
              <span className="p-1.5 rounded-md  bg-gray-300 text-[10px]">
                + Add media (image)
              </span>
            </label>
            <input
              type="file"
              id="upload"
              className="hidden"
              multiple
              accept="image/jpeg, image/jpg, image/webp, image/svg"
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

        {/* Update Dialog Box */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogContent>
            <div className="flex flex-col items-center">
              <img
                src="/src/assets/done-icon.svg"
                alt="Success"
                className="w-20 h-20 mb-4"
              />
              <Typography
                variant="h6"
                component="div"
                className="mb-2 text-xl font-semibold"
              >
                Changes saved
              </Typography>
              <Typography variant="subtitle2">
                Changes have been saved successfully
              </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDialogClose}
              variant="contained"
              sx={{
                width: 100,
                height: 30,
                marginX: 15,
                marginTop: "-10px",
                marginBottom: "20px",
                backgroundColor: "#08AD36",
                "&:hover": { backgroundColor: "#08AD36" },
              }}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
          <DialogContent>
            <div className="flex flex-col items-center">
              <img
                src="/src/assets/delete-icon.svg"
                alt="Success"
                className="w-20 h-20 mb-4"
              />
              <Typography
                variant="h6"
                component="div"
                className="mb-2 text-xl font-semibold"
              >
                Are you sure?
              </Typography>
              <Typography variant="subtitle2">
                You won't be able to revert this!
              </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <div>
              <Button
                onClick={handleDeleteClose}
                variant="outlined"
                sx={{
                  width: 100,
                  height: 30,
                  marginLeft: 10,
                  marginTop: "-10px",
                  marginBottom: "20px",
                  textTransform: "capitalize",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                variant="contained"
                sx={{
                  width: 100,
                  height: 30,
                  marginRight: 10,
                  marginLeft: 3,
                  marginTop: "-10px",
                  marginBottom: "20px",
                  backgroundColor: "#E03137",
                  textTransform: "capitalize",
                  "&:hover": { backgroundColor: "#E03137" },
                }}
              >
                Delete
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

function UpdateDetails() {
  return (
    <div>
      <Admin header={header} children={<CarDetails />} />
    </div>
  );
}

export default UpdateDetails;
