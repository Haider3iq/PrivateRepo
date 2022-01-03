/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSavedMessages = /* GraphQL */ `
  subscription OnCreateSavedMessages {
    onCreateSavedMessages {
      id
      content
      senderName
      senderID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateSavedMessages = /* GraphQL */ `
  subscription OnUpdateSavedMessages {
    onUpdateSavedMessages {
      id
      content
      senderName
      senderID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteSavedMessages = /* GraphQL */ `
  subscription OnDeleteSavedMessages {
    onDeleteSavedMessages {
      id
      content
      senderName
      senderID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateReaction = /* GraphQL */ `
  subscription OnCreateReaction {
    onCreateReaction {
      id
      userID
      content
      messageID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateReaction = /* GraphQL */ `
  subscription OnUpdateReaction {
    onUpdateReaction {
      id
      userID
      content
      messageID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteReaction = /* GraphQL */ `
  subscription OnDeleteReaction {
    onDeleteReaction {
      id
      userID
      content
      messageID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      content
      userID
      chatroomID
      image
      audio
      status
      replyToMessageID
      Reactions {
        nextToken
        startedAt
      }
      isSelected
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      content
      userID
      chatroomID
      image
      audio
      status
      replyToMessageID
      Reactions {
        nextToken
        startedAt
      }
      isSelected
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      content
      userID
      chatroomID
      image
      audio
      status
      replyToMessageID
      Reactions {
        nextToken
        startedAt
      }
      isSelected
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
      id
      newMessages
      LastMessage {
        id
        content
        userID
        chatroomID
        image
        audio
        status
        replyToMessageID
        isSelected
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Messages {
        nextToken
        startedAt
      }
      ChatRoomUser {
        nextToken
        startedAt
      }
      Admin {
        id
        name
        imageUri
        status
        lastOnlineAt
        typingStatus
        followers
        following
        blockedUsers
        color
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      name
      imageUri
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
      chatRoomAdminId
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
      id
      newMessages
      LastMessage {
        id
        content
        userID
        chatroomID
        image
        audio
        status
        replyToMessageID
        isSelected
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Messages {
        nextToken
        startedAt
      }
      ChatRoomUser {
        nextToken
        startedAt
      }
      Admin {
        id
        name
        imageUri
        status
        lastOnlineAt
        typingStatus
        followers
        following
        blockedUsers
        color
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      name
      imageUri
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
      chatRoomAdminId
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
      id
      newMessages
      LastMessage {
        id
        content
        userID
        chatroomID
        image
        audio
        status
        replyToMessageID
        isSelected
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Messages {
        nextToken
        startedAt
      }
      ChatRoomUser {
        nextToken
        startedAt
      }
      Admin {
        id
        name
        imageUri
        status
        lastOnlineAt
        typingStatus
        followers
        following
        blockedUsers
        color
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      name
      imageUri
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
      chatRoomAdminId
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      imageUri
      status
      lastOnlineAt
      typingStatus
      followers
      following
      blockedUsers
      Messages {
        nextToken
        startedAt
      }
      chatrooms {
        nextToken
        startedAt
      }
      color
      SavedMessages {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      imageUri
      status
      lastOnlineAt
      typingStatus
      followers
      following
      blockedUsers
      Messages {
        nextToken
        startedAt
      }
      chatrooms {
        nextToken
        startedAt
      }
      color
      SavedMessages {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      imageUri
      status
      lastOnlineAt
      typingStatus
      followers
      following
      blockedUsers
      Messages {
        nextToken
        startedAt
      }
      chatrooms {
        nextToken
        startedAt
      }
      color
      SavedMessages {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateChatRoomUser = /* GraphQL */ `
  subscription OnCreateChatRoomUser {
    onCreateChatRoomUser {
      id
      chatRoomID
      userID
      chatRoom {
        id
        newMessages
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
        chatRoomAdminId
      }
      user {
        id
        name
        imageUri
        status
        lastOnlineAt
        typingStatus
        followers
        following
        blockedUsers
        color
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateChatRoomUser = /* GraphQL */ `
  subscription OnUpdateChatRoomUser {
    onUpdateChatRoomUser {
      id
      chatRoomID
      userID
      chatRoom {
        id
        newMessages
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
        chatRoomAdminId
      }
      user {
        id
        name
        imageUri
        status
        lastOnlineAt
        typingStatus
        followers
        following
        blockedUsers
        color
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteChatRoomUser = /* GraphQL */ `
  subscription OnDeleteChatRoomUser {
    onDeleteChatRoomUser {
      id
      chatRoomID
      userID
      chatRoom {
        id
        newMessages
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
        chatRoomAdminId
      }
      user {
        id
        name
        imageUri
        status
        lastOnlineAt
        typingStatus
        followers
        following
        blockedUsers
        color
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
