import { UploadOutlined } from "@ant-design/icons/lib/icons";
import { Button, DatePicker, Form, Input, message, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAcessToken } from "../../../../../utils/getAccessToken";
import { EditAsyncMovies } from "../../movieSplice";
const fileList = [];
const EditMovie = () => {
  const moment = require("moment");

  const location = useLocation();
  const [valueEdit, setValueEdit] = useState(location.state);

  const navigate = useNavigate();
  const [objImageUpdate, setObjImageUpdate] = useState("");

  const dispatch = useDispatch();
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    return e && e.fileList;
  };
  const props = {
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file);
        console.log(fileList);
        const obj = fileList[fileList.length - 1];
        console.log(obj);
        setObjImageUpdate(obj.originFileObj);
      }
    },

    beforeUpload: (file) => {
      if (file.type !== "image/png") {
        message.error(`${file.name} is not a png file`);
      }
      return file.type === "image/png" ? true : Upload.LIST_IGNORE;
    },
  };

  const onFinish = (values) => {
    console.log(values);

    let formData = new FormData();
    formData.append("maPhim", valueEdit.maPhim); // done
    formData.append("tenPhim", values.movieName); //done
    formData.append("biDanh", "bi danh 1");
    formData.append("trailer", values.movieTrailer);
    formData.append("hinhAnh", "url");
    formData.append("moTa", values.movieDescription);
    formData.append("maNhom", "GP02");
    formData.append("ngayKhoiChieu", values.datepicker);
    formData.append("danhGia", "0");
    formData.append("File", objImageUpdate);
    console.log(formData);
    const data = { body: formData, token: getAcessToken() };
    console.log(data);
    dispatch(EditAsyncMovies(data));
    navigate(-1);
  };
  console.log(fileList);
  return (
    <div
      style={{
        padding: "0 50px 40px 50px",
        backgroundColor: "rgb(218, 226, 236)",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Edit Movie</h1>
      <Form
        style={{ padding: "1rem", backgroundColor: "rgb(218, 226, 236)" }}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        onFinish={onFinish}
      >
        <Form.Item
          name="movieName"
          rules={[{ required: true, message: "Please input movie name!" }]}
          label="Name Movie"
          initialValue={valueEdit.tenPhim}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="movieTrailer"
          rules={[{ required: true, message: "Please input trailer!" }]}
          label="Trailer"
          initialValue={valueEdit.trailer}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="movieDescription"
          rules={[{ required: true, message: "Please input description!" }]}
          label="Descriptions "
          initialValue={valueEdit.moTa}
        >
          {/* <Input /> */}
          <TextArea autoSize />
        </Form.Item>
        <Form.Item name="datepicker" label="Date">
          <DatePicker defaultValue={moment(valueEdit.ngayKhoiChieu)} />
        </Form.Item>

        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload {...props} name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Upload Image Trailer</Button>
          </Upload>
          {objImageUpdate ? (
            ""
          ) : (
            <img
              style={{ width: "5rem", height: "5rem", objectFit: "contain" }}
              src={valueEdit.hinhAnh}
              alt="MovieImage"
            />
          )}
        </Form.Item>

        <Form.Item
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            width: "100%",
          }}
        >
          <Button
            style={{
              display: "inline-block",
              // padding: "1rem",
              marginTop: "2rem",
              fontSize: "1rem",
              borderRadius: "0.25rem",
              letterSpacing: "0.1rem",
              borderColor: "transparent",
              backgroundColor: "hsl(205, 78%, 60%)",
              color: "white",
              textTransform: "capitalize",
              cursor: "pointer",
            }}
            type="primary"
            htmlType="submit"
          >
            Edit Movie
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditMovie;
