import React, { Fragment, useState, useEffect } from "react";
import { Modal } from "antd";
import { Field, ErrorMessage, Formik, Form } from "formik";
// import ErrorMessage from "../../../../services/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import * as Validate from "../../../../services/validate/validateCourse";
import { addCourseAction } from "../addCourse/module/action";

export default function AddCourse(props) {
  const dispatch = useDispatch();
  const creator = useSelector((state) => state.AdminReducer.adminLogin);
  const { keyUser, current } = props;
  const alertClass = `font-semibold italic text-red-700`;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState();
  const [idKhoaHoc, setIdKhoaHoc] = useState();
  const validate = Validate.CourseSchema;
  useEffect(() => {
    setImgSrc(null);
    setIdKhoaHoc(new Date().getTime().toString());
  }, []);
  const showModal = () => {
    setImgSrc(null);
    setIdKhoaHoc(new Date().getTime().toString());
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setImgSrc(null);
  };

  let day = new Date().getDate().toString();
  if (day.length === 1) {
    day = "0" + day;
  }
  let month = new Date().getMonth();
  month = month + 1;
  if (month.length === 1) {
    month = "0" + month.toString();
  }
  const year = new Date().getFullYear().toString();
  const ngayTao = `${day}/${month}/${year}`;

  return (
    <Fragment>
      <button
        className="btnAdd"
        onClick={() => {
          showModal();
        }}
      >
        Add Course
      </button>
      <Modal
        title="Add Course"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={handleCancel}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        footer={null}
      >
        <Formik
          initialValues={{
            maKhoaHoc: idKhoaHoc,
            biDanh: "",
            tenKhoaHoc: "",
            moTa: "",
            luotXem: 0,
            danhGia: 0,
            hinhAnh: null,
            maNhom: "GP09",
            ngayTao: ngayTao,
            maDanhMucKhoaHoc: "BackEnd",
            taiKhoanNguoiTao: creator.taiKhoan,
          }}
          validationSchema={validate}
          onSubmit={(values, actions) => {
            let formData = new FormData();
            for (let key in values) {
              if (key !== "hinhAnh") {
                formData.append(key, values[key]);
              } else {
                if (values.hinhAnh !== null) {
                  formData.append("File", values.hinhAnh, values.hinhAnh.name);
                } else {
                  alert("Please choose a picture");
                }
              }
            }
            dispatch(
              addCourseAction(formData, keyUser, current),
              setImgSrc(null)
            );

            handleOk();
            actions.resetForm();
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="flex-1 mt-4 px-4 pr-16 relative max-h-72 overflow-y-scroll">
              <h1>M?? Kh??a H???c:</h1>
              <div className="w-auto h-14 mb-2 pr-2 flex items-center btn-search">
                <Field
                  value={idKhoaHoc}
                  name="maKhoaHoc"
                  className="w-11/12 px-3 outline-none text-base"
                  type="text"
                  placeholder="M?? Kh??a H???c"
                />
              </div>
              <ErrorMessage name="maKhoaHoc">
                {(msg) => <div className={alertClass}>{msg}</div>}
              </ErrorMessage>
              <h1>B?? Danh:</h1>
              <div className="bg-white w-auto h-14 mb-2 pr-2 flex items-center btn-search">
                <Field
                  name="biDanh"
                  className="w-11/12 px-3 text-gray-700 outline-none text-base"
                  type="text"
                  placeholder="B?? Danh"
                />
              </div>
              <ErrorMessage name="biDanh">
                {(msg) => <div className={alertClass}>{msg}</div>}
              </ErrorMessage>
              <h1>T??n Kh??a H???c:</h1>
              <div className="bg-white w-auto h-14 mb-2 pr-2 flex items-center btn-search">
                <Field
                  name="tenKhoaHoc"
                  className="w-11/12 px-3 text-gray-700 outline-none text-base"
                  type="text"
                  placeholder="T??n Kh??a H???c"
                />
              </div>
              <ErrorMessage name="tenKhoaHoc">
                {(msg) => <div className={alertClass}>{msg}</div>}
              </ErrorMessage>
              <h1>M?? T???</h1>
              <div className="bg-white w-auto h-36 mb-2 pr-2 flex items-center btn-search">
                <Field
                  as="textarea"
                  rows="5"
                  name="moTa"
                  className="w-11/12 px-3 text-gray-700 outline-none text-base"
                  type="text"
                  placeholder="M?? T???"
                />
              </div>
              <ErrorMessage name="moTa">
                {(msg) => <div className={alertClass}>{msg}</div>}
              </ErrorMessage>
              <h1>L?????t Xem:</h1>
              <div className="bg-white w-auto h-14 mb-2 pr-2 flex items-center btn-search">
                <Field
                  name="luotXem"
                  className="w-11/12 px-3 text-gray-700 outline-none text-base"
                  type="text"
                  placeholder="L?????t Xem"
                />
              </div>
              <ErrorMessage name="luotXem">
                {(msg) => <div className={alertClass}>{msg}</div>}
              </ErrorMessage>
              <h1>????nh Gi??:</h1>
              <div className="bg-white w-auto h-14 mb-2 pr-2 flex items-center btn-search">
                <Field
                  name="danhGia"
                  className="w-11/12 px-3 text-gray-700 outline-none text-base"
                  type="number"
                  min={0}
                  max={5}
                  placeholder="????nh Gi??"
                />
              </div>
              <ErrorMessage name="danhGia">
                {(msg) => <div className={alertClass}>{msg}</div>}
              </ErrorMessage>
              <h1>H??nh ???nh kh??a h???c:</h1>
              <input
                type="file"
                name="hinhAnh"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (
                    file.type === "image/png" ||
                    file.type === "image/jpeg" ||
                    file.type === "image/jpg" ||
                    file.type === "image/gif"
                  ) {
                    await setFieldValue("hinhAnh", file);
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (e) => {
                      setImgSrc(e.target.result);
                    };
                  }
                }}
              />
              <img width={200} src={imgSrc} alt="demoCourse" />
              <h1>Danh M???c Kh??a H???c:</h1>
              <div className="block text-left w-full m-0 selectStyle">
                <Field as="select" name="maDanhMucKhoaHoc">
                  <option value="BackEnd">L???p tr??nh Backend</option>
                  <option value="FrontEnd">L???p tr??nh Front end</option>
                  <option value="FullStack">L???p tr??nh Full Stack</option>
                  <option value="Design">Thi???t k??? Web</option>
                  <option value="DiDong">L???p tr??nh di ?????ng</option>
                  <option value="TuDuy">T?? duy l???p tr??nh</option>
                </Field>
              </div>
              <h1>T??i kho???n Ng?????i T???o:</h1>
              <div className="bg-gray-300 w-auto h-14 mb-2 pr-2 flex items-center cursor-not-allowed btn-search">
                <Field
                  disabled
                  name="taiKhoanNguoiTao"
                  className="w-11/12 px-3 text-gray-700 outline-none text-base cursor-not-allowed bg-gray-300"
                  type="text"
                  value={creator.taiKhoan}
                />
              </div>
              <h1>Ng??y t???o: {ngayTao}</h1>
              <button
                type="submit"
                className="cart-btn w-full h-14 text-base font-bold z-10"
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </Fragment>
  );
}
