import axios from "axios";
import React, { useEffect, useState } from "react";
import LogCountAndLastInfo from "../components/LogCountAndLastInfo";

function ActiveVehicleList(props) {
  const [activeVehicles, setactiveVehicles] = useState([]);

  const fetchActiveVehicles = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "active-vehicles")
      .then(function (response) {
        setactiveVehicles(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchActiveVehicles();
  }, []);

  return (
    <>
      <div>
        <div className="text-3xl pb-5"> Active Vehicles</div>
        <hr className="pb-5" />
        <table className="border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th className="w-1 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                ID
              </th>
              <th className="w-[40%] border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                Name
              </th>
              <th className="w-5 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                AgiDrive
              </th>
              <th className="w-auto border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                Other Info
              </th>
            </tr>
          </thead>
          <tbody>
            {activeVehicles &&
              activeVehicles.map((activeVehicle) => (
                <tr key={activeVehicle.id}>
                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {activeVehicle.id}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {activeVehicle.name}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {activeVehicle.is_agidrive === "on" ? (
                      <div className="m-2 p-2 bg-slate-600 text-white text-sm rounded-lg">
                        On
                      </div>
                    ) : (
                      <div className="m-2 p-2">-</div>
                    )}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {activeVehicle.is_agidrive === "on" ? (
                      <>
                        <LogCountAndLastInfo vehicle={activeVehicle} />
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ActiveVehicleList;
