import React from "react";
import { Link } from "react-router-dom";

export default function LogCountAndLastInfo(props) {
  return (
    <div className="flex gap-2">
      <Link
        to={`logcount/${props.vehicle.id}`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Log Count
      </Link>
      <Link
        to={`lastinfo/${props.vehicle.id}`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Last Info
      </Link>
    </div>
  );
}
