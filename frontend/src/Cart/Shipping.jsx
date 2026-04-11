import React, { useState } from "react";
import "./Shipping.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";
import { saveShippingInfo } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function Shipping() {
  const { shippingInfo } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const navigate = useNavigate();

  const shippingInfoSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10 || !phoneNumber.match(/^[0-9]+$/)) {
      toast.error("Please enter a valid 10-digit phone number", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    dispatch(
      saveShippingInfo({ address, pinCode, phoneNumber, country, state, city })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      <PageTitle title="Shipping" />
      <Navbar />

      <CheckoutPath activePath={0} />

      <div className="shipping-form-container">
        <h1 className="shipping-form-header">Shipping Details</h1>
        <form className="shipping-form" onSubmit={shippingInfoSubmit}>
          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="shipping-form-group">
              <label htmlFor="pinCode">PinCode</label>
              <input
                type="number"
                name="pinCode"
                id="pinCode"
                placeholder="Enter your PinCode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div className="shipping-form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter your Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="country">Country</label>
              <select
                name="country"
                id="country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setState("");
                  setCity("");
                }}
              >
                <option value="">Select a country</option>
                {Country &&
                  Country.getAllCountries().map((country) => (
                    <option value={country.isoCode} key={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div className="shipping-form-group">
                <label htmlFor="state">State</label>
                <select
                  name="state"
                  id="state"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setCity("");
                  }}
                >
                  <option value="">Select a State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((state) => (
                      <option value={state.isoCode} key={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {state && (
              <div className="shipping-form-group">
                <label htmlFor="city">City</label>
                <select
                  name="city"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Select a City</option>
                  {City &&
                    City.getCitiesOfState(country, state).map((city) => (
                      <option value={city.name} key={city.name}>
                        {city.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
          <button className="shipping-submit-btn">Continue</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Shipping;
