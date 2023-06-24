import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { server_url } from '../../secret';

import { useNavigation } from '@react-navigation/native';


const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllComments, setShowAllComments] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchComments();

    const refreshInterval = setInterval(fetchComments, 1000);

    return () => clearInterval(refreshInterval);
  }, []);
 
  const fetchComments = async () => {
    try {

      const response = await fetch(`${server_url}/feeds/${postId}/comments`);
      const data = await response.json();
      console.log(data);

      const response = await axios.get(`${server_url}/feeds/${postId}/comments`);
      const data = response.data;


      if (Array.isArray(data)) {
        const commentsWithUserDetails = await Promise.all(
          data.map(async (comment) => {
            const userResponse = await axios.get(`${server_url}/users/user/${comment.userid}`);
            const userData = userResponse.data;

            return { ...comment, username: userData.name, userImage: userData.image };
          })
        );

        setComments(commentsWithUserDetails);
      } else {
        setComments([]);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToUserProfile = (userId) => {
    navigation.navigate('UserProfile', { userId });
  };

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  let visibleComments = comments;
  if (!showAllComments && comments.length > 4) {
    visibleComments = comments.slice(comments.length - 4);
  }

  const remainingCommentsCount = comments.length - visibleComments.length;

  const renderItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <TouchableOpacity onPress={() => navigateToUserProfile(item.userid)} style={styles.touchableContainer}>
        <Image
          source={item.userImage ? { uri: item.userImage } : require('../../assets/avatarVide.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <View style={styles.commentContent}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.commentText}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {comments.length === 0 ? (
        <Text>No comments found.</Text>
      ) : (
        <>
          <FlatList
            data={visibleComments.reverse()}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          {remainingCommentsCount > 0 && !showAllComments && (
            <Text style={styles.showMoreText} onPress={toggleShowAllComments}>
              Show more ({remainingCommentsCount} more comments)
            </Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
  },
  showMoreText: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#868889',

  },
});

export default Comments;
