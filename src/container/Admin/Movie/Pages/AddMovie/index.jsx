import { UploadOutlined } from "@ant-design/icons/lib/icons";
import { Button, DatePicker, Form, Input, message, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAcessToken } from "../../../../../utils/getAccessToken";
import { postAsyncMovies } from "../../movieSplice";

const AddMovie = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const normFile = (e) => {

    return e && e.fileList;
  };

  const props = {
    // onChange({ file, fileList }) {
    //   if (file.status !== "uploading") {
    //     console.log(file);
    //     console.log(fileList);
    //     const obj = fileList[fileList.length - 1];
    //     console.log(obj);
    //     setObjImageUpdate(obj.originFileObj);
    //   }
    // },

    beforeUpload: (file) => {
      if (file.type !== "image/png") {
        message.error(`${file.name} is not a png file`);
      }
      return file.type === "image/png" ? true : Upload.LIST_IGNORE;
    },
  };

  const onFinish = (values) => {
    const { originFileObj } = values.upload[0];
    let formData = new FormData();
    formData.append("maPhim", "0");
    formData.append("tenPhim", values?.movieName);
    formData.append("biDanh", "bi danh 1");
    formData.append("trailer", values?.movieTrailer);
    formData.append("hinhAnh", "url");
    formData.append("moTa", values?.movieDescription);
    formData.append("maNhom", "GP02");
    formData.append("ngayKhoiChieu", values?.datepicker.format("DD/MM/YYYY"));
    formData.append("danhGia", "0");
    formData.append("File", originFileObj);
    const data = { body: formData, token: getAcessToken() };
    dispatch(postAsyncMovies(data));
    navigate(-1);
  };

  return (
    <div
      style={{
        padding: "0 50px 40px 50px",
        backgroundColor: "rgb(218, 226, 236)",
      }}
    >
       <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Add Movie</h1>
      <Form
        style={{ padding: "2rem" }}
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
          rules={[{ required: true, message: "Please type movie name!" }]}
          label="Movie Name"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="movieTrailer"
          rules={[{ required: true, message: "Please URL trailer!" }]}
          label="Trailer"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="movieDescription"
          rules={[{ required: true, message: "Please types description!" }]}
          label="Descriptions "
        >
          <TextArea placeholder="Descriptions" autoSize />
        </Form.Item>
        <Form.Item name="datepicker" label="Date">
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            {...props}
            accept=".png"
            name="logo"
            action="/upload.do"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload Image Trailer</Button>
          </Upload>
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
            Add Movie
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddMovie;
