import React from "react";
import "../CartStyles/Shipping.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";

function Shipping() {
  return (
    <>
      <PageTitle title="Shipping" />
      <Navbar />

      <CheckoutPath activePath={0}/>

      <div className="shipping-form-container">
        <h1 className="shipping-form-header">Shipping Details</h1>
        <form className="shipping-form">
          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address"
              />
            </div>

            <div className="shipping-form-group">
              <label htmlFor="pinCode">PinCode</label>
              <input
                type="number"
                name="pinCode"
                id="pinCode"
                placeholder="Enter your PinCode"
              />
            </div>

            <div className="shipping-form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter your Phone Number"
              />
            </div>
          </div>

          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="country">Country</label>
              <select name="country" id="country">
                <option value="">Select a country</option>
                <option value="US">Uited States</option>
                <option value="PK">Pakistan</option>
                <option value="FI">Finland</option>
              </select>
            </div>

            <div className="shipping-form-group">
              <label htmlFor="state">State</label>
              <select name="state" id="state">
                <option value="">Select a State</option>
              </select>
            </div>

            <div className="shipping-form-group">
              <label htmlFor="city">City</label>
              <select name="city" id="city">
                <option value="">Select a City</option>
              </select>
            </div>
          </div>
          <button className="shipping-submit-btn">Continue</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Shipping;
