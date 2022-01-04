import { LeftOutlined } from "@ant-design/icons/lib/icons";
import { Button, Input, notification, Row, Select } from "antd";
import Form from "antd/lib/form/Form";
import { Content } from "antd/lib/layout/layout";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { getAcessToken } from '../../../../../utils/getAccessToken';
import {
  isPrice,
  isRequired,
  validateOneElement,
} from "../../../../../utils/validator";
import callApi from "../../../../../apis/callApi";
import { getAcessToken } from "../../../../../utils/getAccessToken";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function UserForm() {
  // const [isAdd, setIsAdd] = useState(false)
  const params = useParams();

  const [dataForm, setDataForm] = useState({
    maPhim: params.id,
    ngayChieuGioChieu: "",
    maRap: "",
    maHeThongRap: "",
    maCumRap: "",
    giaVe: 0,
  });
  const [heThongRap, setHeThongRap] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const [dsRap, setDsRap] = useState([]);
  // console.log(dataForm);

  const [msgError, setMsgError] = useState({
    maPhim: "",
    ngayChieuGioChieu: "",
    maHeThongRap: "",
    maCumRap: "",
    maRap: "",
    giaVe: "",
  });
  const formRef = useRef({});
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await callApi("QuanLyRap/LayThongTinHeThongRap");
      setHeThongRap(res.data);
    })();
  }, []);

  //---------------- Validate --------------------
  const ruleList = {
    // maPhim: [isRequired(), minLength(6), isUsername()],
    ngayChieuGioChieu: [isRequired()],
    // maRap: [isRequired()],
    giaVe: [isPrice()],
  };

  const handleBlur = (e) => {
    const res =
      validateOneElement(
        formRef.current[e.target.name].input,
        ruleList[e.target.name]
      ) ?? "";
    setMsgError({ ...msgError, [e.target.name]: res });
  };

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleInput = (e) => {
    e.target.style.borderColor = "#d9d9d9";
    setMsgError({ ...msgError, [e.target.name]: "" });
  };

  //-------------------- Modal ---------------------------

  const validateAll = () => {
    let flag = true;
    const msg = {};
    for (const [key, value] of Object.entries(ruleList)) {
      if (!formRef.current[key]) continue;
      const res = validateOneElement(formRef.current[key].input, value);
      if (res) flag = false;
      msg[key] = res ?? "";
    }
    setMsgError(msg);
    if (flag) setVisible(true);
  };
  const formatDate = (date) => {
    const dt = new Date(date);
    return `${dt.getDate().toString().padStart(2, "0")}/${(dt.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${dt.getFullYear().toString().padStart(4, "0")} ${dt
      .getHours()
      .toString()
      .padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}:${dt
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const data = {
      ...dataForm,
      ngayChieuGioChieu: formatDate(new Date(dataForm.ngayChieuGioChieu)),
    };

    const res = await callApi(
      "QuanLyDatVe/TaoLichChieu",
      "POST",
      data,
      getAcessToken()
    );
    if (res?.status === 200) {
      notification.open({
        message: "Thông báo",
        description: "Tạo lịch thành công",
      });
      navigate(-1);
    } else {
      notification.open({
        message: "Thông báo",
        description: res.response.data,
      });
    }
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleChangeHTR = async (value) => {
    const res = await callApi(
      `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${value}`
    );
    setCumRap(res.data);
    setDataForm({ ...dataForm, maHeThongRap: value, maCumRap: "", maRap: "" });
  };
  const handleChangeCumRap = (value) => {
    const cRap = cumRap.find((cr) => cr.maCumRap === value);
    setDsRap(cRap.danhSachRap);
    setDataForm({ ...dataForm, maCumRap: value, maRap: "" });
  };
  return (
    <Content
      className="site-layout"
      style={{ padding: "0 50px 40px 50px", marginTop: 64 }}
    >
      <h1 style={{ textAlign: "center" }}>Add Showtime </h1>
      <Form
        {...layout}
        name="nest-messages"
        style={{
          backgroundColor: "white",
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Row style={{ margin: "10px 20px", width: "545px" }}>
          <label htmlFor="">Code Movie:</label>
          <Input
            id="maPhim"
            name="maPhim"
            value={dataForm.maPhim}
            type={"text"}
            disabled
          />
        </Row>
        <Row style={{ margin: "10px 20px", width: "545px" }}>
          <label htmlFor="email">Price:</label>
          <Input
            id="giaVe"
            name="giaVe"
            value={dataForm.giaVe}
            type={"number"}
            onChange={handleChange}
            onInput={handleInput}
            onBlur={handleBlur}
            ref={(el) => (formRef.current.giaVe = el)}
          />
          <small style={{ color: "red" }}>{msgError.giaVe}</small>
        </Row>

        <Row
          style={{
            margin: "10px 20px",
            width: "545px",
            flexDirection: "column",
          }}
        >
          <label htmlFor="email">Time:</label>

          <Input
            id="ngayChieuGioChieu"
            name="ngayChieuGioChieu"
            value={dataForm.ngayChieuGioChieu}
            type={"datetime-local"}
            onChange={handleChange}
            // onInput={handleInput}
            onBlur={handleBlur}
            ref={(el) => (formRef.current.ngayChieuGioChieu = el)}
          />
          <small style={{ color: "red" }}>{msgError.ngayChieuGioChieu}</small>
        </Row>

        <Row style={{ margin: "10px 20px", width: "545px" }}>
          <label htmlFor="maHeThongRap">Theater System:</label>
          <Select
            value={dataForm.maHeThongRap}
            style={{ width: "100%" }}
            onChange={handleChangeHTR}
            id="maHeThongRap"
            ref={(el) => (formRef.current.maHeThongRap = el)}
          >
            {heThongRap.map((htr) => (
              <Select.Option key={htr.maHeThongRap} value={htr.maHeThongRap}>
                {htr.maHeThongRap} - {htr.tenHeThongRap}
              </Select.Option>
            ))}
          </Select>
        </Row>

        <Row style={{ margin: "10px 20px", width: "545px" }}>
          <label htmlFor="maCumRap">Theater Cluster:</label>
          <Select
            value={dataForm.maCumRap}
            style={{ width: "100%" }}
            onChange={handleChangeCumRap}
            id="maCumRap"
          >
            {cumRap.map((htr) => (
              <Select.Option key={htr.maCumRap} value={htr.maCumRap}>
                {htr.maCumRap} - {htr.tenCumRap}
              </Select.Option>
            ))}
          </Select>
        </Row>

        <Row style={{ margin: "10px 20px", width: "545px" }}>
          <label htmlFor="maRap">Theater:</label>
          <Select
            style={{ width: "100%" }}
            value={dataForm.maRap}
            onChange={(value) => setDataForm({ ...dataForm, maRap: value })}
            id="maRap"
          >
            {dsRap.map((rap) => (
              <Select.Option key={rap.maRap} value={rap.maRap}>
                {rap.maRap} - {rap.tenRap}
              </Select.Option>
            ))}
          </Select>
        </Row>

        <Row
          style={{
            margin: "20px 20px 0 20px",
            backgroundColor: "white",
            width: "100%",
          }}
          justify="space-between"
        >
          <Button
            type="text"
            size={"large"}
            icon={<LeftOutlined />}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            style={{ width: "150px" }}
            type="primary"
            shape="round"
            size={"large"}
            onClick={() => validateAll()}
          >
            Submit
          </Button>
        </Row>
      </Form>

      <Modal
        title="Confirm"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <p>Are you sure you want to create a showtime ?</p>
      </Modal>
    </Content>
  );
}

export default UserForm;
