/* eslint-disable react/jsx-filename-extension */
import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Col, Input, Menu, Row, Layout } from "antd";
import { useSelector } from "react-redux";
import Router from "next/router";
import LoginForm from "../containers/LoginForm";
import UserProfile from "../containers/UserProfile";

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  const onSearch = (value) => {
    Router.push(
      { pathname: "/hashtag", query: { tag: value } },
      `/hashtag/${value}`
    );
  };

  return (
    <Layout>
      <div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home">
            <Link href="/">
              <a>MinchBird</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="mail">
            <Input.Search
              enterButton
              style={{ verticalAlign: "middle" }}
              onSearch={onSearch}
            />
          </Menu.Item>
        </Menu>

        <Row gutter={8}>
          <Col xs={24} md={6}>
            {me ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col xs={24} md={12}>
            {children}
          </Col>
          <Col xs={24} md={6}>
            <Link href="https://github.com/minch1025/Minch-Twitter">
              <a target="_blank">Made by Mincho</a>
            </Link>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
