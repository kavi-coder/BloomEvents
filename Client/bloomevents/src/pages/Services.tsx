import ServiceCard from "components/Cards/ServiceCard";
import image from "img/new/image8.jpg";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { RouteName } from "constant/routeName";
import { ServiceProvider } from "types/ServiceProvider";
import ProviderService from "Services/Provider/ProviderServices";
import { toast } from "react-toastify";
import { Category } from "types/Category";
import CategoryService from "Services/Category/CategoryService";
import ServiceCardSkeleton from "skeleton/ServiceCardSkeleton/ServiceCardSkeleton";
import AutoComplete from "components/AutoComplete/AutoComplete";
import { districts } from "docs/districts";
import { Box, MenuItem, Pagination, Select, TextField } from "@mui/material";

interface Option {
  value: string;
  label: string;
}

function Services() {
  // get categories
  const [categories, setCategories] = useState<Category[]>();
  const [autoCategories, setAutoCategories] = useState<Option[]>([]);
  const [selectCategory, setSelectCategory] = useState<any>(null);

  useEffect(() => {
    CategoryService.getAllCategories().then((res: any) => {
      if (res.data.status === 1) {
        const categories = res.data.data;
        const autoCategories = categories.map((category: Category) => ({
          value: category.categoryId,
          label: category.categoryName,
        }));
        setCategories(categories);
        setAutoCategories(autoCategories);
      } else {
        // toast.error(res.data.message);
      }
    });
  }, []);

  // get districts
  const [district, setDistrict] = useState<any>();
  const [autoDistricts, setAutoDistricts] = useState<Option[]>([]);
  const [selectDistrict, setSelectDistrict] = useState<any>(null);

  useEffect(() => {
    const districtSet = districts;
    const autoDistrictSet = districtSet.map((d: any) => ({
      value: d.id,
      label: d.district,
    }));
    setDistrict(districtSet);
    setAutoDistricts(autoDistrictSet);
  }, []);

  // get services
  const [services, setServices] = useState<Array<ServiceProvider>>();
  const [filteredServices, setFilteredServices] =
    useState<Array<ServiceProvider>>(); // for filter purpose

  useEffect(() => {
    ProviderService.getAllServices().then((res: any) => {
      if (res.data.status === 1) {
        setServices(res.data.data);
        setFilteredServices(res.data.data);
        // console.log(res.data.data);
        return;
      } else {
        // toast.error(res.data.message);
      }
    });
  }, []);

  const [searchName, setSearchName] = useState<any>("");

  // data filtering
  useEffect(() => {
    setSelectCategory(selectCategory);
    // console.log(searchName);
    if (selectCategory !== null) {
      if (selectDistrict !== null) {
        if (searchName !== "") {
          const filteredData = services?.filter(
            (emp: any) =>
              emp.categoryId === selectCategory.value &&
              emp.district === selectDistrict.label &&
              emp.businessName.toLowerCase().includes(searchName.toLowerCase())
          );
          setFilteredServices(filteredData);
        } else {
          const filteredData = services?.filter(
            (emp: any) =>
              emp.categoryId === selectCategory.value &&
              emp.district === selectDistrict.label
          );
          setFilteredServices(filteredData);
        }
      } else {
        if (searchName !== "") {
          const filteredData = services?.filter(
            (emp: any) =>
              emp.categoryId === selectCategory.value &&
              emp.businessName.toLowerCase().includes(searchName.toLowerCase())
          );
          setFilteredServices(filteredData);
        } else {
          const filteredData = services?.filter(
            (emp: any) => emp.categoryId === selectCategory.value
          );
          setFilteredServices(filteredData);
        }
      }
    } else {
      if (selectDistrict !== null) {
        if (searchName !== "") {
          const filteredData = services?.filter(
            (emp: any) => (emp: any) =>
              emp.district === selectDistrict.label &&
              emp.businessName.toLowerCase().includes(searchName.toLowerCase())
          );
          setFilteredServices(filteredData);
        } else {
          const filteredData = services?.filter(
            (emp: any) => emp.district === selectDistrict.label
          );
          setFilteredServices(filteredData);
        }
      } else {
        if (searchName !== "") {
          const filteredData = services?.filter(
            (emp: any) => (emp: any) =>
              emp.businessName.toLowerCase().includes(searchName.toLowerCase())
          );
          setFilteredServices(filteredData);
        } else {
          setFilteredServices(services);
        }
      }
    }
  }, [selectCategory, selectDistrict, searchName]);

  // sorting
  const [sortVal, setSortVal] = useState(1);
  useEffect(() => {
    if (filteredServices) {
      // console.log(n);
      if (sortVal == 1) {
        const sortedServices = [...filteredServices].sort(
          (a, b) => b.providerId - a.providerId
        );
        setFilteredServices(sortedServices);
        // console.log(sortedServices);
      }
      if (sortVal == 2) {
        const sortedServices = [...filteredServices].sort(
          (a, b) => a.providerId - b.providerId
        );
        setFilteredServices(sortedServices);
        // console.log(sortedServices);
      }
      if (sortVal == 3) {
        const sortedServices = [...filteredServices].sort(
          (a, b) => b.rating - a.rating
        );
        setFilteredServices(sortedServices);
        // console.log(sortedServices);
      }
      if (sortVal == 4) {
        const sortedServices = [...filteredServices].sort(
          (a, b) => a.rating - b.rating
        );
        setFilteredServices(sortedServices);
        // console.log(sortedServices);
      }
    }
  }, [sortVal]);

  // add pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const itemsForCurrentPage = filteredServices?.slice(startIndex, endIndex);

  return (
    <div className="w-full pt-28">
      {/* search section */}
      <div className="flex justify-around w-11/12 py-2 mx-auto bg-[#ffd8a9a9] border-2 border-[#ffa537] border-solid rounded-lg">
        <div className="w-3/12">
          <AutoComplete
            array={autoCategories}
            label={"Category"}
            selectedOption={setSelectCategory}
            color={true}
          />
        </div>

        <div className="w-3/12">
          <AutoComplete
            array={autoDistricts}
            label={"District"}
            selectedOption={setSelectDistrict}
            color={true}
          />
        </div>

        <div className="w-3/12">
          <TextField
            color="warning"
            id="outlined"
            label="Provider Name"
            className="form-textfield-double bg-[#ffe6b76c]"
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
            sx={{ width: "100%" }}
            variant="outlined"
          />
        </div>
      </div>

      <div className={`flex justify-around`}>
        {/* filer options */}
        <div className="w-3/12 p-5">
          <div className="bg-white min-h-[600px] px-6 py-4 min-w-[20px] rounded-lg shadow-2xl">
            <div className="my-5">
              <p className="mb-3">Sort results by</p>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                fullWidth
                defaultValue={1}
                label=""
                onChange={(e: any) => {
                  setSortVal(e.target.value);
                }}>
                <MenuItem value={1} selected>
                  Date: Newest on top
                </MenuItem>
                <MenuItem value={2}>Date: Oldest on top</MenuItem>
                <MenuItem value={3}>Ratings: High to low</MenuItem>
                <MenuItem value={4}>Ratings: Low to high</MenuItem>
              </Select>
            </div>

            <div className="my-5">
              <AutoComplete
                array={autoCategories}
                label={"Category"}
                selectedOption={setSelectCategory}
                color={false}
              />
            </div>

            <div className="my-5">
              <AutoComplete
                array={autoDistricts}
                label={"District"}
                selectedOption={setSelectDistrict}
                color={false}
              />
            </div>
          </div>
        </div>

        {/* service cards */}
        <div className="w-9/12 px-5 py-3 mx-3 mt-5 bg-white rounded-lg shadow-2xl service-card-area">
          {filteredServices ? (
            <>
              {itemsForCurrentPage?.map((c: any, i: number) => (
                <div key={i}>
                  <Link
                    to={{
                      pathname: `${RouteName.ProviderDetails.replace(
                        ":providerId",
                        c.providerId.toString()
                      )}`,
                    }}>
                    <ServiceCard provider={c} />
                  </Link>
                </div>
              ))}
              {/* <ServiceCardSkeleton /> */}
              <div className="flex justify-center w-full mt-16">
                <Pagination
                  count={Math.ceil(filteredServices?.length / perPage)}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                />
              </div>
            </>
          ) : (
            <>
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Services;
