import React, { createContext, useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { provinces } from '../assets/address_data/provinces';
import { regions } from '../assets/address_data/regions';
import { municipalities } from '../assets/address_data/municipalities';
import { barangays } from '../assets/address_data/barangays';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cellNumber: '',
    gender: 'male',
    barangay: '',
    municipality: '0',
    province: '0',
    region: '0',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { signup, error, isLoading } = useSignup();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    await signup(
      formData.firstName,
      formData.lastName,
      formData.cellNumber,
      formData.gender,
      formData.barangay,
      formData.municipality,
      formData.province,
      formData.region,
      formData.username,
      formData.email,
      formData.password,
      formData.confirmPassword
    );
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100 row justify-content-center align-items-center">
        <div className="col-10 bg-light-darker text-dark rounded py-3 px-5">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">Sign Up</h3>

            <div className="form-group">
              <label htmlFor="firstName" className="col-2 mt-1 pr-0">
                First Name :
              </label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
                className="px-2 rounded col-4 my-1"
              />

              <label htmlFor="lastName" className="col-2 mt-1 pr-0">
                Last Name :
              </label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
                className="px-2 rounded col-4 my-1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cellNumber" className="col-2 mt-1 pr-0">
                Cell # :
              </label>
              <input
                type="text"
                name="cellNumber"
                placeholder="09123456789"
                onChange={handleChange}
                value={formData.cellNumber}
                className="px-2 rounded col-4 my-1"
              />

              <label htmlFor="gender" className="col-2 mt-1 pr-0">
                Gender :
              </label>
              <select
                name="gender"
                id="gender"
                onChange={handleChange}
                value={formData.gender}
                className="px-2 rounded col-2 my-1"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="region" className="col-2 pr-0">
                Region :
              </label>
              <select
                name="region"
                id="region"
                onChange={handleChange}
                value={formData.region}
                className="col-4 text-center  my-1"
              >
                <option value="0">--SELECT REGION--</option>
                {regions.map((region) => (
                  <option key={region.code} value={region.code}>
                    {region.name}
                  </option>
                ))}
              </select>

              <label htmlFor="province" className="col-2 pr-0">
                Province :
              </label>
              <select
                name="province"
                id="province"
                onChange={handleChange}
                value={formData.province}
                className="col-4 text-center  my-1"
                disabled={formData.region === '0'}
              >
                <option value="0">--SELECT PROVINCE--</option>
                {provinces.map(
                  (province) =>
                    province.regionCode === formData.region && (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    )
                )}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="municipality" className="col-3 pr-0">
                Cities/Municipality :
              </label>
              <select
                name="municipality"
                id="municipality"
                onChange={handleChange}
                value={formData.municipality}
                disabled={formData.province === '0' || formData.region === '0'}
                className="col-3 text-center my-1"
              >
                <option value="0">--SELECT CITIES--</option>
                {municipalities.map(
                  (municipality) =>
                    municipality.provinceCode === formData.province && (
                      <option key={municipality.code} value={municipality.code}>
                        {municipality.name}
                      </option>
                    )
                )}
              </select>

              <label htmlFor="barangay" className="col-2 pr-0">
                Barangay :
              </label>
              <select
                name="barangay"
                id="barangay"
                onChange={handleChange}
                value={formData.barangay}
                className="col-4 text-center my-1"
                disabled={
                  formData.municipality === '0' ||
                  formData.province === '0' ||
                  formData.region === '0'
                }
              >
                <option value="0">--SELECT BARANGAY--</option>
                {barangays.map((barangay) => {
                  return barangay.cityCode === false
                    ? barangay.municipalityCode === formData.municipality && (
                        <option key={barangay.code} value={barangay.code}>
                          {barangay.name}
                        </option>
                      )
                    : barangay.cityCode === formData.municipality && (
                        <option key={barangay.code} value={barangay.code}>
                          {barangay.name}
                        </option>
                      );
                })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="username" className="col-2 mt-1">
                Username :
              </label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={formData.username}
                className="px-2 rounded col-4 my-1"
              />

              <label htmlFor="email" className="col-2 mt-1">
                Email :
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                onChange={handleChange}
                value={formData.email}
                className="px-2 rounded col-4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="col-2 mt-1">
                Password:
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="px-2 rounded my-1 col-3"
              />

              <label htmlFor="confirmPassword" className="col-3 mt-1 pr-0">
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                className="px-2 rounded col-4 my-1"
              />
            </div>

            <button
              className="d-block mx-auto mt-4 btn btn-dark"
              disabled={isLoading}
            >
              Sign Up
            </button>
          </form>

          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
