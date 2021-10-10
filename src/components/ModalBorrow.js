import React, { useState, useEffect } from "react";
import { Modal, Select } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const ModalBorrow = (props) => {
  const [userId, setUser] = useState("");
  const [usersArr, setUserArr]= useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios.get("http://localhost:8081/v1/user/");
      response = await response.data;
      setUserArr(response);
    }
    fetchMyAPI();
    //eslint-disable-next-line
  }, []);

  return (
    <Modal
      title={
        <>
          <BookOutlined className="site-form-item-icon" />
          <p>Do you want to borrow this book?</p>
        </>
      }
      visible={props.visible}
      onOk={() => props.confirmBorrow(props.isbn, userId)}
      onCancel={() => props.closeModal()}
      okText="Submit"
      cancelText="cancelar"
    >
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder={
          <>
            <UserOutlined className="site-form-item-icon" />
            <p>Select a person</p>
          </>
        }
        optionFilterProp="children"
        onChange={(value) => setUser(value)}
      >
          {
              usersArr.map(user=>{
                return(
                    <Option value={user.userId}>{user.name}</Option>
                )
              })
          }
      </Select>
    </Modal>
  );
};
export default ModalBorrow;
