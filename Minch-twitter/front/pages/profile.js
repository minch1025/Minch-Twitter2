/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-filename-extension */
import React, { useCallback } from "react";
import { Button, List, Card, Icon } from "antd";
import { useDispatch, useSelector } from "react-redux";

import NicknameEditForm from "../containers/NicknameEditForm";
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
  UNFOLLOW_USER_REQUEST,
} from "../reducers/user";
import { LOAD_USER_POSTS_REQUEST } from "../reducers/post";
import PostCard from "../containers/PostCard";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    followingList,
    followerList,
    hasMoreFollower,
    hasMoreFollowing,
  } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  const onUnfollow = useCallback(
    (userId) => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    []
  );

  const onRemoveFollower = useCallback(
    (userId) => () => {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: userId,
      });
    },
    []
  );

  const loadMoreFollowings = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      offset: followingList.length,
    });
  }, [followingList.length]);

  const loadMoreFollowers = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      offset: followerList.length,
    });
  }, [followerList.length]);

  return (
    <div>
      <NicknameEditForm />
      <List
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>Following list</div>}
        loadMore={
          hasMoreFollowing && (
            <Button style={{ width: "100%" }} onClick={loadMoreFollowings}>
              More
            </Button>
          )
        }
        bordered
        dataSource={followingList}
        renderItem={(item) => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card
              actions={[
                <Icon key="stop" type="stop" onClick={onUnfollow(item.id)} />,
              ]}
            >
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
      <List
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>Follower list</div>}
        loadMore={
          hasMoreFollower && (
            <Button style={{ width: "100%" }} onClick={loadMoreFollowers}>
              More
            </Button>
          )
        }
        bordered
        dataSource={followerList}
        renderItem={(item) => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card
              actions={[
                <Icon
                  key="stop"
                  type="stop"
                  onClick={onRemoveFollower(item.id)}
                />,
              ]}
            >
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
      <div>
        {mainPosts.map((c) => (
          <PostCard key={+c.createdAt} post={c} />
        ))}
      </div>
    </div>
  );
};

Profile.getInitialProps = async (context) => {
  const state = context.store.getState();
  // Timing of LOAD_USERS_REQUEST
  context.store.dispatch({
    type: LOAD_FOLLOWERS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  context.store.dispatch({
    type: LOAD_FOLLOWINGS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: state.user.me && state.user.me.id,
  });

  // Timing of LOAD_USERS_SUCCESS  "me" is created
};

export default Profile;
