import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function LogCount() {
  const params = useParams();
  const [logCounts, setlogCounts] = useState([]);
  const [objFound, setobjFound] = useState(false);

  const fetchLogCount = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "log-count/" + params.id)
      .then(function (response) {
        setlogCounts(response.data.data);
        setobjFound(response.data.success);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchLogCount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div>
        <div className="text-3xl pb-5">Vehicle Log Count</div>
        <Link to="/"> Back to List </Link>
        <hr className="pb-5" />

        <table className="border-collapse w-full border  border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th className="w-1 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                ID
              </th>
              <th className="w-[20%] border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                Name
              </th>
              <th className="w-[20%] border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                Year-Month
              </th>
              <th className="w-auto border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            {logCounts &&
              logCounts.map((logCount) => (
                <tr key={logCount.vehicle_id + " " + logCount.months}>
                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {logCount.vehicle_id}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {logCount.vehicle.name}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {logCount.months}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {logCount.logCount}
                  </td>
                </tr>
              ))}
            {logCounts.length === 0 && (
              <tr key="notfound">
                <td
                  colSpan={5}
                  className="border border-slate-300 dark:border-slate-700 p-4 text-lg text-center dark:text-red-300"
                >
                  Logs not found for the vehicle
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
