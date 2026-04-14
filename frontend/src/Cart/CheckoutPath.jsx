import React from "react";
import "./CheckoutPath.css";
import {
  AccountBalance,
  LibraryAddCheck,
  LocalShipping,
} from "@mui/icons-material";

function CheckoutPath({ activePath }) {
  const path = [
    {
      label: "Shipping Details",
      icon: <LocalShipping />,
    },
    {
      label: "Confirm Order",
      icon: <LibraryAddCheck />,
    },
    {
      label: "Payment",
      icon: <AccountBalance />,
    },
  ];

  return (
    <div className="checkout-path">
      {path.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className={`step-container ${activePath === index ? "active" : ""} ${
              activePath > index ? "completed" : ""
            }`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-label">
              <span className="step-icon">{item.icon}</span>
              {item.label}
            </div>
          </div>
          {index < path.length - 1 && (
            <div
              className={`step-connector ${
                activePath > index ? "completed" : ""
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default CheckoutPath;
