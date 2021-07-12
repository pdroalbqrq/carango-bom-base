import React from "react";

// Libs
import CircularProgress from "@material-ui/core/CircularProgress";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: 9999,
      }}
    >
      <CircularProgress color="primary" />
    </div>
  );
}

export default Loading;
