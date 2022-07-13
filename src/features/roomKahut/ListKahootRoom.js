import { useState } from "react";
import ResponsiveAppBar from "../../components/AppBar";
import Navbar from "../user/Navbar";

const ListKahootRoom = () => {
  const [listRoom, setListRoom] = useState([
    {
      img: "https://img5.thuthuatphanmem.vn/uploads/2021/08/25/hinh-nen-3d-cho-may-tinh-4k_084701936.jpg",
      room_title: "Bai Kiem Tra So 1",
      num_question: 2,
    },
  ]);

  return (
    <div>
      {/* <ResponsiveAppBar /> */}
      <Navbar />
      <div className="container">
        <h4 className="mt-2 ml-3 mb-5" style={{ color: "#479fec" }}>
          My Kahoot Room
        </h4>
        {listRoom.map((item, _index) => {
          return (
            <div className="ml-5 mr-5 mb-3" key={_index}>
              <div className="card p-3" style={{ backgroundColor: "#8aecf3" }}>
                <div
                  className="card-body"
                  style={{ backgroundColor: "#fff", borderRadius: 5 }}
                >
                  <div className="row">
                    <div
                      className="col-sm-3"
                      style={{ borderRight: "solid 1px #6506ff" }}
                    >
                      <img
                        src={item.img}
                        alt={item.room_title}
                        style={{ height: 100 }}
                      />
                    </div>
                    <div className="col-sm-8 ml-3 ">
                      <div className="row d-flex justify-content-between align-items-center">
                        <h5 className="m-0 mb-2">
                          {item.room_title} {" "}
                          <i
                            className="fa fa-check-circle"
                            aria-hidden="true"
                            style={{ color: "green" }}
                          />
                        </h5>
                      </div>
                      <div className="row">
                        <div>
                          <span
                            className="ml-2"
                            style={{
                              fontSize: 18,
                              color: "#6c47f1",
                              fontWeight: "bold",
                            }}
                          >
                            <i
                              className="fa fa-question-circle mr-2"
                              aria-hidden="true"
                              style={{ color: "red" }}
                            />{" "}
                            {item.num_question} Questions
                          </span>
                        </div>
                      </div>
                      <div className="row d-flex justify-content-end">
                        <div>
                          <button type="button" className="btn btn-danger mr-3">
                            Delete
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-success mr-5"
                          >
                            Play
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListKahootRoom;
