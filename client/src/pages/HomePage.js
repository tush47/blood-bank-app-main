import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from "moment";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);
  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {error && <span>{alert(error)}</span>}
      <div
        className="home-bg d-flex justify-content-center align-items-start py-4"
        style={{ minHeight: "80vh", background: `linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%), url(${process.env.PUBLIC_URL + "/assets/images/banner2.jpg"}) center/cover no-repeat` }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <div className="w-100" style={{ maxWidth: 900 }}>
            <div className="d-flex justify-content-between align-items-center mb-3 px-2">
              <h2 className="fw-bold mb-0" style={{ letterSpacing: 1, color: "#4942E4", fontSize: "1.5rem" }}>
                Blood Inventory
              </h2>
              <button
                className="btn btn-primary rounded-pill px-3 py-1 shadow"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ fontWeight: 600, fontSize: "1rem", background: "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)", border: "none" }}
              >
                <i className="fa-solid fa-plus me-2"></i> Add Inventory
              </button>
            </div>
            <div className="card shadow-sm rounded-4 p-2" style={{ background: "rgba(255,255,255,0.97)" }}>
              <div style={{ overflowX: "auto" }}>
                <table className="table align-middle mb-0 small">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Blood Group</th>
                      <th scope="col">Inventory Type</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Donor Email</th>
                      <th scope="col">Time & Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((record) => (
                      <tr key={record._id}>
                        <td className="fw-bold" style={{ color: "#4942E4" }}>{record.bloodGroup}</td>
                        <td>{record.inventoryType}</td>
                        <td>{record.quantity} (ML)</td>
                        <td>{record.email}</td>
                        <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Modal />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
