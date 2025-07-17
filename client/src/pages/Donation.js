import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import { useSelector } from "react-redux";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // Memoized function to fetch donation records
  const getDonars = useCallback(async () => {
    try {
      const response = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "in",
          donar: user?._id,
        },
      });
      if (response?.data?.success) {
        setData(response.data.inventory);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching donation records:", error);
    }
  }, [user?._id]); // Dependency array ensures stability

  useEffect(() => {
    getDonars();
  }, [getDonars]); // Effect runs only when `getDonars` changes

  return (
    <Layout>
      <div
        className="donation-bg d-flex justify-content-center align-items-start py-4"
        style={{ minHeight: "80vh", background: `linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%), url(${process.env.PUBLIC_URL + "/assets/images/banner2.jpg"}) center/cover no-repeat` }}
      >
        <div className="w-100" style={{ maxWidth: 900 }}>
          <h2 className="fw-bold mb-3 px-2" style={{ letterSpacing: 1, color: "#4942E4", fontSize: "1.5rem" }}>
            My Donations
          </h2>
          <div className="card shadow-sm rounded-4 p-2" style={{ background: "rgba(255,255,255,0.97)" }}>
            <div style={{ overflowX: "auto" }}>
              <table className="table align-middle mb-0 small">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Inventory Type</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((record) => (
                      <tr key={record._id}>
                        <td className="fw-bold" style={{ color: "#4942E4" }}>{record.bloodGroup}</td>
                        <td>{record.inventoryType}</td>
                        <td>{record.quantity}</td>
                        <td>{record.email}</td>
                        <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-warning">
                        No records found.
                      </td>
                    </tr>
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

export default Donation;
