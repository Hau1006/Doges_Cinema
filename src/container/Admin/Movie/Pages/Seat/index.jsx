/* eslint-disable jsx-a11y/alt-text */
import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Row, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import screenImg from "../../../../../assets/images/screen.png";
import seatBookedImg from "../../../../../assets/images/seat-booked.png";
import seatSelectedImg from "../../../../../assets/images/seat-selected.png";
import seat from "../../../../../assets/images/seat.png";

import {
  getMovieInfo,
  getSeatList,
  getSeatPlanAsync,
  getSelectedIndex,
} from "../../../../Client/SeatPlan/module/seatSlice";
import styles from "./seat.module.css";

function Seat() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const movieInfo = useSelector(getMovieInfo);
  const data = useSelector(getSeatList);
  const selectedIndexArr = useSelector(getSelectedIndex);

  useEffect(() => {
    // call api

    dispatch(getSeatPlanAsync(params.id));
    // eslint-disable-next-line
  }, []);

  function pad(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
  }

  let i = 1;
  let r = 0;
  if (!data) {
    return (
      <div className={styles.LoadingScreen}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Button
        type="text"
        size={"large"}
        icon={<LeftOutlined />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Col className={`gutter-row ${styles.SelectArea}`} span={15}>
          <p className={styles.SelectTitle}>SELECT SEAT</p>
          <div className={styles.ScreenImg}>
            <img src={screenImg}></img>
          </div>
          <div className={styles.SeatArea}>
            {data &&
              data.map((e, index) => {
                let rangeArr = [
                  "A",
                  "B",
                  "C",
                  "D",
                  "E",
                  "F",
                  "G",
                  "H",
                  "J",
                  "K",
                ];
                if (i === 17) {
                  i = 1;
                  r += 1;
                }
                if (e.taiKhoanNguoiDat !== null) {
                  return (
                    <button
                      key={e.stt}
                      data-key={e.stt}
                      disabled
                      style={{ cursor: "no-drop" }}
                      className={styles.SingleSeat}
                    >
                      <img src={seatBookedImg} />
                      <span>
                        {rangeArr[r]}
                        {i++}
                      </span>
                    </button>
                  );
                }
                if (selectedIndexArr.includes(pad(index + 1))) {
                  return (
                    <button
                      key={e.stt}
                      title="Ghế đang được chọn"
                      data-key={e.stt}
                      className={styles.SingleSeat}
                    >
                      <img src={seatSelectedImg} />
                      <span>
                        {rangeArr[r]}
                        {i++}
                      </span>
                    </button>
                  );
                }
                if (e.loaiGhe === "Vip") {
                  return (
                    <button
                      key={e.stt}
                      title={`Vip: ${e.giaVe} VND`}
                      data-key={e.stt}
                      className={styles.SingleSeat}
                    >
                      <img style={{ filter: "hue-rotate(40deg)" }} src={seat} />
                      <span>
                        {rangeArr[r]}
                        {i++}
                      </span>
                    </button>
                  );
                }
                return (
                  <button
                    key={e.stt}
                    title={`Thường: ${e.giaVe} VND`}
                    data-key={e.stt}
                    className={styles.SingleSeat}
                  >
                    <img src={seat} />
                    <span>
                      {rangeArr[r]}
                      {i++}
                    </span>
                  </button>
                );
              })}
          </div>
          <div className={styles.NoteImg}>
            <span>
              <img src={seatBookedImg} /> Booked Seat
            </span>
            <span>
              <img src={seatSelectedImg} />
              Selected Seat
            </span>
            <span>
              <img style={{ filter: "hue-rotate(40deg)" }} src={seat} />
              Vip Seats
            </span>
            <span>
              <img src={seat} />
              Regular Seats
            </span>
          </div>
        </Col>
        <Col className="gutter-row" span={7}>
          <div style={{ paddingTop: "100px" }}>
            <div className={styles.BookingSummery}>
              <h2 className="FormatText">{movieInfo.tenPhim}</h2>
              <p>2D | DIGITAL</p>
              <h2 className="FormatText">{movieInfo.tenCumRap}</h2>
              <p>
                {movieInfo.ngayChieu} - {movieInfo.gioChieu}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Seat;
