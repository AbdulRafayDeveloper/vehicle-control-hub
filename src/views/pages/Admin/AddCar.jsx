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
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import EvStationOutlinedIcon from "@mui/icons-material/EvStationOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AirlineSeatReclineExtraOutlinedIcon from "@mui/icons-material/AirlineSeatReclineExtraOutlined";
import { PiSteeringWheel } from "react-icons/pi";
import { PiEngineBold } from "react-icons/pi";
import { GiCarDoor } from "react-icons/gi";
import { BiSolidColorFill } from "react-icons/bi";
import { BsFileEarmarkText } from "react-icons/bs";
import { width } from "@mui/system";
import { Luggage } from "@mui/icons-material";

const header = (
  <AdminHeader title="Car details" subText="Below are the car details" />
);

const CarDetails = () => {
  const [formData, setFormData] = useState({
    length: "4950mm",
    width: "2100mm",
    height: "1550mm",
    totalWidth: "2140mm",
    wheelbase: "2850mm",
    grossWeight: "1200kg",
    totalHeight: "1830mm",
    loadingWeight: "1200 kg",
    capacity: "480",
    roofLoad: "400kg",
    luggage: "850",
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
  const handleDialogClose = () => setOpenDialog(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const [count, setCount] = useState(2);
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  return (
    <div className="container mx-auto p-8 bg-white rounded-xl">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-5">
        {/* Left Panel */}
        <div>
          <h1 className="text-xl font-semibold text-left ">Add New Car</h1>
          <p className="text-xs text-[#545151">
            Fill the below details to add a new car
          </p>
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
                className="w-[105px] h-[30px]"
                sx={{
                  textTransform: "capitalize",
                  fontSize: "12px",
                  backgroundColor: "#08AD36",
                  ":hover": {
                    backgroundColor: "#08AD36",
                  },
                }}
              >
                + Add Car
              </Button>
            </div>
          </div>
        </div>
      </div>
      <img src="/src/assets/line.svg" alt="" />

      {/* Content Section */}
      <div className="text-left mt-4 overflow-hidden">
        {/* Upload Image Section */}
        <div className="border rounded-lg p-2 mb-4 flex justify-between items-center">
          <h2 className="text-gray-800 text-lg font-semibold">Upload images</h2>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            sx={{
              textTransform: "capitalize",
              width: 105,
              height: 30,
              fontSize: "12px",
              backgroundColor: "#08AD36",
              ":hover": {
                backgroundColor: "#08AD36",
              },
            }}
          >
            Upload
          </Button>
        </div>
        {/* Specifications */}
        <div className="p-6 bg-white border rounded-lg  ">
          <h1 className="text-xl font-semibold text-left ">
            General Specifications
          </h1>
          <p className="block text-base text-[#3D4A5C] my-2">Price</p>
          <h1 className="text-2xl font-semibold text-left ">
            AED <span className="text-[#9B9B9B]">00,00</span>
          </h1>

          <form className="py-8">
            <div className="grid grid-cols-1 gap-4  justify-center items-center lg:grid-cols-2 lg:justify-start">
              <div>
                <label className="block text-sm font-medium text-[#3D4A5C]">
                  <DirectionsCarFilledOutlinedIcon
                    className="mr-2"
                    fontSize="small"
                  />
                  Body Type
                </label>
                <FormControl fullWidth>
                  <Select defaultValue="Coupe" className="h-10 mt-3">
                    <MenuItem value="Coupe">Coupe</MenuItem>
                    <MenuItem value="Sedan">Sedan</MenuItem>
                    <MenuItem value="Crossover">Crossover</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3D4A5C]">
                  <PersonOutlineOutlinedIcon
                    className="mr-2"
                    fontSize="small"
                  />
                  Condition
                </label>
                <FormControl fullWidth>
                  <Select defaultValue="New" className="h-10 mt-3">
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Grade3">Grade3</MenuItem>
                    <MenuItem value="Grade2">Grade2</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <label className=" text-sm font-medium flex gap-1.5">
                  <img
                    src="/src/assets/Sliders.svg"
                    alt=""
                    width={18}
                    height={18}
                  />
                  <p>Transmissions</p>
                </label>
                <FormControl fullWidth>
                  <Select defaultValue="Manual" className="h-10 mt-3">
                    <MenuItem value="Manual">Manual</MenuItem>
                    <MenuItem value="Auto">Auto-Gear</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  <SpeedOutlinedIcon className="mr-2" fontSize="small" />
                  loadingWeight
                </label>
                <input
                  type="text"
                  name="totalWidth"
                  className="mt-3 block w-full p-2 border border-gray-300 rounded-md text-sm h-10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  <EvStationOutlinedIcon className="mr-2" fontSize="small" />
                  Fuel Type
                </label>
                <FormControl fullWidth>
                  <Select defaultValue="Petrol" className="h-10 mt-3">
                    <MenuItem value="Petrol">Petrol</MenuItem>
                    <MenuItem value="CNG">CNG</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  <CalendarMonthOutlinedIcon
                    className="mr-2"
                    fontSize="small"
                  />
                  grossWeight
                </label>
                <FormControl fullWidth>
                  <Select defaultValue="2024" className="h-10 mt-3">
                    <MenuItem value="2024">2024</MenuItem>
                    <MenuItem value="2023">2023</MenuItem>
                    <MenuItem value="2022">2022</MenuItem>
                    <MenuItem value="2016">2016</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  <AirlineSeatReclineExtraOutlinedIcon
                    className="mr-2"
                    fontSize="small"
                  />
                  Seat capacity (Passenger)
                </label>
                <div className="flex items-center justify-between border rounded-lg p-2 bg-gray-100 h-10 mt-3">
                  <IconButton
                    onClick={handleDecrement}
                    sx={{
                      "&:focus": {
                        outline: "none",
                      },
                      "&:active": {
                        outline: "none",
                      },
                    }}
                    disabled={count <= 1}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <span className="text-md font-medium">{count}</span>
                  <IconButton
                    onClick={handleIncrement}
                    sx={{
                      "&:focus": {
                        outline: "none",
                      },
                      "&:active": {
                        outline: "none",
                      },
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
              <div>
                <label className="flex gap-1 text-sm font-medium">
                  <PiSteeringWheel className="w-5 h-5" />
                  <p> Drive type</p>
                </label>
                <FormControl fullWidth>
                  <Select
                    defaultValue="All-Wheel Drive (AWD)"
                    className="h-10 mt-3"
                  >
                    <MenuItem value="All-Wheel Drive (AWD)">
                      All-Wheel Drive (AWD)
                    </MenuItem>
                    <MenuItem value="Rear-Wheel Drive">
                      Rear-Wheel Drive
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <label className="flex gap-2 text-sm font-medium">
                  <PiEngineBold className="w-5 h-5" />
                  <p>Engine size</p>
                </label>
                <FormControl fullWidth>
                  <Select defaultValue="1.6cc" className="h-10 mt-3">
                    <MenuItem value="1.6cc">1.6cc</MenuItem>
                    <MenuItem value="1.794cc">1.794cc</MenuItem>
                    <MenuItem value="2.2cc">2.2cc</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <label className="flex gap-2 text-sm font-medium">
                  <GiCarDoor className="w-5 h-5" />
                  <p>Doors</p>
                </label>
                <FormControl fullWidth>
                  <Select defaultValue="4" className="h-10 mt-3">
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <label className="flex gap-2 text-sm font-medium">
                  <img
                    src="/src/assets/clynder.svg"
                    alt=""
                    width={18}
                    height={18}
                  />
                  <p>Clynder</p>
                </label>
                <FormControl fullWidth>
                  <Select defaultValue="12" className="h-10 mt-3">
                    <MenuItem value="12">12</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <label className="flex gap-2 text-sm font-medium">
                  <BiSolidColorFill className="w-5 h-5" />
                  <p>Color</p>
                </label>
                <FormControl fullWidth>
                  <Select defaultValue="White" className="h-10 mt-3">
                    <MenuItem value="White">White</MenuItem>
                    <MenuItem value="Black">Black</MenuItem>
                    <MenuItem value="Grey">Grey</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="mt-4">
              <label className="flex gap-2 text-sm font-medium">
                <BsFileEarmarkText className="w-5 h-5" />
                <p>Chasis</p>
              </label>
              <input
                type="text"
                name="totalWidth"
                className="mt-3 block w-1/2 p-2 border border-gray-300 rounded-md text-sm h-10"
              />
            </div>
          </form>
        </div>
        {/* Features */}
        <div className="p-6 border rounded-md my-4">
          <h1 className="text-xl font-semibold text-left mb-6">Features</h1>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {/* Interior */}
            <div>
              <h3 className="font-semibold mb-4">Interior</h3>
              <div className="space-y-3">
                <label className="flex items-center text-sm ">
                  <input type="checkbox" className="mr-2" />
                  Air Conditioner
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Digital Odometer
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Heater
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Leather Seats
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Panoramic Moonroof
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Tachometer
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Touchscreen Display
                </label>
              </div>
            </div>

            {/* Safety */}
            <div>
              <h3 className="font-semibold mb-2">Safety</h3>
              <div className="space-y-4">
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Anti-lock Braking
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Brake Assist
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Child Safety Locks
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Driver Air Bag
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Power Door Locks
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Stability Control
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Traction Control
                </label>
              </div>
            </div>

            {/* Exterior */}
            <div>
              <h3 className="font-semibold mb-2">Exterior</h3>
              <div className="space-y-4">
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Fog Lights Front
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Rain Sensing Wiper
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Rear Spoiler
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Windows - Electric
                </label>
              </div>
            </div>

            {/* Comfort & Convenience */}
            <div>
              <h3 className="font-semibold mb-2">Comfort & Convenience</h3>
              <div className="space-y-4">
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Android Auto
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Apple CarPlay
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Bluetooth
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Power Steering
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Dimensions & Capacity */}
        <div className="p-6 border rounded-md mb-4">
          <h1 className="text-xl font-semibold text-left mb-6">
            Dimensions & Capacity
          </h1>
          <form className=" bg-white rounded-lg">
            <div className="space-y-2 grid grid-cols-1 gap-4  justify-center items-center lg:grid-cols-2 lg:justify-start">
              <div className="space-y-3">
                <label className="block text-sm text-[#3D4A5C]">Length</label>
                <input
                  type="text"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm">Width</label>
                <input
                  type="text"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm">Height</label>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm">
                  Width (including minors)
                </label>
                <input
                  type="text"
                  name="totalWidth"
                  value={formData.totalWidth}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm">Wheelbase</label>
                <input
                  type="text"
                  name="wheelbase"
                  value={formData.wheelbase}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm">
                  Gross Vehicle Weight(kg)
                </label>
                <input
                  type="text"
                  name="grossWeight"
                  value={formData.grossWeight}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm">
                  Height (inlcuding roof rails)
                </label>
                <input
                  type="text"
                  name="totalHeight"
                  value={formData.totalHeight}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm">
                  Max. Loading Weight (kg)
                </label>
                <input
                  type="text"
                  name="loadingWeight"
                  value={formData.loadingWeight}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm">
                  Luggage Capacity (Seats Up - Liters)
                </label>
                <input
                  type="text"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm">Max. Roof Load (kg)</label>
                <input
                  type="text"
                  name="roofLoad"
                  value={formData.roofLoad}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm">
                  Luggage Capacity (Seats Down - Liters)
                </label>
                <input
                  type="text"
                  name="luggage"
                  value={formData.luggage}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Engine & Transmission */}
        <div className="p-6 border rounded-md mb-4">
          <h1 className="text-xl font-semibold text-left mb-6">
            Engine & Transmission
          </h1>
          <form className=" bg-white rounded-lg">
            <div className="space-y-2 grid grid-cols-1 gap-4  justify-center items-center lg:grid-cols-2 lg:justify-start">
              <div className="space-y-3">
                <label className="block text-sm text-[#3D4A5C]">
                  Fuel Tank Capacity (Liters)
                </label>
                <input
                  type="text"
                  name="length"
                  value={80}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm">Minimum Kerbweight (kg)</label>
                <input
                  type="text"
                  name="width"
                  value={"350"}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm">
                  Max. Towing Weight - Braked (kg)
                </label>
                <input
                  type="text"
                  name="height"
                  value={"1000"}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm">
                  Turning Circle - Kerb to Kerb (m)
                </label>
                <input
                  type="text"
                  name="make"
                  value={"6500"}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm">
                  Max. Towing Weight - Unbraked (kg)
                </label>
                <input
                  type="text"
                  name="wheelbase"
                  value={"1000"}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Inspection */}
        <div className="p-6 border rounded-md mb-4">
          <h1 className="text-xl font-semibold text-left mb-6">
            Inspection Location
          </h1>
          <form className=" bg-white rounded-lg">
            <div className="space-y-2 grid grid-cols-1 gap-4  justify-center items-center ">
              <div className="space-y-3">
                <label className="block text-sm text-[#3D4A5C]">
                  Enter location
                </label>
                <input
                  type="text"
                  name="length"
                  value={"329 Kent Ave, Brooklyn"}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function AddCar() {
  return (
    <div>
      <Admin header={header} children={<CarDetails />} />
    </div>
  );
}

export default AddCar;
