import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function LastInfo() {
  const params = useParams();
  const [lostInfo, setLastInfo] = useState([]);
  const [objFound, setObjFound] = useState(false);
  const [addressFound, setAddressFound] = useState(false);
  const [address, setAddress] = useState("");
  const fetAddress = (lat, lng) => {
    axios
      .get(
        `http://dev.virtualearth.net/REST/v1/Locations/${lat},${lng}?o=json&key=AqrpK_b1lckZjNLrnOsEpLjuqsD0W43B9KnoHzITuX1U65qtzs6t_ermmJ38QnlK`
      )
      .then((response) => {
        if (response.data.resourceSets[0].resources[0].name !== undefined) {
          setAddress(response.data.resourceSets[0].resources[0].name);
          setAddressFound(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchLastInfo = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "last-info/" + params.id)
      .then((response) => {
        setLastInfo(response.data.data);
        setObjFound(response.data.success);

        if (
          response.data.data.lat !== undefined &&
          response.data.data.lng !== undefined
        ) {
          fetAddress(response.data.data.lat, response.data.data.lng);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchLastInfo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div>
        <div className="text-3xl pb-5">Vehicle Last Info</div>
        <Link to="/"> Back to List </Link>
        <hr className="pb-5" />

        <table
          className="border-collapse w-full border  border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm"
          hidden={objFound === false}
        >
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th className="w-1 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                ID
              </th>
              <th className="w-[20%] border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                Name
              </th>
              <th className="w-[20%] border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                Local Time
              </th>
              <th className="w-auto border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                Latitute
              </th>
              <th className="w-[20%] border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                Langitute
              </th>
              <th className="w-[20%] border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                Location
              </th>
              <th className="w-auto border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                Speed
              </th>
              <th className="w-[20%] border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                Direction
              </th>
            </tr>
          </thead>
          <tbody>
            {lostInfo && lostInfo.length !== 0 && (
              <tr key={lostInfo.vehicle_id}>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {lostInfo.vehicle_id}
                </td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {lostInfo.vehicle?.name}
                </td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {lostInfo.local_time}
                </td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {lostInfo.lat}
                </td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {lostInfo.lng}
                </td>

                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {address}
                </td>

                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {lostInfo.speed}
                </td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {lostInfo.direction}
                </td>
              </tr>
            )}
            {lostInfo.length === 0 && (
              <tr key="notfound">
                <td
                  colSpan={8}
                  className="border border-slate-300 dark:border-slate-700 p-4 text-lg text-center dark:text-red-300"
                >
                  Last info not found for the vehicle
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
