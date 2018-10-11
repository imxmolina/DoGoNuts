import React from "react";

export const Col = ({ size, children }) => (
  <div id="col" className={size.split(" ").map(size => "col-" + size).join(" ")}>
    {children}
  </div>
);
