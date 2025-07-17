import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#884A39",
    "#C38154",
    "#FFC26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "#FF0060",
    "#22A699",
  ];
  //GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //lifrecycle method
  useEffect(() => {
    getBloodGroupData();
  }, []);

  //get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);
  return (
    <div className="analytics-bg" style={{ minHeight: "100vh", background: `linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%), url(${process.env.PUBLIC_URL + "/assets/images/banner2.jpg"}) center/cover no-repeat` }}>
      <Header />
      <div className="container-fluid py-4" style={{ maxWidth: 1300 }}>
        <h2 className="fw-bold mb-4 px-2" style={{ letterSpacing: 1, color: "#4942E4", fontSize: "1.5rem" }}>
          Blood Group Analytics
        </h2>
        <div className="row g-3">
          {/* Blood Group Cards */}
          <div className="col-12 col-lg-7">
            <div className="row g-3">
              {data && data.length === 0 ? (
                <div className="col-12">
                  <div className="alert alert-warning text-center" role="alert">
                    No records found.
                  </div>
                </div>
              ) : (
                data?.map((record, i) => (
                  <div className="col-12 col-sm-6 col-md-4" key={i}>
                    <div
                      className="card p-2 shadow-sm h-100"
                      style={{ background: `linear-gradient(135deg, ${colors[i % colors.length]} 60%, #fff 100%)`, color: "#fff", border: "none" }}
                    >
                      <div className="card-body">
                        <h1 className="card-title bg-light text-dark text-center mb-3 rounded-pill py-2">
                          {record.bloodGroup}
                        </h1>
                        <p className="card-text mb-1">
                          Total In : <b>{record.totalIn}</b> (ML)
                        </p>
                        <p className="card-text mb-1">
                          Total Out : <b>{record.totalOut}</b> (ML)
                        </p>
                      </div>
                      <div className="card-footer text-light bg-dark text-center rounded-pill">
                        Total Available : <b>{record.availabeBlood}</b> (ML)
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Recent Transactions Table */}
          <div className="col-12 col-lg-5">
            <div className="card shadow-sm rounded-4 p-2 h-100" style={{ background: "rgba(255,255,255,0.97)" }}>
              <h3 className="fw-bold mb-3" style={{ color: "#4942E4", fontSize: "1.1rem" }}>Recent Blood Transactions</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="table align-middle mb-0 small">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Blood Group</th>
                      <th scope="col">Inventory Type</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Donar Email</th>
                      <th scope="col">Time & Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryData && inventoryData.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center alert-warning">
                          No records found.
                        </td>
                      </tr>
                    ) : (
                      inventoryData?.map((record) => (
                        <tr key={record._id}>
                          <td className="fw-bold" style={{ color: "#4942E4" }}>{record.bloodGroup}</td>
                          <td>{record.inventoryType}</td>
                          <td>{record.quantity} (ML)</td>
                          <td>{record.email}</td>
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
      </div>
    </div>
  );
};

export default Analytics;
