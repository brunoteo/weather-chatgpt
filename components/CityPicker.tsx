"use client";

import { Country, City, State } from "country-state-city";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { GlobeIcon } from "@heroicons/react/solid";
import { useState } from "react";

type countryOption = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type stateOption = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

type cityOption = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

const countryOptions = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

const stateOptions = (isoCode: string) =>
  State.getStatesOfCountry(isoCode)?.map((state) => ({
    value: {
      latitude: state.latitude!,
      longitude: state.longitude!,
      countryCode: state.countryCode,
      name: state.name,
      stateCode: state.isoCode,
    },
    label: state.name,
  }));

const cityOptions = (isoCode: string, stateCode: string) => {
  console.log(`isoCode: ${isoCode} e stateCode: ${stateCode}`);
  return City.getCitiesOfState(isoCode, stateCode)?.map((city) => ({
    value: {
      latitude: city.latitude!,
      longitude: city.longitude!,
      countryCode: city.countryCode,
      name: city.name,
      stateCode: city.stateCode,
    },
    label: city.name,
  }));
};

function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState<countryOption>(null);
  const [selectedState, setSelectedState] = useState<stateOption>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption>(null);
  const router = useRouter();

  const handleSelectedCountry = (option: countryOption) => {
    setSelectedCountry(option);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleSelectedState = (option: stateOption) => {
    setSelectedState(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option: cityOption) => {
    setSelectedCity(option);
    router.push(
      `/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/80">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">Country</label>
        </div>
        <Select
          className="text-black"
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={countryOptions}
        />
      </div>

      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="state">State</label>
          </div>
          <Select
            className="text-black"
            value={selectedState}
            onChange={handleSelectedState}
            options={stateOptions(selectedCountry.value.isoCode)}
          />
        </div>
      )}

      {selectedState && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="city">City</label>
          </div>
          <Select
            className="text-black"
            value={selectedCity}
            onChange={handleSelectedCity}
            options={cityOptions(
              selectedCountry?.value.isoCode!,
              selectedState?.value.stateCode!
            )}
          />
        </div>
      )}
    </div>
  );
}

export default CityPicker;
