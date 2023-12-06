// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { FormControl } from "@mui/base/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic.jsx";
import SearchTable from "./SearchTable.jsx";
import search from "../../images/others/searching gif.gif";

const SearchPage = () => {
  const axiosPublic = useAxiosPublic();
  const [searching, setSearching] = useState(false);
  const [bloodGroup, setBloodGroup] = useState("");
  const [districts, setDistricts] = useState([]);
  const [Upazilas, setUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [selectedUpazilaId, setSelectedUpazila] = useState("");
  const [filteredUpazila, setFilteredUpazilas] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data);
      })
      .catch((error) => console.error("Error fetching districts:", error));

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        setUpazilas(data);
      });
  }, []);

  const handleBloodGroupChange = (e) => {
    e.preventDefault();
    const selectedBloodGroup = e.target.value;
    setBloodGroup(selectedBloodGroup);
  };

  const handleDistrictChange = (e) => {
    e.preventDefault();
    const district = e.target.value;
    setSelectedDistrictId(district);
    const filteredUpazilas = Upazilas.filter(
      (upazila) => upazila?.district_id === district
    );
    setFilteredUpazilas(filteredUpazilas);
  };

  const handleUpazilaChange = (e) => {
    e.preventDefault();
    const upazilaId = e.target.value;
    setSelectedUpazila(upazilaId);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(true);
    // Check if all required fields are filled
    if (!bloodGroup || !selectedDistrictId || !selectedUpazilaId) {
      // You can add some user feedback here, e.g., show an error message
      console.log("Please fill in all required fields");
      return;
    }
    const formData = {
      bloodGroup: bloodGroup,
      district: selectedDistrictId,
      upazila: selectedUpazilaId,
    };
    console.log(formData);
    axiosPublic.get("/donationRequest/search", { params: formData }).then((res) => {
      console.log(res.data);
      setSearchResult(res.data);
      setSearching(false);
    });
    console.log("searchResult: ", searchResult);
  };

  return (
    <div className="py-12">
      <Helmet>
        <title>{`Bldonors | Search Page`}</title>
      </Helmet>
      <h1 className="text-3xl font-bold border-b-2 border-red-500 mb-6 w-fit text-center mx-auto">
        Search Donation Requests
      </h1>
      <div className="mx-12 p-6 border-2 border-red-500 border-opacity-20 rounded-lg bg-red-500 bg-opacity-10 shadow-xl">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4} md={4} sm={6}>
            <FormControl fullwidth>
              <InputLabel id="blood-group-label">Blood Group</InputLabel>
              <Select
                fullWidth
                labelId="blood-group-label"
                id="blood-group"
                value={bloodGroup}
                onChange={handleBloodGroupChange}
                required
              >
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={4} md={4} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="district-group-label">District</InputLabel>
              <Select
                fullWidth
                labelId="district-group-label"
                id="district"
                value={selectedDistrictId}
                onChange={handleDistrictChange}
                required
              >
                {districts.map((district) => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={4} md={4} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="upazila-group-label">Upazila</InputLabel>
              <Select
                fullWidth
                labelId="upazila-group-label"
                id="upazila"
                value={selectedUpazilaId}
                onChange={handleUpazilaChange}
                required
              >
                {filteredUpazila.map((upazila) => (
                  <MenuItem key={upazila.id} value={upazila.id}>
                    {upazila.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Button
            type="submit"
            onClick={handleSearch}
            sx={{
              marginTop: "15px",
              marginInline: "auto",
              px: "50px",
              py: "10px",
              bgcolor: "red",
              color: "white",
              fontWeight: "700",
              fontSize: "16px",
              opacity: "70%",
            }}
            slots={{ root: "span" }}
          >
            Search
            <SearchIcon sx={{ ml: "5px" }} />
          </Button>
        </Grid>
      </div>
      {searchResult.length > 0 ? (
        searching ? (
          <div>
            <img className="mx-auto w-[200px] my-12" src={search} alt="" />
          </div>
        ) : (
          <div className="table max-w-[93%] mx-auto my-4 border-2 border-red-500 border-opacity-50 overflow-x-auto">
            <SearchTable data={searchResult} />
          </div>
        )
      ) : (
        <div className="text-center text-3xl  font-bold my-12">
          <h1>{""}</h1>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
