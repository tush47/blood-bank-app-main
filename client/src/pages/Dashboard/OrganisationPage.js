import React, { useEffect, useState, useCallback } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../../services/API";

const OrganisationPage = () => {
  // get current user
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // Memoized function to get organization data
  const getOrg = useCallback(async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-orgnaisation");
        if (data?.success) {
          setData(data?.organisations);
        }
      } else if (user?.role === "hospital") {
        const { data } = await API.get(
          "/inventory/get-orgnaisation-for-hospital"
        );
        if (data?.success) {
          setData(data?.organisations);
        }
      }
    } catch (error) {
      console.error("Error fetching organization data:", error);
    }
  }, [user?.role]); // Dependency for useCallback

  useEffect(() => {
    getOrg();
  }, [getOrg]); // Dependency for useEffect

  return (
    <Layout>
      <div
        className="org-bg d-flex justify-content-center align-items-start py-4"
        style={{ minHeight: "80vh", background: `linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%), url(${process.env.PUBLIC_URL + "/assets/images/banner2.jpg"}) center/cover no-repeat` }}
      >
        <div className="w-100" style={{ maxWidth: 900 }}>
          <h2 className="fw-bold mb-3 px-2" style={{ letterSpacing: 1, color: "#4942E4", fontSize: "1.5rem" }}>
            Organisations
          </h2>
          <div className="card shadow-sm rounded-4 p-2" style={{ background: "rgba(255,255,255,0.97)" }}>
            <div style={{ overflowX: "auto" }}>
              <table className="table align-middle mb-0 small">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-warning">
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    data?.map((record) => (
                      <tr key={record._id}>
                        <td className="fw-bold" style={{ color: "#4942E4" }}>{record.organisationName}</td>
                        <td>{record.email}</td>
                        <td>{record.phone}</td>
                        <td>{record.address}</td>
                        <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrganisationPage;
